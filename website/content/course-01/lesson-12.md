---
id: lesson-12
title: 亲手写出前向传播
eyebrow: 阶段 E · 从空文件完成项目
type: lesson
stage: E 自己完成项目
order: 12
minutes: 65
nav: 12 实现前向传播
description: 不复制完整答案，按照输入输出契约逐个完成初始化、ReLU、Softmax 和 forward。
---

# 亲手写出前向传播

<p class="lesson-lead">从这一节开始，你在 `practice-kits/04_mlp.py` 中搭自己的网络。网站只给函数目标、输入输出和检查方法，不给整段完成代码。</p>

## 任务 1：初始化参数

建立一个 `MLP` 类，并在初始化方法里创建 `w1、b1、w2、b2`。

<div class="contract"><strong>参数形状契约</strong><code>w1: (784, 64)</code><code>b1: (1, 64)</code><code>w2: (64, 10)</code><code>b2: (1, 10)</code></div>

要求：权重使用小随机数，偏置使用 0；打印所有 shape 验证。

## 任务 2：实现 ReLU

输入可能是一整个数组。不要写 Python 循环逐个判断，尝试使用 `np.maximum`。

自测数据：`[-2, 0, 3]` 应得到 `[0, 0, 3]`。

## 任务 3：实现 Softmax

按行计算，每一行代表一张图片的 10 个分类分数。先减去每行最大值，再取指数、求和、相除。

自检：每一行输出都在 0～1 之间，并且行和约等于 1。

## 任务 4：实现 forward

按以下顺序组织，不要跳步：

```text
x → z1 → ReLU → a1 → z2 → Softmax → probabilities
```

forward 还要保存 `x、z1、a1、probabilities`，以后反向传播需要它们。

<div class="exercise"><strong>本节交付物</strong><ol><li>你自己写出的 MLP 类。</li><li>随机输入 shape 为 `(4,784)` 时，输出 shape 为 `(4,10)`。</li><li>输出每行概率和接近 1。</li><li>代码中能说清每个中间变量的含义。</li></ol></div>

<details class="checkpoint"><summary>卡住时应该看什么，而不是直接看答案？</summary><p>先打印每一步的 shape，再检查矩阵乘法中间维度是否一致，然后用极小输入验证 ReLU 和 Softmax。把大问题拆成四个独立函数。</p></details>
