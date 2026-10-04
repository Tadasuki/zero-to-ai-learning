---
id: lesson-08
title: 从一个神经元开始
eyebrow: 阶段 D · 神经网络原理
type: lesson
stage: D 神经网络原理
order: 8
minutes: 38
nav: 08 单个神经元
description: 亲手写出加权和、偏置和激活函数，理解参数到底是什么。
---

# 从一个神经元开始

<p class="lesson-lead">神经网络看起来很复杂，但每个神经元的核心只有两步：先计算加权和，再通过激活函数。</p>

## 加权和

```text
z = x₁w₁ + x₂w₂ + … + xₙwₙ + b
```

含义：

- `x` 是输入；
- `w` 是权重，表示输入的重要程度；
- `b` 是偏置，调整神经元整体启动门槛；
- `z` 是激活前的结果。

权重和偏置统称为参数。训练神经网络，本质上就是寻找更合适的参数。

## ReLU 激活

```text
ReLU(z) = max(0, z)
```

负数变为 0，正数保留。激活函数让多层网络能够表示弯曲、复杂的边界；如果没有非线性激活，多层线性计算最终仍等价于一层线性计算。

<div class="exercise"><strong>本节动手任务</strong><ol><li>打开 `starter/03_neuron.py`。</li><li>创建三个输入和三个权重。</li><li>不用 NumPy，先用乘法和加法手算 z。</li><li>调用你之前写的 relu 函数得到输出。</li><li>分别改变一个权重和偏置，观察输出怎样变化。</li></ol></div>

<details class="checkpoint"><summary>自检：训练时会直接修改输入图片吗？</summary><p>不会。训练主要修改权重和偏置。输入图片是样本，参数才是模型学习到的内容。</p></details>
