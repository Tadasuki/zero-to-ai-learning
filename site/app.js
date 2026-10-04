(function () {
  "use strict";

  const data = window.COURSE_CONTENT || { meta: {}, documents: [] };
  const challenges = window.COURSE_CHALLENGES || {};
  const docs = data.documents || [];
  const byId = Object.fromEntries(docs.map((doc) => [doc.id, doc]));
  const lessons = docs.filter((doc) => doc.type === "lesson").sort((a, b) => a.order - b.order);
  const courseList = data.meta.courses || [{ id: "course-01", number: "01", title: "神经网络识别手写数字", summary: "" }];
  lessons.forEach((lesson) => { if (!lesson.course) lesson.course = "course-01"; });
  const courseById = Object.fromEntries(courseList.map((course) => [course.id, course]));
  const app = document.getElementById("app");
  const sidebar = document.getElementById("sidebar");
  const progressKey = "zero-ai-course-progress-v2";
  const collapsedKey = "zero-ai-course-collapsed-v1";
  const solvedKey = "zero-ai-course-solved-v1";
  const codeKeyPrefix = "zero-ai-code-v1-";
  let pythonWorker = null;
  let pythonWorkerReady = null;
  let runSequence = 0;

  function completed() {
    try { return JSON.parse(localStorage.getItem(progressKey) || "[]"); } catch (_) { return []; }
  }

  function saveCompleted(id) {
    const list = completed();
    if (!list.includes(id)) list.push(id);
    localStorage.setItem(progressKey, JSON.stringify(list));
    updateProgress();
  }

  function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch (_) { return fallback; }
  }

  function collapsedStages() { return readJson(collapsedKey, {}); }
  function solvedChallenges() { return readJson(solvedKey, []); }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function inlineMarkdown(value) {
    let html = escapeHtml(value);
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return html;
  }

  function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r/g, "").split("\n");
    const output = [];
    let paragraph = [];
    let list = null;
    let code = null;
    let raw = false;

    function flushParagraph() {
      if (paragraph.length) {
        output.push(`<p>${paragraph.map(inlineMarkdown).join("<br>")}</p>`);
        paragraph = [];
      }
    }
    function closeList() {
      if (list) { output.push(`</${list}>`); list = null; }
    }

    for (const line of lines) {
      if (line.startsWith("```")) {
        flushParagraph(); closeList();
        if (code === null) { code = []; output.push("<pre><code>"); }
        else { output.push(escapeHtml(code.join("\n")) + "</code></pre>"); code = null; }
        continue;
      }
      if (code !== null) { code.push(line); continue; }
      if (line.startsWith("<") || line.endsWith(">")) {
        flushParagraph(); closeList(); output.push(line); raw = true; continue;
      }
      if (!line.trim()) { flushParagraph(); closeList(); raw = false; continue; }
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      if (heading) { flushParagraph(); closeList(); output.push(`<h${heading[1].length}>${inlineMarkdown(heading[2])}</h${heading[1].length}>`); continue; }
      if (/^---+$/.test(line.trim())) { flushParagraph(); closeList(); output.push("<hr>"); continue; }
      const bullet = line.match(/^\s*[-*]\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        if (!list) { list = "ul"; output.push("<ul>"); }
        output.push(`<li>${inlineMarkdown(bullet[1])}</li>`); continue;
      }
      const number = line.match(/^\s*\d+\.\s+(.+)$/);
      if (number) {
        flushParagraph();
        if (!list) { list = "ol"; output.push("<ol>"); }
        output.push(`<li>${inlineMarkdown(number[1])}</li>`); continue;
      }
      paragraph.push(line);
    }
    flushParagraph(); closeList();
    if (code !== null) output.push(escapeHtml(code.join("\n")) + "</code></pre>");
    return output.join("\n");
  }

  function updateProgress() {
    const done = completed();
    const percent = lessons.length ? Math.round(done.filter((id) => lessons.some((lesson) => lesson.id === id)).length / lessons.length * 100) : 0;
    document.getElementById("progressLabel").textContent = `${percent}%`;
    document.getElementById("progressBar").style.width = `${percent}%`;
    document.getElementById("progressHint").textContent = percent === 100 ? "五门项目课已全部完成。" : `已完成 ${done.filter((id) => byId[id]?.type === "lesson").length}/${lessons.length} 个小节。`;
    document.querySelectorAll(".lesson-nav-item").forEach((item) => item.classList.toggle("done", done.includes(item.dataset.id)));
  }

  function renderNav() {
    const nav = document.getElementById("courseNav");
    const collapsed = collapsedStages();
    const initialRoute = (location.hash || "#home").slice(1);
    const activeCourseId = byId[initialRoute]?.course || "course-01";
    nav.innerHTML = courseList.map((course) => {
      const courseLessons = lessons.filter((lesson) => lesson.course === course.id);
      const stages = [...new Set(courseLessons.map((lesson) => lesson.stage || "课程内容"))];
      const courseKey = `course:${course.id}`;
      const courseCollapsed = collapsed[courseKey] === undefined ? course.id !== activeCourseId : Boolean(collapsed[courseKey]);
      const groups = stages.map((stage) => {
        const stageKey = `stage:${course.id}:${stage}`;
        const stageLessons = courseLessons.filter((lesson) => (lesson.stage || "课程内容") === stage);
        const stageCollapsed = Boolean(collapsed[stageKey]);
        return `<button class="lesson-stage-toggle${stageCollapsed ? " collapsed" : ""}" data-collapse-key="${escapeHtml(stageKey)}" aria-expanded="${String(!stageCollapsed)}"><span>${escapeHtml(stage)}</span><i>⌄</i></button><div class="lesson-stage-panel" data-collapse-panel="${escapeHtml(stageKey)}"${stageCollapsed ? " hidden" : ""}>${stageLessons.map((lesson, index) => `<a class="lesson-nav-item" data-id="${lesson.id}" data-route="${lesson.id}" href="#${lesson.id}"><span class="nav-number">${String(index + 1).padStart(2, "0")}</span>${escapeHtml(lesson.nav || lesson.title)}</a>`).join("")}</div>`;
      }).join("");
      return `<section class="course-nav-group" data-course-group="${course.id}"><button class="course-group-toggle${courseCollapsed ? " collapsed" : ""}" data-collapse-key="${courseKey}" aria-expanded="${String(!courseCollapsed)}"><span><b>${course.number}</b>${escapeHtml(course.title)}</span><i>⌄</i></button><div class="course-lesson-group" data-collapse-panel="${courseKey}"${courseCollapsed ? " hidden" : ""}>${groups}</div></section>`;
    }).join("");
    nav.querySelectorAll("[data-collapse-key]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.collapseKey;
        const panel = nav.querySelector(`[data-collapse-panel="${CSS.escape(key)}"]`);
        const nextCollapsed = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!nextCollapsed));
        button.classList.toggle("collapsed", nextCollapsed);
        panel.hidden = nextCollapsed;
        const nextState = collapsedStages();
        nextState[key] = nextCollapsed;
        localStorage.setItem(collapsedKey, JSON.stringify(nextState));
      });
    });
    updateProgress();
  }

  function setActive(route) {
    document.querySelectorAll("[data-route]").forEach((item) => item.classList.toggle("active", item.dataset.route === route));
    document.querySelectorAll(".course-nav-group").forEach((group) => group.classList.toggle("active-course", Boolean(group.querySelector(`[data-route="${CSS.escape(route)}"]`))));
  }

  function renderHome() {
    setActive("home");
    const done = completed();
    const first = lessons.find((lesson) => !done.includes(lesson.id)) || lessons[0];
    app.innerHTML = `<section class="home-hero">
      <div class="home-kicker">真正的 0 基础 · 五门项目课</div>
      <h1>从第一行 Python，<br>到部署 AI 小应用。</h1>
      <p>从手写数字识别开始，依次完成线性回归、CNN 图片分类、文本分类和网页部署。每门课都先讲原理，再让你从起始素材亲手写出结果。</p>
      <div class="hero-actions"><a class="primary-button" href="#${first ? first.id : "resources"}">${done.length ? "继续学习" : "从零开始"} →</a><a class="secondary-button" href="#resources">下载空白练习素材</a></div>
    </section>
    <div class="course-promise"><strong>学习规则</strong><span>每节只引入少量新知识</span><span>先解释，再给最小语法</span><span>你自己写代码并按标准自检</span></div>
    <section class="home-section"><div class="stage-title"><div><span>五个完整项目</span><h2>循序渐进的 AI 学习路线</h2></div><small>${done.length}/${lessons.length} 小节</small></div><div class="course-cards">${courseList.map((course) => { const items = lessons.filter((lesson) => lesson.course === course.id); const courseDone = items.filter((lesson) => done.includes(lesson.id)).length; const target = items.find((lesson) => !done.includes(lesson.id)) || items[0]; return `<a class="course-card" href="#${target?.id || "roadmap"}"><span>${course.number}</span><div><h3>${escapeHtml(course.title)}</h3><p>${escapeHtml(course.summary)}</p><small>${courseDone}/${items.length} 小节完成 · ${courseDone ? "继续学习" : "开始课程"} →</small></div></a>`; }).join("")}</div></section>
    <div class="home-note"><strong>不要跳到最终代码：</strong>每个文件从空白练习开始。完成当前小节的自检，再进入下一节；遇到报错，先读行号、打印中间值和 shape。</div>`;
  }

  function renderCodeLab(lessonId) {
    const challenge = challenges[lessonId];
    if (!challenge) return "";
    const savedCode = localStorage.getItem(`${codeKeyPrefix}${lessonId}`);
    const code = savedCode === null ? challenge.starter : savedCode;
    const solved = solvedChallenges().includes(lessonId);
    return `<section class="code-lab" id="codeLab" data-lesson="${lessonId}">
      <div class="lab-heading"><div><span>网页 Python 实验室</span><h2>${escapeHtml(challenge.title)}</h2></div><em class="lab-state ${solved ? "passed" : ""}" id="labState">${solved ? "已通过 ✓" : "等待运行"}</em></div>
      <div class="lab-task"><strong>本节任务</strong><p>${escapeHtml(challenge.task)}</p></div>
      <div class="editor-shell">
        <div class="editor-toolbar"><span><i></i><i></i><i></i> main.py</span><small>Python 在浏览器中运行</small></div>
        <textarea id="codeEditor" class="code-editor" spellcheck="false" aria-label="Python 代码编辑器">${escapeHtml(code)}</textarea>
      </div>
      <div class="lab-actions"><button class="run-button" id="runCode">▶ 运行代码</button><button class="lab-button" id="showHint">查看提示</button><button class="lab-button answer-button" id="toggleAnswer" aria-expanded="${String(solved)}">${solved ? "收起答案" : "直接查看答案"}</button><button class="lab-button" id="resetCode">恢复起始代码</button></div>
      <div class="hint-panel" id="hintPanel" hidden><strong>提示</strong><p>${escapeHtml(challenge.hint)}</p></div>
      <div class="console-shell"><div class="console-title"><span>运行结果</span><small id="runtimeLabel">尚未运行</small></div><pre id="codeOutput">点击“运行代码”后，输出会显示在这里。</pre></div>
      <div class="answer-panel" id="answerPanel"${solved ? "" : " hidden"}><div class="answer-success" id="answerMessage">${solved ? "代码已通过本节检查。现在可以对照参考答案。" : "这是参考写法之一；你的代码不需要和它一模一样。"}</div><pre><code>${escapeHtml(challenge.answer)}</code></pre></div>
    </section>`;
  }

  function resetPythonWorker() {
    if (pythonWorker) pythonWorker.terminate();
    pythonWorker = null;
    pythonWorkerReady = null;
  }

  function getPythonWorker() {
    if (pythonWorker && pythonWorkerReady) return pythonWorkerReady;
    pythonWorker = new Worker("python-worker.js", { type: "module" });
    pythonWorkerReady = new Promise((resolve, reject) => {
      const onMessage = (event) => {
        if (event.data.type === "ready") {
          pythonWorker.removeEventListener("message", onMessage);
          resolve(pythonWorker);
        } else if (event.data.type === "load-error") {
          pythonWorker.removeEventListener("message", onMessage);
          reject(new Error(event.data.error));
        }
      };
      pythonWorker.addEventListener("message", onMessage);
      pythonWorker.addEventListener("error", (event) => reject(new Error(event.message)), { once: true });
    });
    return pythonWorkerReady;
  }

  function revealAnswer(lessonId) {
    const answerPanel = document.getElementById("answerPanel");
    const answerMessage = document.getElementById("answerMessage");
    const answerButton = document.getElementById("toggleAnswer");
    answerPanel.hidden = false;
    answerMessage.textContent = "代码已通过本节检查。现在可以对照参考答案。";
    answerButton.textContent = "收起答案";
    answerButton.setAttribute("aria-expanded", "true");
    const solved = solvedChallenges();
    if (!solved.includes(lessonId)) solved.push(lessonId);
    localStorage.setItem(solvedKey, JSON.stringify(solved));
  }

  async function runChallenge(lessonId) {
    const challenge = challenges[lessonId];
    const editor = document.getElementById("codeEditor");
    const output = document.getElementById("codeOutput");
    const state = document.getElementById("labState");
    const runtime = document.getElementById("runtimeLabel");
    const runButton = document.getElementById("runCode");
    const code = editor.value;
    localStorage.setItem(`${codeKeyPrefix}${lessonId}`, code);
    output.textContent = "正在加载浏览器 Python，首次运行需要下载解释器…";
    state.textContent = "运行中…";
    state.className = "lab-state running";
    runtime.textContent = "准备环境";
    runButton.disabled = true;

    try {
      const worker = await getPythonWorker();
      const runId = ++runSequence;
      output.textContent = "";
      runtime.textContent = "正在执行";
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          worker.removeEventListener("message", onMessage);
          resetPythonWorker();
          state.textContent = "运行超时";
          state.className = "lab-state failed";
          runtime.textContent = "已停止";
          output.textContent += "\n程序运行超过 45 秒，已停止。请检查是否存在无限循环。";
          resolve();
        }, 45000);
        const onMessage = (event) => {
          const message = event.data;
          if (message.runId !== runId) return;
          if (message.type === "output") {
            output.textContent += `${message.message}\n`;
            return;
          }
          if (message.type !== "result") return;
          clearTimeout(timeout);
          worker.removeEventListener("message", onMessage);
          if (message.status === "passed") {
            state.textContent = "通过检查 ✓";
            state.className = "lab-state passed";
            runtime.textContent = "运行成功";
            if (!output.textContent.trim()) output.textContent = "程序运行成功，没有打印内容。";
            revealAnswer(lessonId);
          } else if (message.status === "incomplete") {
            state.textContent = "继续修改";
            state.className = "lab-state incomplete";
            runtime.textContent = "运行无报错，任务未完成";
            if (!output.textContent.trim()) output.textContent = "程序没有报错，但还没有满足本节检查条件。\n请重新阅读任务和提示。";
            else output.textContent += "\n程序没有报错，但还没有满足本节检查条件。";
          } else if (message.status === "load-error") {
            state.textContent = "解释器加载失败";
            state.className = "lab-state failed";
            runtime.textContent = "请检查网络";
            output.textContent = "在线 Python 解释器没有加载成功。请检查网络后重试。";
            resetPythonWorker();
          } else {
            state.textContent = "代码报错";
            state.className = "lab-state failed";
            runtime.textContent = "运行失败";
            output.textContent += `${output.textContent.trim() ? "\n" : ""}${message.error || "未知错误"}`;
          }
          resolve();
        };
        worker.addEventListener("message", onMessage);
        worker.postMessage({ runId, code, test: challenge.test });
      });
    } catch (_) {
      state.textContent = "解释器加载失败";
      state.className = "lab-state failed";
      runtime.textContent = "请检查网络";
      output.textContent = "在线 Python 解释器没有加载成功。请确认网络可访问 Pyodide CDN 后重试。";
      resetPythonWorker();
    } finally {
      runButton.disabled = false;
    }
  }

  function bindCodeLab(lessonId) {
    const challenge = challenges[lessonId];
    if (!challenge) return;
    const editor = document.getElementById("codeEditor");
    editor.addEventListener("input", () => localStorage.setItem(`${codeKeyPrefix}${lessonId}`, editor.value));
    editor.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      event.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.value = `${editor.value.slice(0, start)}    ${editor.value.slice(end)}`;
      editor.selectionStart = editor.selectionEnd = start + 4;
    });
    document.getElementById("runCode").addEventListener("click", () => runChallenge(lessonId));
    document.getElementById("showHint").addEventListener("click", () => {
      const panel = document.getElementById("hintPanel");
      panel.hidden = !panel.hidden;
    });
    document.getElementById("toggleAnswer").addEventListener("click", (event) => {
      const panel = document.getElementById("answerPanel");
      const willShow = panel.hidden;
      panel.hidden = !willShow;
      event.currentTarget.textContent = willShow ? "收起答案" : "直接查看答案";
      event.currentTarget.setAttribute("aria-expanded", String(willShow));
    });
    document.getElementById("resetCode").addEventListener("click", () => {
      editor.value = challenge.starter;
      localStorage.setItem(`${codeKeyPrefix}${lessonId}`, challenge.starter);
      document.getElementById("codeOutput").textContent = "起始代码已恢复。运行结果会显示在这里。";
      document.getElementById("runtimeLabel").textContent = "尚未运行";
    });
  }

  function renderDocument(doc) {
    if (!doc) { renderHome(); return; }
    setActive(doc.id);
    const courseLessons = lessons.filter((lesson) => lesson.course === doc.course);
    const index = courseLessons.findIndex((lesson) => lesson.id === doc.id);
    const done = completed().includes(doc.id);
    const previous = index > 0 ? courseLessons[index - 1] : null;
    const next = index >= 0 ? courseLessons[index + 1] : null;
    const isLesson = doc.type === "lesson";
    const autoProvenance = isLesson && !doc.body.includes('class="provenance"') ? `<div class="provenance"><span class="badge badge-ai">AI 教学脚手架</span> 本节用于零基础学习和实践，不代替教师指定教材或课程要求。</div>` : "";
    app.innerHTML = `<article class="article"><header class="article-header"><div class="lesson-kicker">${escapeHtml(doc.eyebrow || "配套资料")}</div></header>${renderMarkdown(doc.body)}${isLesson ? renderCodeLab(doc.id) : ""}${autoProvenance}${isLesson ? `<div class="lesson-actions">${previous ? `<a class="secondary-button" href="#${previous.id}">← 上一节</a>` : ""}<button class="${done ? "secondary-button" : "primary-button"}" id="completeLesson">${done ? "本节已完成 ✓" : "完成练习，标记本节"}</button>${next ? `<a class="secondary-button" href="#${next.id}">下一节：${escapeHtml(next.title)} →</a>` : `<a class="secondary-button" href="#resources">查看素材与验收 →</a>`}</div>` : ""}</article>`;
    const completeButton = document.getElementById("completeLesson");
    if (completeButton) completeButton.addEventListener("click", () => { saveCompleted(doc.id); completeButton.textContent = "本节已完成 ✓"; completeButton.className = "secondary-button"; completeButton.disabled = true; });
    if (isLesson) bindCodeLab(doc.id);
    if (doc.id === "resources") {
      const githubResource = document.getElementById("githubResource");
      if (githubResource) {
        if (data.meta.githubUrl) {
          githubResource.innerHTML = `<a class="github-button" href="${escapeHtml(data.meta.githubUrl)}" target="_blank" rel="noreferrer">在 GitHub 下载源码 →</a>`;
        } else {
          githubResource.innerHTML = `<span class="github-pending">GitHub 仓库地址：待发布后填写</span>`;
        }
      }
    }
  }

  function renderRoute() {
    const route = (location.hash || "#home").slice(1) || "home";
    if (route === "home") renderHome();
    else renderDocument(byId[route]);
    updateProgress();
    const current = byId[route];
    const course = current?.course ? courseById[current.course] : null;
    document.getElementById("toplineTitle").textContent = course ? `${course.number} / ${course.title}` : "五课 AI 零基础项目路线";
    document.querySelector(".mobile-course").textContent = course?.number || "AI";
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  }

  function openMenu() {
    sidebar.classList.add("open");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    sidebar.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  document.getElementById("menuButton").addEventListener("click", () => sidebar.classList.contains("open") ? closeMenu() : openMenu());
  document.getElementById("sidebarClose").addEventListener("click", closeMenu);
  document.getElementById("sidebarScrim").addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("hashchange", renderRoute);
  renderNav();
  renderRoute();
})();
