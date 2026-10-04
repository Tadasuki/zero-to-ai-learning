---
id: lesson-14
title: 组装训练、测试与手写预测
eyebrow: 阶段 E · 从空文件完成项目
type: lesson
stage: E 自己完成项目
order: 14
minutes: 110
nav: 14 完成最终项目
description: 自己完成数据加载、batch、epoch、测试、保存模型和手写图片预处理。
---

# 组装训练、测试与手写预测

<p class="lesson-lead">最后一节把前面的零件接起来。你会第一次真正训练自己写的网络，并用没见过的图片验收。</p>

## 任务 1：加载与整理数据

使用课程素材中的下载说明获得 MNIST。完成：读取图片与标签、图片 reshape 为 `(-1,784)`、转换为 float32、除以 255。

先只取 1,000 张训练图片，打印：图片 shape、标签 shape、像素最小值和最大值。

## 任务 2：batch 与 epoch

每个 epoch 开始时打乱训练样本；按 batch_size 切片；每个 batch 依次执行：

```text
forward → loss → backward → step
```

先用 1,000 张训练 1 个 epoch，确认没有报错，再扩大到 10,000，最后再决定是否使用全部 60,000。

## 任务 3：准确率

用 `argmax` 找到每行概率最大的类别，与真实标签比较，再求平均值。测试集只做 forward，不执行 step。

## 任务 4：保存和加载

用 `np.savez` 保存四组参数；重新启动程序后用 `np.load` 恢复。加载后对同一图片的预测应该一致。

## 任务 5：自己的手写图片

你的图片可能是白底黑字，也可能是黑底白字。需要完成：灰度化、判断是否反相、裁剪空白、保持比例缩放、放到 28×28 中央、归一化、reshape 成 `(1,784)`。

<div class="milestone"><strong>最终验收清单</strong><label><input type="checkbox"> 我能从空白练习文件写出训练代码</label><label><input type="checkbox"> loss 总体下降</label><label><input type="checkbox"> 测试准确率明显高于随机猜测的 10%</label><label><input type="checkbox"> 模型能保存并重新加载</label><label><input type="checkbox"> 我能解释一次预测从像素到概率的全过程</label><label><input type="checkbox"> 我用自己的手写图片做过至少 10 次测试并记录错误</label></div>

## 最后的实验报告

记录四项：你使用的隐藏层大小、学习率、训练轮数、测试准确率。然后只改变其中一项再训练一次，写出结果变化和你的解释。

<div class="exercise"><strong>成果不是“跑出 95%”</strong><p>真正的成果是：你能解释代码、定位错误、修改一个参数并预测它可能带来的影响。准确率只是实验结果之一。</p></div>

<details class="checkpoint"><summary>项目完成后，你应该能讲清哪条主线？</summary><p>图片变成像素数组；前向传播得到概率；损失衡量错误；反向传播计算参数影响；梯度下降更新参数；测试集检查泛化；预处理让真实手写图片接近训练数据格式。</p></details>
