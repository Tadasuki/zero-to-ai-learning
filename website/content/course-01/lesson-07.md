---
id: lesson-07
title: 图片如何变成 784 个数字
eyebrow: 阶段 C · 数字、数组与图片
type: lesson
stage: C NumPy 与图片
order: 7
minutes: 34
nav: 07 像素与 MNIST
description: 看懂灰度、像素、归一化、标签，以及训练集与测试集。
---

# 图片如何变成 784 个数字

<p class="lesson-lead">模型看不到“7”这个概念。它收到的是 28×28 个像素值，以及老师告诉它的正确标签。</p>

## 灰度像素

MNIST 是灰度图。原始像素通常在 0～255 之间：0 接近黑色，255 接近白色。为了让计算稳定，我们把它除以 255，转换成 0～1。

```python
normalized = pixels.astype(np.float32) / 255.0
```

`astype` 把整数转换成小数类型。如果直接使用整数，除法和后续梯度计算容易产生不符合预期的结果。

<div class="pixel-demo"><div class="pixel-grid"><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i><i></i><i class="on"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="on"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="on"></i></div><span>每个方格都是一个数字。图像只是这些数字按二维位置排列后的视觉结果。</span></div>

## 标签、训练集与测试集

- 图片 `x`：模型的输入；
- 标签 `y`：这张图的正确数字；
- 训练集：允许模型用来调整参数；
- 测试集：训练过程中不用于更新参数，只用来检查是否能处理没见过的图片。

如果只看训练集表现，模型可能只是“记住”训练图片。测试集用来衡量泛化能力。

## 本课素材

`practice-kits/course-01-neural-network/materials/` 会保存数据说明。真正训练时，下载脚本会把 MNIST 放进 `data/`，不需要把大数据文件提交到 GitHub。

<div class="exercise"><strong>本节动手任务</strong><ol><li>画一个 4×4 的黑白小图，并把每个格子写成 0 或 1。</li><li>按行把它拉平成长度为 16 的列表。</li><li>写出它的 shape 从 `(4,4)` 变成 `(16,)` 的过程。</li><li>解释为什么测试集不能参与权重更新。</li></ol></div>

<details class="checkpoint"><summary>自检：为什么要除以 255？</summary><p>把像素缩放到 0～1，能让不同输入处于较稳定的数值范围，减少计算过大或更新不稳定的问题。</p></details>
