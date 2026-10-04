---
id: lesson-03
title: 列表、条件判断与循环
eyebrow: 阶段 B · Python 基础语法
type: lesson
stage: B Python 基础
order: 3
minutes: 35
nav: 03 列表、if 和循环
description: 学会保存一组数、根据条件做选择，并重复执行训练步骤。
---

# 列表、条件判断与循环

<p class="lesson-lead">一张图片包含很多像素，训练包含很多样本和很多轮。列表负责保存一组数据，循环负责重复工作，条件判断负责在不同情况下采取不同动作。</p>

## 列表：把多个值放在一起

```python
pixels = [0.0, 0.2, 0.9, 1.0]
print(pixels[0])
print(len(pixels))
```

索引从 0 开始，所以 `pixels[0]` 是第一个值。

## if：满足条件才执行

```python
probability = 0.82
if probability > 0.5:
    print("判断为正类")
else:
    print("判断为负类")
```

Python 用缩进表示哪些代码属于 `if`。建议统一使用 4 个空格。

## for：重复执行

```python
for pixel in pixels:
    print(pixel)
```

训练时，我们会写“对每一轮训练”“对每一个小批次”执行相同计算。

<div class="exercise"><strong>本节动手任务</strong><ol><li>建立一个含 5 个损失值的列表。</li><li>用循环逐个打印。</li><li>如果损失小于 0.2，打印“已经很小”；否则打印“继续训练”。</li><li>自己计算总和与平均值，暂时不要使用 NumPy。</li></ol></div>

<details class="checkpoint"><summary>自检：为什么训练不能手写 60,000 次同样的代码？</summary><p>循环可以让同一段逻辑作用于不同样本。这样代码更短、更容易修改，也不容易因重复复制而出错。</p></details>
