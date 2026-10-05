"""把 practice-kits/ 打包为网站的一键下载文件。"""

from __future__ import annotations

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "practice-kits"
OUTPUT = ROOT / "website" / "downloads" / "zero-to-ai-practice-kits.zip"


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    files = [
        path
        for path in sorted(SOURCE.rglob("*"))
        if path.is_file()
        and ".DS_Store" not in path.parts
        and "__pycache__" not in path.parts
        and path.suffix != ".pyc"
    ]
    with ZipFile(OUTPUT, "w", ZIP_DEFLATED) as archive:
        for path in files:
            archive.write(path, Path("practice-kits") / path.relative_to(SOURCE))
    print(f"已生成 {OUTPUT}，包含 {len(files)} 个文件。")


if __name__ == "__main__":
    main()
