---
id: lesson-09
title: 把神经元连成一层网络
eyebrow: 阶段 D · 神经网络原理
type: lesson
stage: D 神经网络原理
order: 9
minutes: 42
nav: 09 层与前向传播
description: 从单个神经元扩展到隐藏层，弄清输入、权重和输出的形状。
---

# 把神经元连成一层网络

<p class="lesson-lead">一个神经元只能产生一个结果。把多个神经元放在一起，就得到一层；把多层连接起来，就得到多层感知机 MLP。</p>

## 本项目的结构

```text
784 个输入像素 → 64 个隐藏神经元 → 10 个输出分数
```

对应形状：

<div class="shape-flow"><span>x: (批量, 784)</span><b>@</b><span>w1: (784, 64)</span><b>→</b><span>a1: (批量, 64)</span></div>
<div class="shape-flow"><span>a1: (批量, 64)</span><b>@</b><span>w2: (64, 10)</span><b>→</b><span>z2: (批量, 10)</span></div>

从输入一路计算到输出叫前向传播。隐藏层不是人为规定“这个神经元看横线、那个看弯钩”，而是在训练中逐渐形成有用的特征组合。

## 参数初始化

如果所有权重一开始完全相同，隐藏神经元会得到相同梯度，难以学出不同特征。因此通常用小的随机数初始化权重，偏置可以从 0 开始。

```python
rng = np.random.default_rng(42)
```

种子 `42` 让随机结果可复现，便于比较实验。你还没有写完整网络，这里只需要理解为什么需要随机初始化。

<div class="exercise"><strong>本节动手任务</strong><ol><li>在纸上写出 x、w1、b1、w2、b2 的 shape。</li><li>在 `starter/04_mlp.py` 中只创建这些数组并打印 shape。</li><li>暂时不要写损失或反向传播。</li><li>确认第一层结果是 `(批量大小, 64)`，第二层是 `(批量大小, 10)`。</li></ol></div>

<details class="checkpoint"><summary>自检：为什么输出层是 10 个神经元？</summary><p>因为任务有 10 个类别，分别对应数字 0～9。每个输出位置负责一个类别的分数。</p></details>
