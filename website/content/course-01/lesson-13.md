---
id: lesson-13
title: 亲手写损失、反向传播和更新
eyebrow: 阶段 E · 从空文件完成项目
type: lesson
stage: E 自己完成项目
order: 13
minutes: 90
nav: 13 实现训练核心
description: 按梯度形状逐层完成损失、反向传播和参数更新，并用小数据自检。
---

# 亲手写损失、反向传播和更新

<p class="lesson-lead">这是项目最难的一节。不要追求一次写完：先完成损失，再完成输出层梯度，最后回到第一层。</p>

## 任务 1：交叉熵损失

输入是预测概率 `(batch,10)` 和标签 `(batch,)`。用标签作为列索引，取出每个样本正确类别的概率，再计算负对数平均值。

为了避免 `log(0)`，给概率加一个非常小的数，例如 `1e-12`。

## 任务 2：输出层梯度

Softmax 与交叉熵组合后：

```text
dz2 = probabilities - one_hot(y)
```

然后除以 batch 大小。`dw2` 要和 `w2` 形状相同，`db2` 要和 `b2` 相同。

## 任务 3：把梯度传回隐藏层

按影响链继续：

```text
dz2 → da1 → dz1 → dw1 / db1
```

ReLU 小于等于 0 的位置，梯度应被置为 0。

<div class="gradient-check"><span>dw1 与 w1 同形状</span><span>db1 与 b1 同形状</span><span>dw2 与 w2 同形状</span><span>db2 与 b2 同形状</span></div>

## 任务 4：参数更新

为四个参数分别执行：

```text
参数 = 参数 - 学习率 × 对应梯度
```

先用一个很小的随机 batch 连续更新 20 次。即使准确率没有意义，损失也应该总体下降；如果快速变成 `nan`，检查学习率、Softmax 稳定处理和 `log(0)`。

<div class="exercise"><strong>本节交付物</strong><ol><li>一个返回 loss 和四组梯度的函数。</li><li>所有梯度 shape 与对应参数一致。</li><li>一个只负责更新参数的 step 函数。</li><li>极小数据上连续训练时损失能下降。</li></ol></div>

<details class="checkpoint"><summary>为什么先在小数据上验证？</summary><p>小数据运行快、容易打印中间值。先证明单步计算正确，再接入 60,000 张图片，能显著减少排错范围。</p></details>
