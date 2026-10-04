# 五课学员起步包

这里故意不放完整答案。第一课文件在当前目录；第二至第五课分别位于四个课程子目录，每课有 15 个练习和一份小型示例数据。请按网站顺序逐个补全。

## 顺序

1. `00_hello.py`：第一次运行 Python；
2. `01_python_basics.py`：变量、条件、循环、函数；
3. `02_numpy_practice.py`：数组、shape、reshape、矩阵乘法；
4. `03_neuron.py`：单个神经元；
5. `04_mlp.py`：MLP、前向传播、损失与反向传播；
6. `05_train.py`：batch、epoch、训练与测试；
7. `06_predict.py`：真实图片预处理和预测。

后续课程：

- `course-02-linear-regression/`：线性回归；
- `course-03-cnn/`：CNN 图片分类；
- `course-04-text-classification/`：文本分类；
- `course-05-deployment/`：AI 小应用部署。

每个文件只有任务说明和自检标准。遇到问题时先打印中间值和 shape，不要立刻寻找完整答案。成功运行后，可回到网页实验室点击“查看标准答案”对照。

## 运行方式

从项目根目录运行，例如：

```bash
uv run python practice-kits/00_hello.py
```

完整仓库使用根目录 `pyproject.toml` 管理依赖。如果只下载了本站 ZIP，可在解压目录执行：

```bash
python3 -m pip install -r requirements.txt
```
