---
id: lesson-05
title: NumPy 数组与形状
eyebrow: 阶段 C · 数字、数组与图片
type: lesson
stage: C NumPy 与图片
order: 5
minutes: 38
nav: 05 NumPy 数组和 shape
description: 学会用数组保存大量数字，并读懂神经网络最重要的 shape。
---

# NumPy 数组与形状

<p class="lesson-lead">Python 列表能保存数字，但神经网络需要同时处理成千上万个数。NumPy 数组计算更快，并且能清楚表达“多少行、多少列”。</p>

## 创建数组

```python
import numpy as np

x = np.array([0.2, 0.8, 0.5])
print(x)
print(x.shape)
```

`shape` 表示数组的形状。这里 `(3,)` 表示一维数组，里面有 3 个元素。

二维数组可以表示多张图片或多组样本：

```python
x = np.array([
    [0.2, 0.8, 0.5],
    [0.1, 0.0, 0.9]
])
```

它的 shape 是 `(2, 3)`：2 行样本，每行 3 个特征。

## reshape：只改变排列方式

`reshape` 不会凭空增加数据，只是重新排列：

```python
grid = np.array([[1, 2], [3, 4]])
row = grid.reshape(4)
```

二维的 2×2 变成长度为 4 的一维数组。以后 28×28 图片会被 reshape 成 784 个输入。

<div class="callout callout-yellow"><strong>最重要的调试习惯</strong><br>神经网络报错时，先打印每个变量的 <code>shape</code>。很多问题不是公式错了，而是行列没有对齐。</div>

<div class="exercise"><strong>本节动手任务</strong><ol><li>在 `practice-kits/course-01-neural-network/0102_numpy_practice.py` 中创建一个 2×3 数组。</li><li>打印它的 shape、第一行和第二列。</li><li>把它 reshape 成长度为 6 的数组。</li><li>计算所有元素的最大值和平均值。</li></ol></div>

<details class="checkpoint"><summary>自检：(100, 784) 表示什么？</summary><p>表示有 100 个样本，每个样本有 784 个特征。对于 MNIST，可以理解为一次处理 100 张被拉平的 28×28 图片。</p></details>
