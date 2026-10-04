---
id: lesson-04
title: 函数、模块与调试方法
eyebrow: 阶段 B · Python 基础语法
type: lesson
stage: B Python 基础
order: 4
minutes: 35
nav: 04 函数和调试
description: 把重复步骤封装成函数，理解参数、返回值、import 和逐步调试。
---

# 函数、模块与调试方法

<p class="lesson-lead">神经网络代码会分成“前向传播、计算损失、反向传播、更新参数”等部分。函数让每一部分有清楚的名字和输入输出。</p>

## 定义函数

```python
def weighted_sum(x, w, b):
    result = x * w + b
    return result
```

`x、w、b` 是参数；`return` 把计算结果交回调用者。

```python
output = weighted_sum(0.8, 0.5, 0.1)
print(output)
```

## 模块与 import

一个 `.py` 文件就是一个模块。`import` 可以使用其它模块提供的功能：

```python
import math
print(math.exp(1))
```

后面我们会 `import numpy as np`，`np` 只是给 NumPy 起的短名字。

## 调试四步法

1. 看报错最后一行；
2. 找文件名和行号；
3. 用 `print` 输出中间值和数据形状；
4. 每次只修最早出现的一个问题。

<div class="exercise"><strong>本节动手任务</strong><ol><li>写一个 <code>relu(x)</code> 函数。</li><li>x 小于 0 时返回 0，否则返回 x。</li><li>传入 -2、0、3，确认输出为 0、0、3。</li><li>故意把函数名拼错一次，观察 NameError。</li></ol></div>

<details class="checkpoint"><summary>自检：print 和 return 有什么不同？</summary><p><code>print</code> 只把内容显示给人看；<code>return</code> 把结果交给后续代码继续使用。函数可以 return 而不 print。</p></details>
