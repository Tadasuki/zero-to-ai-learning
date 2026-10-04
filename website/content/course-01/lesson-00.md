---
id: lesson-00
title: 电脑、程序和代码是什么？
eyebrow: 阶段 A · 从真正的零开始
type: lesson
stage: A 认识编程
order: 0
minutes: 18
nav: 00 电脑怎样执行命令
description: 先弄清文件、程序、编程语言和解释器，暂时不碰神经网络代码。
---

# 电脑、程序和代码是什么？

<p class="lesson-lead">如果你从来没有写过代码，这一节就是起点。我们先不谈 AI，先回答：代码写在哪里？电脑为什么能执行？运行程序时到底发生了什么？</p>

## 程序是一份“精确步骤”

做饭时，“把鸡蛋炒熟”对人来说够用了，但电脑不知道“炒熟”是什么意思。电脑需要更精确的步骤：取两个鸡蛋、打入碗中、搅拌、加热……程序就是写给电脑的一组明确指令。

代码是这些指令的文字形式。我们会使用 Python，因为它比较接近自然语言，适合第一次编程。

<div class="concept-chain"><div><b>你写代码</b><span>保存为 .py 文件</span></div><i>→</i><div><b>Python 解释器</b><span>逐句理解代码</span></div><i>→</i><div><b>电脑执行</b><span>打印、计算、读文件</span></div></div>

## 四个容易混淆的词

<div class="definition-list"><div><strong>文件</strong><p>保存在磁盘上的内容，例如 <code>hello.py</code>。</p></div><div><strong>代码</strong><p>文件里写下的指令，例如 <code>print("你好")</code>。</p></div><div><strong>Python</strong><p>一种编程语言，也常用来指执行 Python 代码的解释器。</p></div><div><strong>终端</strong><p>用文字向电脑发命令的窗口。它不是代码文件，而是运行命令的地方。</p></div></div>

## 代码不会自动运行

把一句代码写进文件，只相当于写好了一张菜谱。你还需要告诉 Python 去执行它：

```text
python hello.py
```

这句话的意思是：“请让 Python 读取并执行 hello.py。”以后看到终端命令，不要把它们抄进 `.py` 文件；看到 Python 代码，也不要直接当作终端命令。

<div class="exercise"><strong>本节动手任务</strong><ol><li>在纸上写出“打开手机计算器并计算 3+5”的精确步骤。</li><li>圈出其中人类能理解、但电脑可能不够明确的词。</li><li>用一句话区分：代码文件和终端分别做什么。</li></ol></div>

<details class="checkpoint"><summary>自检：为什么需要 Python 解释器？</summary><p>因为电脑处理的是机器指令，而我们写的是 Python 语言。解释器负责读取 Python 代码，并把它转换成电脑能够执行的操作。</p></details>

<div class="provenance"><span class="badge badge-ai">零基础讲解</span> 本节只建立编程环境的基本概念，不要求任何数学或编程经验。</div>
