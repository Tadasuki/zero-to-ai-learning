---
id: resources
title: 空白练习素材与下载
eyebrow: 配套资料 · 自己完成代码
type: resources
order: 30
minutes: 8
nav: 空白练习素材
description: 只提供数据说明、空白练习文件、任务清单和实验记录，不提供完整答案。
---

# 空白练习素材与下载

<p class="lesson-lead">素材包不是一个已经能运行的 AI 项目。它只提供文件结构、任务说明、自检标准和实验记录表，核心代码需要学习者自己完成。</p>

## 学员起步包

<div class="download-card"><div class="download-mark">⌘</div><div><strong>五课零基础练习素材包</strong><p>五个同级课程目录、统一四位编号，共 67 个 Python 练习，并附示例数据、项目说明与实验记录表。</p></div><a class="download-now" href="downloads/zero-to-ai-practice-kits.zip" download>一键下载 ZIP</a></div>

## 文件介绍

### 第一课 · 神经网络识别手写数字

目录：`course-01-neural-network/`

1. `0100_hello.py`：第一次运行 Python；
2. `0101_python_basics.py`：变量、条件、循环和函数；
3. `0102_numpy_practice.py`：数组、shape、reshape 和矩阵乘法；
4. `0103_neuron.py`：权重、偏置与单个神经元；
5. `0104_mlp.py`：MLP、前向传播、损失与反向传播；
6. `0105_train.py`：batch、epoch、训练集与测试集；
7. `0106_predict.py`：处理真实手写图片并完成预测。

### 第二课 · 线性回归：让机器学会预测

目录：`course-02-linear-regression/`

1. `0200_linear_regression.py`：回归到底在解决什么；
2. `0201_linear_regression.py`：特征、标签与一行数据；
3. `0202_linear_regression.py`：清洗 CSV 与缺失值；
4. `0203_linear_regression.py`：划分训练集、验证集和测试集；
5. `0204_linear_regression.py`：直线模型 y=wx+b；
6. `0205_linear_regression.py`：向量化批量预测；
7. `0206_linear_regression.py`：MSE 与 MAE；
8. `0207_linear_regression.py`：梯度与下坡方向；
9. `0208_linear_regression.py`：推导 dw 与 db；
10. `0209_linear_regression.py`：梯度下降训练循环；
11. `0210_linear_regression.py`：标准化与学习率；
12. `0211_linear_regression.py`：基线、MAE、RMSE 与 R²；
13. `0212_linear_regression.py`：过拟合与正则化；
14. `0213_linear_regression.py`：多特征线性回归；
15. `0214_linear_regression.py`：完成并解释预测项目。

### 第三课 · CNN：让网络更会看图片

目录：`course-03-cnn/`

1. `0300_cnn.py`：图片、像素、通道与 shape；
2. `0301_cnn.py`：建立图片数据集与标签；
3. `0302_cnn.py`：可视化与归一化；
4. `0303_cnn.py`：卷积核寻找局部模式；
5. `0304_cnn.py`：亲手实现二维卷积；
6. `0305_cnn.py`：步幅、填充与输出尺寸；
7. `0306_cnn.py`：多卷积核、多通道与特征图；
8. `0307_cnn.py`：ReLU 保留有用响应；
9. `0308_cnn.py`：池化压缩空间；
10. `0309_cnn.py`：追踪完整 CNN 的形状；
11. `0310_cnn.py`：损失、优化器与训练循环；
12. `0311_cnn.py`：数据增强与过拟合；
13. `0312_cnn.py`：混淆矩阵与错误样本；
14. `0313_cnn.py`：公平比较 MLP 与 CNN；
15. `0314_cnn.py`：完成迷你图片分类器。

### 第四课 · 文本分类：让机器读懂一类话

目录：`course-04-text-classification/`

1. `0400_text_classification.py`：文本分类在判断什么；
2. `0401_text_classification.py`：Unicode、字符与分词；
3. `0402_text_classification.py`：清洗与规范化；
4. `0403_text_classification.py`：只用训练集建立词表；
5. `0404_text_classification.py`：词袋向量；
6. `0405_text_classification.py`：TF-IDF；
7. `0406_text_classification.py`：N-gram 与词序；
8. `0407_text_classification.py`：线性打分与 Sigmoid；
9. `0408_text_classification.py`：二元交叉熵与梯度；
10. `0409_text_classification.py`：训练逻辑回归文本模型；
11. `0410_text_classification.py`：划分文本数据并防止泄漏；
12. `0411_text_classification.py`：精确率、召回率与 F1；
13. `0412_text_classification.py`：否定、反讽与错例分析；
14. `0413_text_classification.py`：保存完整文本管线；
15. `0414_text_classification.py`：完成短评情感分类器。

### 第五课 · 部署 AI 小应用

目录：`course-05-deployment/`

1. `0500_deployment.py`：区分训练与推理；
2. `0501_deployment.py`：模型文件、配置与版本；
3. `0502_deployment.py`：输入输出契约；
4. `0503_deployment.py`：输入校验与预处理；
5. `0504_deployment.py`：组成推理管线；
6. `0505_deployment.py`：HTTP、JSON 与状态码；
7. `0506_deployment.py`：实现预测请求处理器；
8. `0507_deployment.py`：网页的四种状态；
9. `0508_deployment.py`：使用 fetch 发请求；
10. `0509_deployment.py`：错误、安全与隐私；
11. `0510_deployment.py`：性能、缓存与批量；
12. `0511_deployment.py`：版本、灰度与回滚；
13. `0512_deployment.py`：测试与健康检查；
14. `0513_deployment.py`：部署、日志与监控；
15. `0514_deployment.py`：发布你的 AI 小应用。

<div class="callout callout-yellow"><strong>为什么不提供完整答案？</strong><br>这门课的目标不是成功运行别人的代码，而是能解释并亲手写出自己的版本。每一节提供预期 shape、输出范围和检查方法，让你知道是否走对。</div>

## GitHub 下载入口

<div id="githubResource" class="github-resource"></div>

公开仓库提供课程网站、Markdown 正文和不含完整答案的练习骨架。只想练习时，直接点击上方按钮下载整理好的素材包；需要参与维护时，再进入 GitHub 克隆完整仓库。

## 本地素材位置

下载仓库后，练习文件位于：

```text
practice-kits/
```

从项目根目录运行练习：

```bash
uv run python practice-kits/course-01-neural-network/0100_hello.py
```

## 数据素材

MNIST 数据不会放进 GitHub 仓库，避免仓库体积膨胀。到第 14 节时，学习者根据 `practice-kits/course-01-neural-network/materials/MNIST.md` 的检查清单加载数据；下载后的文件只保存在本地 `data/`。

## 学习约定

- 不跳过 Python 和 NumPy 基础；
- 不直接打开教师参考实现照抄；
- 每次只完成一个任务并运行一次；
- 遇到错误先看行号、变量值和 shape；
- 每次实验只改变一个参数；
- 在 `EXPERIMENT_LOG.md` 记录结果和失败样例。

<div class="provenance"><span class="badge badge-code">课程素材</span> 素材包与全部 75 节课程任务对应，最终成果由学习者亲手完成。</div>
