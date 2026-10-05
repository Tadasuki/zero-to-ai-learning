# 仓库维护边界

- `website/`：生产站点；Cloudflare Pages 的输出目录。
- `practice-kits/`：学员下载包的唯一源目录，不放完整答案。
- `docs/`：覆盖矩阵、维护规则，不参与网站构建。
- `tools/`：课程与素材同步生成工具。

新增课程内容时，先更新课程正文与网页实验，再补练习骨架和覆盖矩阵。发布前运行 `python3 website/build.py` 和 `python3 tools/build_practice_zip.py`，确保网站和下载包来自同一版本。
