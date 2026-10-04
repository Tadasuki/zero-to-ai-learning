---
id: roadmap
title: 五课后的进阶路线
eyebrow: 已经入门，然后学什么
type: roadmap
order: 11
minutes: 15
nav: 五课后的进阶路线
description: 完成五个入门项目后，从数学基础、PyTorch 到专项方向、工程部署与作品集的进阶路线。
---

# 五课学完以后，怎么继续走？

<p class="lesson-lead">前五课帮你走完“理解原理—亲手训练—放到网页”的闭环。下一阶段不要再横向收集名词，而要把能力加深：先补基础和工具，再选一个方向做出能展示、能解释、能复现的作品。</p>

<div class="route-compass">
  <div><span>你已经会</span><strong>写基础 Python</strong><small>能读懂变量、循环、函数和数组</small></div>
  <div><span>你已经会</span><strong>训练小模型</strong><small>理解损失、梯度、验证集与过拟合</small></div>
  <div><span>你已经会</span><strong>交付小应用</strong><small>能把模型接到网页并让别人使用</small></div>
</div>

## 推荐主线：四个阶段

<div class="advanced-roadmap">
  <section class="advanced-phase">
    <div class="phase-index"><b>01</b><span>4–6 周</span></div>
    <div class="phase-body"><span class="phase-label">基础加固</span><h3>数学直觉 + 经典机器学习</h3><p>补齐向量、矩阵、导数、概率的直觉；再学习 k 近邻、决策树、逻辑回归、支持向量机和集成学习。重点不是背公式，而是知道每种模型在解决什么问题。</p><div class="skill-tags"><i>NumPy</i><i>pandas</i><i>scikit-learn</i><i>数据可视化</i></div><strong class="phase-output">阶段作品：为一个真实表格数据集完成清洗、建模、评估与结论报告。</strong></div>
  </section>
  <section class="advanced-phase">
    <div class="phase-index"><b>02</b><span>6–8 周</span></div>
    <div class="phase-body"><span class="phase-label">深度学习工具</span><h3>用 PyTorch 重写你学过的网络</h3><p>掌握张量、自动求导、Dataset、DataLoader、训练循环、优化器和模型保存。随后学习正则化、批归一化、残差连接与迁移学习。</p><div class="skill-tags"><i>PyTorch</i><i>GPU</i><i>训练调试</i><i>迁移学习</i></div><strong class="phase-output">阶段作品：用 PyTorch 重做手写数字或图片分类，并画出训练曲线。</strong></div>
  </section>
  <section class="advanced-phase">
    <div class="phase-index"><b>03</b><span>8–12 周</span></div>
    <div class="phase-body"><span class="phase-label">选择一个专项</span><h3>先走深一条路，再拓宽</h3><p>视觉方向学习目标检测和图像分割；文本方向学习 Transformer、预训练模型与 RAG；也可以选择推荐系统、时间序列或语音。一次只选一个方向。</p><div class="skill-tags"><i>计算机视觉</i><i>NLP / LLM</i><i>推荐系统</i><i>时间序列</i></div><strong class="phase-output">阶段作品：复现一个公开基线，并用自己的数据做一次改进实验。</strong></div>
  </section>
  <section class="advanced-phase">
    <div class="phase-index"><b>04</b><span>持续积累</span></div>
    <div class="phase-body"><span class="phase-label">工程与作品集</span><h3>让项目可复现、可维护、可使用</h3><p>学习 Git、测试、API、Docker、云部署、日志和模型监控。把实验过程、失败原因、指标和使用方法写清楚，比只放一个最终准确率更重要。</p><div class="skill-tags"><i>Git</i><i>FastAPI</i><i>Docker</i><i>MLOps</i></div><strong class="phase-output">阶段作品：3 个公开项目，每个都有 README、演示、数据说明和复现实验步骤。</strong></div>
  </section>
</div>

<div class="callout callout-green"><strong>选择原则</strong><br>如果你还不确定方向，先完成阶段 01 和 02。到了阶段 03，再根据“我最愿意连续做三个月的项目是什么”来选择，而不是根据哪个名词最热门。</div>

## 一个可以直接照着走的 12 周计划

<div class="week-grid">
  <div><b>第 1–3 周</b><strong>表格数据与经典模型</strong><span>做 1 个回归、1 个分类任务；学会划分数据和比较基线。</span></div>
  <div><b>第 4–6 周</b><strong>PyTorch 基础</strong><span>手写训练循环，理解张量形状、自动求导和模型保存。</span></div>
  <div><b>第 7–9 周</b><strong>专项小项目</strong><span>从视觉、文本、推荐、时序中选一个，复现公开教程。</span></div>
  <div><b>第 10–12 周</b><strong>整理与发布</strong><span>补测试、写 README、录演示、部署，并记录下一轮改进。</span></div>
