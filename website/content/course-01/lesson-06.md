---
id: lesson-06
title: 向量、矩阵与批量计算
eyebrow: 阶段 C · 数字、数组与图片
type: lesson
stage: C NumPy 与图片
order: 6
minutes: 42
nav: 06 矩阵乘法
description: 不做完整线性代数推导，先理解矩阵乘法为什么能批量计算神经元。
---

# 向量、矩阵与批量计算

<p class="lesson-lead">一个神经元要把许多输入乘以不同权重再相加。矩阵乘法让我们一次计算很多样本、很多神经元。</p>

## 从一个神经元开始

三个输入与三个权重：

```text
x = [x₁, x₂, x₃]
w = [w₁, w₂, w₃]
```

加权和：

```text
x₁w₁ + x₂w₂ + x₃w₃
```

NumPy 中可写成：

```python
total = x @ w
```

`@` 表示矩阵乘法。它不是逐个位置相乘后保留三个结果，而是按照矩阵规则进行组合。

## 从一个神经元扩展到多个神经元

如果隐藏层有 4 个神经元，每个神经元都需要一组权重。输入 `x` 的 shape 是 `(批量大小, 3)`，权重 `w` 的 shape 是 `(3, 4)`，结果就是 `(批量大小, 4)`。

<div class="shape-flow"><span>(100, 3)<small>100 个样本</small></span><b>@</b><span>(3, 4)<small>4 个神经元</small></span><b>=</b><span>(100, 4)<small>每个样本 4 个输出</small></span></div>

相乘时，中间的 3 必须相同。可以把它理解成“每个样本有 3 个输入，而每个神经元也准备了 3 个权重”。

## 偏置如何相加

偏置 shape 常写成 `(1, 4)`。NumPy 会把这一行自动加到 100 个样本上，这叫广播。

<div class="exercise"><strong>本节动手任务</strong><ol><li>创建 shape 为 `(2, 3)` 的输入数组。</li><li>创建 shape 为 `(3, 2)` 的权重数组。</li><li>用 <code>@</code> 计算结果并打印 shape。</li><li>先写下你预测的输出 shape，再运行验证。</li></ol></div>

<details class="checkpoint"><summary>自检：(2,3) @ (3,2) 的结果是什么形状？</summary><p>结果是 `(2,2)`。中间的 3 对齐并消失，保留外侧的 2 和 2。</p></details>
