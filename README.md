# Zero to AI Learning · 从零开始学 AI

这是一个自用的 AI 学习系统与学习笔记，也开放给朋友和所有想从零开始的人。学习者从第一行 Python 开始，经过 75 个小节，亲手完成五个 AI 项目。

在线学习：[https://ai.hpu.edu.kg](https://ai.hpu.edu.kg) · 备用地址：[Cloudflare Pages](https://zero-to-ai-learning.pages.dev)

## 五门项目课

1. 神经网络识别手写数字；
2. 线性回归：让机器学会预测；
3. CNN：让网络更会看图片；
4. 文本分类：让机器读懂一类话；
5. 部署 AI 小应用。

每课 15 节，按“认识问题 → 准备数据 → 手写核心算法 → 评估改进 → 完整项目”推进。每节含原理、图示、动手任务、自检、网页 Python 实验和可选择查看的参考答案。

## 仓库结构

```text
website/        可直接部署的网站与分课程 Markdown 正文
practice-kits/  学员练习骨架、小型示例数据、实验记录表
docs/           课程覆盖矩阵和仓库维护说明
tools/          同步生成进阶课程素材的维护脚本
```

只需要做练习时，不必下载整个仓库：网站“素材与下载”页提供整理好的 ZIP 一键下载。

## 本地启动

```bash
python3 website/build.py
python3 -m http.server 4173 --directory website
```

访问 `http://localhost:4173`。网页实验室使用 Pyodide，第一次运行代码时需要联网加载解释器，之后由浏览器缓存。

本地素材练习：

```bash
uv sync
uv run python practice-kits/course-01-neural-network/0100_hello.py
```

## 内容维护

- 课程正文：`website/content/course-01/` 至 `course-05/`；
- 公共页面：`website/content/common/`；
- 浏览器实验：`website/challenges.js` 与 `website/challenges-expanded.js`；
- 覆盖矩阵：`docs/COVERAGE.md`、`docs/COVERAGE_ALL.md`；
- 进阶课程同步生成：`python3 tools/generate_advanced_courses.py`。
- 下载包重新打包：`python3 tools/build_practice_zip.py`。

修改课程后运行 `python3 website/build.py`。推送到 `main` 后，Cloudflare Pages 会自动构建并发布。

## 发布边界

仓库只提供原创课程网站、空白练习骨架、小型自制示例数据和环境配置。MNIST 大数据、训练模型、缓存、本地环境和教师参考实现不会发布。

## 维护与协作

项目由 Tadasuki 发起并确定学习目标；课程整理、网站实现、练习系统与发布维护由 OpenAI Codex 完成。详细分工见 [`CONTRIBUTORS.md`](CONTRIBUTORS.md)。欢迎通过 Issue 提出勘误或学习建议。

## 许可

代码与课程原创内容采用 MIT License。引用的第三方书籍、网站或工具，其版权归原作者与出版方所有。