</div>

## 参考阅读书目

<p>书不需要从第一页顺序啃完。先做项目，遇到概念再回书里查；每张卡都标出了更适合开始阅读的阶段。</p>

<div class="book-grid">
  <article class="book-card"><div class="book-cover cover-green"><span>深度学习</span><b>动手学</b><small>李沐 等</small></div><div class="book-info"><span class="book-level">阶段 02 · 入门到进阶</span><h3>《动手学深度学习》</h3><p>边讲原理边实现，适合把本课程中的小网络迁移到 PyTorch。</p><div class="book-actions"><a href="https://zh.d2l.ai/" target="_blank" rel="noreferrer">免费在线阅读</a><a href="https://weread.qq.com/web/search/books?keyword=%E5%8A%A8%E6%89%8B%E5%AD%A6%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0" target="_blank" rel="noreferrer">微信读书搜索</a></div></div></article>
  <article class="book-card"><div class="book-cover cover-blue"><span>原理教材</span><b>神经网络</b><small>邱锡鹏</small></div><div class="book-info"><span class="book-level">阶段 02–03 · 系统理解</span><h3>《神经网络与深度学习》</h3><p>体系完整，适合在做过项目后补齐优化、网络结构与表示学习。</p><div class="book-actions"><a href="https://nndl.github.io/" target="_blank" rel="noreferrer">作者官网</a><a href="https://weread.qq.com/web/search/books?keyword=%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C%E4%B8%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0" target="_blank" rel="noreferrer">微信读书搜索</a></div></div></article>
  <article class="book-card"><div class="book-cover cover-yellow"><span>经典机器学习</span><b>机器学习</b><small>周志华</small></div><div class="book-info"><span class="book-level">阶段 01 · 经典方法</span><h3>《机器学习》</h3><p>常被称为“西瓜书”，适合建立经典机器学习的整体地图。</p><div class="book-actions"><a href="https://weread.qq.com/web/search/books?keyword=%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%20%E5%91%A8%E5%BF%97%E5%8D%8E" target="_blank" rel="noreferrer">微信读书搜索</a></div></div></article>
  <article class="book-card"><div class="book-cover cover-purple"><span>数学与算法</span><b>统计学习</b><small>李航</small></div><div class="book-info"><span class="book-level">阶段 01–03 · 查阅型</span><h3>《统计学习方法》</h3><p>适合在理解直觉后查算法推导；不建议零基础时从头硬啃。</p><div class="book-actions"><a href="https://weread.qq.com/web/search/books?keyword=%E7%BB%9F%E8%AE%A1%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%20%E6%9D%8E%E8%88%AA" target="_blank" rel="noreferrer">微信读书搜索</a></div></div></article>
  <article class="book-card"><div class="book-cover cover-coral"><span>Python 实践</span><b>深度学习</b><small>F. Chollet</small></div><div class="book-info"><span class="book-level">阶段 02 · 项目实践</span><h3>《Python 深度学习》</h3><p>用完整案例理解深度学习工作流，适合与 PyTorch 路线交叉阅读。</p><div class="book-actions"><a href="https://weread.qq.com/web/search/books?keyword=Python%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0" target="_blank" rel="noreferrer">微信读书搜索</a></div></div></article>
  <article class="book-card"><div class="book-cover cover-slate"><span>工程系统</span><b>ML Systems</b><small>Chip Huyen</small></div><div class="book-info"><span class="book-level">阶段 04 · 工程化</span><h3>《设计机器学习系统》</h3><p>从“模型能跑”走向“系统可靠”，理解数据、部署、监控与迭代。</p><div class="book-actions"><a href="https://weread.qq.com/web/search/books?keyword=%E8%AE%BE%E8%AE%A1%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E7%B3%BB%E7%BB%9F" target="_blank" rel="noreferrer">微信读书搜索</a></div></div></article>
</div>

<div class="callout callout-purple"><strong>关于微信读书链接</strong><br>不同账号、地区和版权状态可能看到不同结果，因此这里使用站内书名搜索入口，不虚构具体书籍 ID；如果书籍当前未上架，仍可使用旁边的作者官网或其他正规渠道阅读。</div>

## 现在就做的下一步

1. 先把五课中还没独立写出的代码补完；
2. 新建一个“AI 实验日志”，每次记录问题、改动、指标和结论；
3. 从阶段 01 选一个公开表格数据集，做出第一个不跟教程逐行照抄的项目；
4. 项目完成后再进入 PyTorch，而不是同时开五条学习路线。

<div class="callout callout-yellow"><strong>你真正要积累的不是课程数量</strong><br>而是越来越强的独立闭环：提出问题 → 准备数据 → 建立基线 → 训练评估 → 解释结果 → 发布作品。</div>
