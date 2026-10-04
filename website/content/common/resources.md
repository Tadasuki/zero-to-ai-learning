---
id: resources
title: 空白练习素材与下载
eyebrow: 配套资料 · 自己完成代码
type: resources
order: 30
minutes: 8
nav: 空白练习素材
description: 只提供数据说明、空白练习文件、任务清单和实验记录，不提供完整答案。
---

# 空白练习素材与下载

<p class="lesson-lead">素材包不是一个已经能运行的 AI 项目。它只提供文件结构、任务说明、自检标准和实验记录表，核心代码需要学习者自己完成。</p>

## 学员起步包

<div class="download-card"><div class="download-mark">⌘</div><div><strong>五课零基础练习素材包</strong><p>第一课 7 个基础文件，02–05 每课各 15 个分步练习、示例数据、项目说明与实验记录表。</p></div><a class="download-now" href="downloads/zero-to-ai-practice-kits.zip" download>一键下载 ZIP</a></div>

文件顺序：

1. `00_hello.py`：第一行 Python；
2. `01_python_basics.py`：变量、循环、条件、函数；
3. `02_numpy_practice.py`：数组、shape、矩阵乘法；
4. `03_neuron.py`：自己写一个神经元；
5. `04_mlp.py`：自己写 MLP、前向和反向传播；
6. `05_train.py`：自己组装训练循环；
7. `06_predict.py`：自己处理手写图片并预测。

后续课程素材目录：

1. `course-02-linear-regression/`：15 个回归练习 + 学习时长 CSV；
2. `course-03-cnn/`：15 个图像练习 + 迷你图案 JSON；
3. `course-04-text-classification/`：15 个文本练习 + 短评 CSV；
4. `course-05-deployment/`：15 个部署练习 + 接口契约 JSON。

<div class="callout callout-yellow"><strong>为什么不提供完整答案？</strong><br>这门课的目标不是成功运行别人的代码，而是能解释并亲手写出自己的版本。每一节提供预期 shape、输出范围和检查方法，让你知道是否走对。</div>

## GitHub 下载入口

<div id="githubResource" class="github-resource"></div>

公开仓库提供课程网站、Markdown 正文和不含完整答案的练习骨架。只想练习时，直接点击上方按钮下载整理好的素材包；需要参与维护时，再进入 GitHub 克隆完整仓库。

## 本地素材位置

下载仓库后，练习文件位于：

```text
practice-kits/
```

从项目根目录运行练习：

```bash
uv run python practice-kits/00_hello.py
```

## 数据素材

MNIST 数据不会放进 GitHub 仓库，避免仓库体积膨胀。到第 14 节时，学习者根据 `practice-kits/materials/MNIST.md` 的检查清单加载数据；下载后的文件只保存在本地 `data/`。

## 学习约定

- 不跳过 Python 和 NumPy 基础；
- 不直接打开教师参考实现照抄；
- 每次只完成一个任务并运行一次；
- 遇到错误先看行号、变量值和 shape；
- 每次实验只改变一个参数；
- 在 `EXPERIMENT_LOG.md` 记录结果和失败样例。

<div class="provenance"><span class="badge badge-code">课程素材</span> 素材包与全部 75 节课程任务对应，最终成果由学习者亲手完成。</div>
