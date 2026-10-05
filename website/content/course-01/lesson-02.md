---
id: lesson-02
title: 变量、数字、文字与计算
eyebrow: 阶段 B · Python 基础语法
type: lesson
stage: B Python 基础
order: 2
minutes: 28
nav: 02 变量和数据类型
description: 从变量开始，学会保存数字、文字和计算结果。
---

# 变量、数字、文字与计算

<p class="lesson-lead">神经网络最终是在处理大量数字。开始之前，你需要先会把一个数字保存下来、参与计算，再把结果打印出来。</p>

## 变量是带名字的盒子

```python
age = 18
name = "小林"
score = 95.5
```

等号右边先计算，结果放进左边的名字。这里的等号不是数学里的“左右永远相等”，而是“把右边的值交给左边”。

常见数据类型：

- `int`：整数，例如 `18`；
- `float`：小数，例如 `0.08`；
- `str`：文字，例如 `"神经网络"`；
- `bool`：真假，只有 `True` 和 `False`。

## 四则运算与 f-string

```python
a = 10
b = 3
print(a + b)
print(a * b)
```

字符串前加 `f`，就能在大括号里放变量：

```python
loss = 0.38
print(f"当前损失是 {loss}")
```

<div class="exercise"><strong>本节动手任务</strong><ol><li>在 `practice-kits/course-01-neural-network/0101_python_basics.py` 中创建三个变量：学习轮数、学习率、课程名称。</li><li>计算 <code>输入 × 权重 + 偏置</code>，输入用 0.8，权重用 0.5，偏置用 0.1。</li><li>用 f-string 打印“神经元输出是 ……”。</li></ol><p>预期数值是 0.5，但请自己写表达式得到它。</p></div>

<details class="checkpoint"><summary>自检：为什么学习率通常是 float？</summary><p>学习率通常是小于 1 的小数，用来控制每次参数更新的步长，因此应使用能够表示小数的 float。</p></details>
