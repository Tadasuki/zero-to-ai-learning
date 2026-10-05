"""组装训练循环。

任务清单：
1. 加载 MNIST 图片和标签。
2. reshape 图片并归一化到 0～1。
3. 每个 epoch 打乱训练样本。
4. 按 batch_size 切片。
5. 对每个 batch 执行 forward、loss、backward、step。
6. 每个 epoch 打印平均 loss 和测试准确率。
7. 使用 np.savez 保存模型参数。

请先用 1,000 张图片和 1 个 epoch 调试，再逐步扩大。
"""
