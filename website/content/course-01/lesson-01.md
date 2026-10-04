---
id: lesson-01
title: 创建并运行第一个 Python 文件
eyebrow: 阶段 A · 从真正的零开始
type: lesson
stage: A 认识编程
order: 1
minutes: 22
nav: 01 第一个 Python 程序
description: 学会进入文件夹、创建文件、运行代码，并读懂最常见的报错位置。
---

# 创建并运行第一个 Python 文件

<p class="lesson-lead">这一节的成果不是 AI，而是你亲手写出的第一个能运行的程序。只要这一关打通，后面所有练习都沿用同样的方法。</p>

## 认识当前文件夹

终端总是“站在”某个文件夹里。`pwd` 用来查看当前位置，`ls` 用来查看这里有哪些文件，`cd` 用来进入另一个文件夹。

```bash
pwd
ls
cd "/Users/jocelyn/Desktop/神经网络/starter"
```

双引号很重要：路径中有中文或空格时，它能让终端把整段路径当成一个整体。

## 第一条 Python 语句：print

打开 `practice-kits/00_hello.py`，亲手输入：

```python
print("你好，我正在学习 Python")
```

`print` 的作用是把括号里的内容显示在终端。英文双引号包住的是一段文字，Python 把它叫作字符串。

运行：

```bash
uv run python practice-kits/00_hello.py
```

你应该看到 `你好，我正在学习 Python`。

## 报错不是失败，而是线索

如果少写了一个引号，Python 可能显示 `SyntaxError`。阅读报错时先看最后一行，再看它指出的文件名和行号。不要一次改很多地方，只修正它指出的第一个问题，然后重新运行。

<div class="syntax-table"><div><b>SyntaxError</b><span>括号、引号或语法没有写完整</span></div><div><b>NameError</b><span>使用了还没有定义的名字</span></div><div><b>FileNotFoundError</b><span>文件不存在或路径不正确</span></div></div>

<div class="exercise"><strong>本节动手任务</strong><ol><li>让程序分三行打印你的名字、今天的学习目标、你想做的 AI 项目。</li><li>故意删除一个右括号并运行，观察报错。</li><li>恢复括号，确认程序重新运行成功。</li></ol><p>不要复制固定答案；每一行内容都由你自己决定。</p></div>

<details class="checkpoint"><summary>自检：终端命令和 Python 代码能写在同一个地方吗？</summary><p>通常不能。终端命令写在终端里，Python 代码写在 `.py` 文件里。终端再调用 Python 去执行这个文件。</p></details>
