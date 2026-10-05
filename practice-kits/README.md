# 五课学员起步包

这里故意不放完整答案。五门课采用完全相同的目录层级和命名规则，请按网站顺序逐个补全。

## 命名规则

练习文件统一命名为 `课程号文件号_文件名.py`：

- `0100_hello.py`：第 01 课、第 00 个文件；
- `0207_linear_regression.py`：第 02 课、第 07 个文件；
- `0514_deployment.py`：第 05 课、第 14 个文件。

## 课程目录

1. `course-01-neural-network/`：Python、NumPy、MLP 与 MNIST；
2. `course-02-linear-regression/`：线性回归与连续数值预测；
3. `course-03-cnn/`：卷积神经网络与图片分类；
4. `course-04-text-classification/`：文本向量化与情感分类；
5. `course-05-deployment/`：推理管线、接口、网页与部署。

每个课程目录都有自己的 `README.md`，逐个说明本课全部文件和完成顺序。

每个文件只有任务说明和自检标准。遇到问题时先打印中间值和 shape，不要立刻寻找完整答案。成功运行后，可回到网页实验室点击“查看标准答案”对照。

## 运行方式

从项目根目录运行，例如：

```bash
uv run python practice-kits/course-01-neural-network/0100_hello.py
```

完整仓库使用根目录 `pyproject.toml` 管理依赖。如果只下载了本站 ZIP，可在解压目录执行：

```bash
python3 -m pip install -r requirements.txt
```
