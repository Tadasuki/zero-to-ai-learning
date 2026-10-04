# 从零开始学 AI · 文档网站

这是一个不依赖前端框架的 Markdown 文档式课程站。全站包含 5 门项目课、39 个小节，从“什么是程序”开始，依次完成 MNIST MLP、线性回归、CNN、文本分类和 AI 网页部署。

## 修改课程内容

1. 编辑 `docs/` 里的 Markdown 文件；
2. 每个文件开头用 frontmatter 写 `id`、`title`、`type`、`order` 等信息；
3. 运行 `python3 site/build.py` 重新生成 `content.js`；
4. 用 `python3 -m http.server 4173 --directory site` 预览。

以后增加新课程时，新增 Markdown 文件并填写 `course`、`stage` 即可。课程导航会先按课程、再按阶段分组，并按照 `order` 自动排列。

## 网页练习

`challenges.js` 为 39 个小节配置任务、起始代码、检查条件、提示和参考答案；`python-worker.js` 在独立 Worker 中加载 Pyodide 并运行代码。检查以核心输出、数值、数组形状或函数行为为准，不要求照抄固定变量名。参考答案默认收起，但学习者可随时直接查看。

课程目录支持按整课和阶段两级收起，并记住学习者的折叠状态。窄屏设备会自动切换为抽屉式目录，编辑器和按钮也会改为适合触控的单列布局。

学员空白练习素材位于项目根目录的 `starter/`。它只包含任务和自检标准，不包含完整实现。

## 填写 GitHub 下载链接

在 `site/build.py` 中修改：

```python
"githubUrl": "https://github.com/你的账号/你的仓库",
```

重新构建后，“素材与下载”页面会出现 GitHub 下载按钮。
