# Website

这是不依赖前端框架的 Markdown 文档式课程站，共 5 门课、75 个小节。

## 内容目录

```text
content/common/     素材下载与后续路线
content/course-01/  神经网络与 MNIST
content/course-02/  线性回归
content/course-03/  CNN
content/course-04/  文本分类
content/course-05/  AI 应用部署
downloads/          网站可直接下载的练习 ZIP
```

编辑 Markdown 后，在仓库根目录执行：

```bash
python3 website/build.py
```

`build.py` 会递归读取 `content/` 并生成 `content.js`。`challenges.js` 保存第一课实验，`challenges-expanded.js` 保存 02–05 的实验；`python-worker.js` 在独立 Worker 中加载 Pyodide。

学员练习源文件位于根目录 `practice-kits/`。不要直接编辑 `downloads/` 内 ZIP；修改素材后运行 `python3 tools/build_practice_zip.py` 重新打包。
