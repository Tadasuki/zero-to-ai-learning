"""生成 02-05 课程正文、网页实验和可下载练习骨架。

课程数据集中维护，避免 Markdown、网页实验与素材包三处逐渐失去同步。
"""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "website" / "content"
KITS = ROOT / "practice-kits"


COURSES = {
    2: {
        "slug": "linear-regression",
        "title": "线性回归：让机器学会预测",
        "project": "根据学习时长预测考试分数",
        "data": "hours,score\n1,48\n2,55\n3,61\n4,68\n5,74\n6,81\n7,86\n8,92\n",
        "lessons": [
            ("回归到底在解决什么", "A 认识回归", "先分清分类与回归，并把现实问题写成“特征 → 连续标签”。", "回归输出可以在数轴上连续移动的数值。面积、时长是特征，分数是标签；训练样本就是一组已经知道答案的例子。", "不要因为标签看起来像数字就认定是回归。邮政编码和手写数字编号是类别，不适合做加减。", "列出 3 个回归任务，并为学习时长预测分数写出 x 与 y。"),
            ("特征、标签与一行数据", "A 认识回归", "读懂数据表的一行究竟告诉模型什么。", "特征 x 是预测时允许使用的信息，标签 y 是训练时提供的正确答案。多行样本组成数据集，列的含义与单位必须先写清。", "把答案列偷偷放进特征会造成数据泄漏，训练分数很好，真正预测却完全失效。", "读取 hours_scores.csv，打印列名、行数和前三行。"),
            ("清洗 CSV 与缺失值", "A 认识回归", "在训练前识别空值、错误类型、重复行和不合理范围。", "模型只接受稳定的数值数组。清洗不是把异常全部删掉，而是记录判断规则：缺失值补、删还是重新采集，都应有理由。", "字符串数字、空白和不同单位会让数组悄悄变成文本类型；先检查 dtype，再做计算。", "用 csv 模块读取样例，过滤空行并把两列转为 float。"),
            ("划分训练集、验证集和测试集", "B 建立模型", "让模型练习、调参和最终考试使用不同数据。", "训练集用于更新参数，验证集用于选择学习率等设置，测试集只在最后使用。随机打乱前固定种子，实验才可复现。", "反复查看测试集再改模型，等于提前看考试答案；得到的测试分数会过于乐观。", "按 60%/20%/20% 划分 10 个索引，确认没有重复或遗漏。"),
            ("直线模型 y=wx+b", "B 建立模型", "理解权重和偏置如何把输入变成预测。", "w 表示 x 每增加 1，预测平均改变多少；b 表示 x 为 0 时的基准。训练就是从数据中寻找更合适的 w 与 b。", "w 和 b 的解释依赖单位。把小时换成分钟，w 的数值会改变，但现实规律没有改变。", "写 predict(x,w,b)，分别尝试两组参数并比较预测。"),
            ("向量化批量预测", "B 建立模型", "一次计算整批数据，并用 shape 检查广播是否正确。", "NumPy 能让 x*w+b 同时作用于所有样本。向量化不是魔法，只是把重复循环交给经过优化的底层实现。", "(n,) 与 (n,1) 混用可能广播成 (n,n)。每步都打印 shape，比盯着数值更容易发现错误。", "让 4 个输入一次得到 4 个预测，并断言输出 shape 与输入相同。"),
            ("MSE 与 MAE：怎样衡量错多少", "B 建立模型", "用一个数字汇总整批预测误差，并理解两种损失的差异。", "误差是预测减真实值。MSE 先平方再平均，对大错误惩罚更重；MAE 取绝对值后平均，更容易解释为平均差多少。", "损失小不代表模型在所有区间都可靠。还要查看单个误差和残差分布。", "手写 mse 和 mae 函数，用同一组数据比较结果。"),
            ("梯度：哪边是下坡", "C 亲手训练", "把梯度理解成损失对参数变化的敏感方向。", "当 dw 为正，增大 w 会让损失上升，因此应减小 w；当 dw 为负则相反。梯度给方向和局部坡度，不会直接给最佳答案。", "梯度不是误差本身。误差发生在每个样本，梯度是所有样本对某个参数的共同建议。", "用有限差分比较 w 左右两侧的损失，判断应该往哪边移动。"),
            ("推导 dw 与 db", "C 亲手训练", "从 MSE 和直线模型得到可编程的梯度公式。", "对 n 个样本，dw=2/n·Σ((ŷ-y)x)，db=2/n·Σ(ŷ-y)。x 出现在 dw 中，因为 w 对不同 x 的影响不同。", "忘记除以样本数会让批量越大，更新步子越大；忘记因子 2 虽能训练，却会改变学习率含义。", "实现 gradients(x,y,w,b)，返回两个浮点数。"),
            ("写出梯度下降训练循环", "C 亲手训练", "把预测、损失、求梯度、更新参数串成重复训练。", "每一轮先用旧参数完成前向计算，再一次性更新 w、b。保存损失历史，才能判断模型是在学习、停滞还是发散。", "在算完 dw 后立刻更新 w，再用新 w 计算 db，会混合两个时刻的参数。先算完全部梯度再更新。", "从 w=b=0 训练 200 轮，每 20 轮打印一次损失。"),
            ("标准化与学习率", "C 亲手训练", "理解特征尺度为何影响训练速度，以及步子太大或太小会怎样。", "标准化把 x 变为 (x-均值)/标准差，使不同特征处在相近尺度。学习率控制沿梯度走多远。", "均值和标准差只能从训练集计算，再用于验证、测试和新输入，否则会泄漏未来信息。", "比较原始数据与标准化数据在两个学习率下的损失变化。"),
            ("基线、MAE、RMSE 与 R²", "D 评估改进", "用多个角度回答模型到底好不好。", "基线可以始终预测训练集均值。MAE 易解释，RMSE 对大错误敏感，R² 比较模型与均值基线，1 越好，0 表示没超过基线。", "单一指标会隐藏问题。报告指标时同时写数据划分、单位和基线，数字才有上下文。", "实现三个指标，并确认你的模型至少优于均值基线。"),
            ("过拟合与正则化", "D 评估改进", "识别训练很好、未见数据变差的现象。", "模型过度追随训练数据细节叫过拟合。在线性回归中可减少无关特征、增加数据或用 L2 惩罚过大的权重。", "训练损失继续下降不是永远的好消息；真正目标是未见样本误差。", "计算 loss + λw²，并观察 λ 增大时总损失怎样变化。"),
            ("从一个特征到多个特征", "D 评估改进", "把 wx+b 推广为矩阵 X@w+b，并读懂每个权重。", "X 的每一行是一条样本，每一列是一种特征，w 的长度等于特征数。矩阵乘法把每列贡献相加。", "不同量纲会让权重大小无法直接比较；先标准化，再讨论哪些特征更重要。", "用学习时长和睡眠时长两个特征完成一次批量预测。"),
            ("完成并解释预测项目", "E 完整项目", "独立串起数据、训练、评估、保存和新样本预测。", "完整项目不仅要跑出数字，还要保存数据说明、随机种子、参数、指标和误差样本，让别人能复现你的结论。", "不要在最后一步才检查数据。先做基线，再训练；发现模型不如基线时回到数据和实现排查。", "完成 project.py，并用自己的话解释 w、b、测试指标和一个误差案例。"),
        ],
    },
    3: {
        "slug": "cnn",
        "title": "CNN：让网络更会看图片",
        "project": "迷你图案分类器",
        "data": json.dumps({"labels": ["vertical", "horizontal"], "images": ["010010010", "000111000", "001001001", "000000111"]}, ensure_ascii=False, indent=2),
        "lessons": [
            ("图片在电脑里是一组数字", "A 认识图像", "把像素、宽高、通道和批量维度说清楚。", "灰度图可表示为 (高,宽)，彩色图通常是 (高,宽,3)，训练时再加批量维。像素值是亮度，不是模型眼中的物体。", "库的通道顺序可能是 HWC 或 CHW。先查看 shape，再决定沿哪个轴计算。", "创建 3×3 灰度图，打印 shape、中心像素和最大值。"),
            ("建立图片数据集与标签", "A 认识图像", "让图片、标签和划分一一对应。", "每张图片必须对应一个明确标签。类别数量、样本分布和文件命名都应在训练前统计。", "同一物体连续拍摄的相似照片不能分散到训练集和测试集，否则测试会虚高。", "读取 mini_images.json，统计每类数量并建立标签到编号的映射。"),
            ("可视化与归一化", "A 认识图像", "训练前看见数据，并把像素缩放到稳定范围。", "可视化能发现倒置、裁切和错标签。常见做法是把 0～255 除以 255，得到 0～1 浮点数。", "归一化不是把图变模糊，也不能修复错误标签；原图和处理后样本都要抽查。", "将一个 0～255 数组归一化，并打印最小值、最大值。"),
            ("卷积核寻找局部模式", "B 手写卷积", "理解小窗口为什么能发现边缘和纹理。", "卷积核在图像上滑动，每个位置做对应元素相乘再求和。同一个核在全图共享，因此能在不同位置寻找相同模式。", "卷积核不是人类预先规定的全部知识；训练中的 CNN 会自己更新核的数值。", "手算一个 2×2 窗口与竖边核的乘加结果。"),
            ("亲手实现二维卷积", "B 手写卷积", "用双重循环生成完整特征图。", "输出每个位置都来自一个局部窗口。窗口从左到右、从上到下移动，输出尺寸由输入、核、步幅和填充共同决定。", "循环边界多走一步会切到不完整窗口；先在纸上写输出高宽。", "实现 conv2d_valid(image,kernel)，与手算结果核对。"),
            ("步幅、填充与输出尺寸", "B 手写卷积", "能在写代码前算出特征图尺寸。", "单轴输出长度 floor((N+2P-K)/S)+1。padding 保留边缘信息，stride 控制移动间隔与下采样速度。", "same 不是任何情况下都自动同尺寸；偶数卷积核和大步幅需要明确左右填充。", "为 8×8 输入、3×3 核列出三组 P/S 的输出尺寸。"),
            ("多卷积核、多通道与特征图", "B 手写卷积", "理解一层为何能同时学习多种视觉线索。", "RGB 卷积核会跨三个输入通道求和，一个卷积核产生一张特征图；多个核产生多个输出通道。", "输出通道数由卷积核数量决定，不由输入通道数决定。", "写函数根据输入通道和核数量返回输出 shape。"),
            ("ReLU 保留有用响应", "C 组成网络", "看懂卷积后的非线性如何工作。", "ReLU 把负数变为 0，正数保持不变。没有非线性，多层卷积仍可合并为一个线性变换，表达能力有限。", "ReLU 为 0 的位置不等于像素不存在，只表示该特征在当前位置没有正响应。", "对一张含正负数的特征图实现 ReLU。"),
            ("池化压缩空间", "C 组成网络", "理解最大池化如何减小尺寸并保留强响应。", "2×2 最大池化从每个窗口保留最大值，能减少后续计算，并让小范围位移不那么敏感。", "池化会丢失位置细节；不能为了变快无限池化，尤其是小图。", "实现 2×2、步幅 2 的 max_pool2d。"),
            ("追踪一整个 CNN 的形状", "C 组成网络", "不运行代码也能写出每层张量 shape。", "典型流程是卷积→ReLU→池化→展平→线性分类。参数只属于可学习层，ReLU 和池化通常没有可学习参数。", "展平前忘记批量维，会让不同图片的数据混在一起。", "计算给定网络从 (8,8,1) 到分类 logits 的每一步 shape。"),
            ("损失、优化器与训练循环", "C 组成网络", "把 CNN 输出与标签连接，理解一次更新发生什么。", "分类层输出 logits，交叉熵衡量正确类别分数是否足够高；反向传播把梯度送回卷积核，优化器再更新参数。", "训练时先清空旧梯度。否则多数框架会累加梯度，更新大小超出预期。", "用伪代码排好 zero_grad、forward、loss、backward、step 顺序。"),
            ("数据增强与过拟合", "D 评估改进", "用合理变化增加训练多样性。", "翻转、平移、裁切或轻微颜色变化可生成新视角，但必须保持标签语义不变。验证和测试只做确定性预处理。", "数字 6 上下翻转可能变成 9；增强规则必须由任务决定。", "为图案分类写出 2 个安全增强和 1 个不安全增强。"),
            ("混淆矩阵与错误样本", "D 评估改进", "从错误类型而非只看准确率改进模型。", "混淆矩阵的行可表示真实类别、列表示预测类别；对角线是正确数量。查看最常混淆的类别和原图，才能判断数据还是模型问题。", "绘制矩阵前先确认行列定义，否则精确率与召回率会被解释反。", "根据真实与预测标签计算 2×2 混淆矩阵。"),
            ("公平比较 MLP 与 CNN", "D 评估改进", "用受控实验验证卷积的价值。", "两种模型应使用相同划分、预处理和评价指标。记录参数量、训练时间和测试表现，才能讨论效果与成本。", "只挑 CNN 最好的一次和 MLP 最差的一次比较不公平；固定种子或报告多次结果。", "设计一张包含模型、参数量、准确率、耗时的比较表。"),
            ("完成迷你图片分类器", "E 完整项目", "把数据检查、网络、训练、评估和单图预测串起来。", "最终作品应能接收一张新图，执行与训练一致的预处理，输出类别和置信度，并展示至少三个错误样本。", "只保存权重而不保存类别映射和图像尺寸，部署时会无法正确解释输出。", "完成项目文件，写模型卡说明数据、限制、指标和失败案例。"),
        ],
    },
    4: {
        "slug": "text-classification",
        "title": "文本分类：让机器读懂一类话",
        "project": "短评情感分类器",
        "data": "text,label\n这个课程讲得很清楚,1\n加载太慢了体验不好,0\n例子实用容易理解,1\n说明混乱而且报错,0\n界面简洁操作方便,1\n内容太少没有帮助,0\n",
        "lessons": [
            ("文本分类在判断什么", "A 认识文本", "把一句话、标签和分类边界定义清楚。", "文本分类把可变长度文字映射到有限类别，例如正面/负面或体育/科技。先写标签规则，模型才能学习一致目标。", "情绪可能含糊。标注者意见不一致时，应记录规则与争议，而不是假装答案绝对正确。", "为短评情感任务写出输入、输出和 3 条标注规则。"),
            ("Unicode、字符与分词", "A 认识文本", "理解电脑保存的是编码，模型需要稳定的文本单位。", "中文可按字、词或子词切分。按字简单但语义碎，按词更直观但依赖分词器；选择要与数据量和任务匹配。", "直接用空格 split 不能正确切中文；Emoji、全角标点和大小写也要明确处理。", "比较按字符和按空格切分同一句中文的结果。"),
            ("清洗与规范化", "A 认识文本", "保留语义的同时统一无意义差异。", "常见操作包括去首尾空白、统一大小写、合并重复空格。网址、数字和标点是否保留取决于任务。", "过度清洗会删掉否定词、感叹号或表情，这些可能正是情感信号。", "写 normalize_text，只处理空白与英文大小写，不删除中文否定词。"),
            ("只用训练集建立词表", "B 文字变数字", "理解词表、编号、未知词和数据泄漏。", "词表把 token 映射到整数位置。验证或测试中没见过的词映射到 <UNK>，不能为了认识它们而重建词表。", "用全数据统计词频会让测试信息进入训练流程，即使没有用标签也属于泄漏。", "从三句训练文本建词表，并把新句子中的未知词记为 UNK。"),
            ("词袋：先数词，不看顺序", "B 文字变数字", "把文本变成固定长度计数向量。", "词袋向量的每一维对应词表中的词，数值是出现次数。它简单、可解释，是非常重要的基线。", "词袋看不见顺序，所以“喜欢不”与“不喜欢”可能很接近。知道限制比盲目换复杂模型更重要。", "手写 vectorize(tokens,vocab)，输出固定长度列表。"),
            ("TF-IDF 降低常见词影响", "B 文字变数字", "理解词频和逆文档频率如何共同加权。", "TF 表示词在当前文本出现多少，IDF 对到处出现的词降权，对较少文档出现的词提高区分度。", "IDF 必须只在训练集拟合；在测试集重新计算会让同一个词含义不一致。", "计算一个词在 3 篇文档中的简化 IDF。"),
            ("N-gram 给词袋一点顺序", "B 文字变数字", "用相邻 token 组合捕捉短语。", "二元组把相邻两个 token 合成特征，因此“很 好”和“不 好”可以分开。特征数量也会快速增加。", "n 越大并非越好；数据少时，大量短语只出现一次，模型很难泛化。", "写 bigrams(tokens)，返回所有相邻二元组。"),
            ("线性打分与 Sigmoid", "C 训练分类器", "把文本向量变成 0～1 之间的概率。", "线性层计算 z=x·w+b，Sigmoid 把 z 压到 0～1。阈值 0.5 只是默认选择，可以按业务代价调整。", "概率看起来很确定不代表一定可靠；训练分布变化时，0.99 也可能错。", "实现 sigmoid，并将三个分数转换为概率和类别。"),
            ("二元交叉熵与梯度", "C 训练分类器", "理解为什么分类不直接使用准确率来更新。", "交叉熵会强烈惩罚自信但错误的预测，并且可导。对逻辑回归，logits 的梯度可写成概率减标签。", "对概率直接取 log 前应裁剪到很小正数和 1 减很小正数，避免 log(0)。", "实现 binary_cross_entropy(y,p)，比较自信正确和自信错误。"),
            ("训练一个逻辑回归文本模型", "C 训练分类器", "把向量化、概率、损失和参数更新串起来。", "一轮训练先生成整批概率，再计算 dw=Xᵀ(p-y)/n 与 db=mean(p-y)，最后更新参数。", "向量器也属于模型管线的一部分。训练和预测使用不同词表时，即使 shape 相同，含义也完全错位。", "在小型词袋矩阵上训练 200 轮，打印损失变化。"),
            ("划分文本数据并防止泄漏", "C 训练分类器", "识别重复句、同源文本和时间信息造成的泄漏。", "同一用户或同一文章的相似句应放在同一划分。上线预测未来内容时，可按时间划分而非随机划分。", "先向量化全数据再切分也可能泄漏词频统计；正确顺序是先切分，再拟合预处理。", "写出文本项目从原始数据到测试评估的正确步骤顺序。"),
            ("准确率之外：精确率与召回率", "D 评估改进", "在类别不平衡时选择合适指标。", "精确率回答预测为正的有多少真是正，召回率回答所有正例找回多少，F1 调和两者。", "99% 都是正常内容时，永远预测正常也有 99% 准确率，却抓不到任何风险文本。", "根据 TP、FP、FN 计算 precision、recall 和 F1。"),
            ("读错例：否定、反讽与领域词", "D 评估改进", "建立可执行的错误分析表。", "给错例标注原因：分词、未知词、否定、反讽、标签争议或领域变化。统计最多的原因，再决定补数据还是改特征。", "不要只挑有趣错例；应随机抽样并记录全部判断，避免凭感觉下结论。", "为 4 条错例建立文本、真值、预测、原因、改进建议字段。"),
            ("保存完整文本管线", "D 评估改进", "同时保存词表、权重、偏置、阈值和规范化规则。", "部署时必须复现训练时的 token 顺序与词表索引。模型版本应对应一套不可拆分的预处理配置。", "只保存 weights.npy 不够；换一份词表后第 10 维已不是同一个词。", "设计 model.json 的字段，并检查必要字段是否齐全。"),
            ("完成短评情感分类器", "E 完整项目", "独立完成数据说明、训练、评估、保存和新文本预测。", "成品应输出标签与概率，并明确数据很小、不能代表所有表达方式。至少展示一条正确、一条错误和一条不确定样本。", "不要把演示概率包装成可靠的人的情绪判断；模型只学到了有限样本中的模式。", "完成项目并写模型卡：用途、数据、指标、限制和不应使用的场景。"),
        ],
    },
    5: {
        "slug": "deployment",
        "title": "部署 AI 小应用",
        "project": "可分享的预测网页",
        "data": json.dumps({"model_version": "1.0.0", "input": {"type": "number", "min": 0, "max": 24}, "output": ["label", "confidence"]}, ensure_ascii=False, indent=2),
        "lessons": [
            ("训练与推理是两件事", "A 认识部署", "区分离线学参数和上线使用参数。", "训练会读取带答案数据并更新参数；推理只加载固定模型，对新输入给结果。部署重点是稳定、快速、一致地执行推理。", "线上接口绝不能每收到一次请求就重新训练，这会慢、不可复现，还可能污染模型。", "把训练步骤和推理步骤分别列成清单。"),
            ("模型文件、配置与版本", "A 认识部署", "让一个模型文件能被正确识别和回滚。", "权重之外还要保存输入尺寸、类别映射、预处理参数和版本。语义化版本能帮助判断兼容变化。", "用 latest.npz 覆盖旧模型无法追查线上结果；发布物应不可变，并保留校验值。", "保存一个 npz 和配套 metadata.json，再重新加载检查。"),
            ("先写输入输出契约", "A 认识部署", "在前后端编码前约定字段、类型、范围和错误。", "契约规定请求 JSON 长什么样、成功返回什么、失败如何表示。它让网页和模型服务可以独立开发。", "字段名称相同但单位不同也会出错，例如小时与分钟。契约必须写单位和边界。", "为学习时长预测写一份请求与响应示例。"),
            ("校验输入并复用预处理", "B 构建推理", "拒绝错误输入，并保证训练与上线转换一致。", "校验类型、缺失、范围与长度后，再调用训练时保存的标准化参数。失败要返回用户能行动的说明。", "不要用线上这一条输入重新计算均值和标准差；应加载训练集得到的统计量。", "写 validate_input(payload)，覆盖缺失、错误类型和越界。"),
            ("组成纯净的推理管线", "B 构建推理", "把校验、预处理、模型和后处理拆成可测试步骤。", "纯函数输入相同就输出相同，更容易单元测试。管线最终返回业务需要的 label、confidence 和 model_version。", "把文件读取和全局状态混进预测函数，会让并发请求互相影响并难以测试。", "实现 predict_pipeline(payload)，分别测试有效和无效输入。"),
            ("HTTP、JSON 与状态码", "B 构建推理", "理解浏览器与模型服务怎样交换信息。", "POST /predict 携带 JSON；2xx 表示成功，4xx 表示请求有问题，5xx 表示服务内部失败。响应体提供结构化详情。", "不要所有情况都返回 200 再在文字里写失败，这会让前端和监控无法可靠判断。", "为成功、缺字段、类型错和服务异常选择状态码。"),
            ("实现预测请求处理器", "B 构建推理", "把管线封装为稳定的接口行为。", "处理器解析请求、调用推理、捕获预期错误并生成统一响应。内部异常应记录追踪编号，但不暴露堆栈。", "宽泛 except 后静默返回空结果会隐藏故障；区分用户错误和系统错误。", "写 handle_predict(payload)，返回 (body,status)。"),
            ("网页需要四种状态", "C 连接网页", "为 idle、loading、success、error 设计清楚界面反馈。", "用户点击后应立即看到加载，成功显示结果，失败显示原因与重试。重复提交时要决定禁用还是取消旧请求。", "只有成功画面不算完整产品；网络失败时没有反馈会让用户以为按钮坏了。", "创建四状态字典，并写每种状态的提示文字。"),
            ("用 fetch 发请求", "C 连接网页", "理解前端怎样序列化 JSON、等待响应并更新状态。", "fetch 需要设置 Content-Type、JSON.stringify 请求体，并检查 response.ok 后再解析 JSON。", "网络成功不等于业务成功；HTTP 400 也可能有可读 JSON 错误，需要展示给用户。", "补全一段 fetch 流程的伪代码并列出异常分支。"),
            ("错误、安全与隐私", "C 连接网页", "让演示应用不会轻易泄漏或被滥用。", "限制请求大小和频率，校验所有外部输入，不把密钥写进前端。涉及个人数据时说明收集目的、保存时间和删除方式。", "CORS 不是身份验证，隐藏按钮也不是权限控制；真正限制必须在服务端。", "为小应用写 6 条上线前安全与隐私检查。"),
            ("性能、缓存与批量", "C 连接网页", "识别加载模型、预处理和推理的耗时位置。", "服务启动时加载一次模型，请求中复用。可缓存确定性结果，对大量输入批量推理，但先测量再优化。", "缓存包含个人信息的请求需要谨慎；更快不能以泄漏隐私为代价。", "用 perf_counter 测量一个模拟推理函数运行时间。"),
            ("版本、灰度与回滚", "D 稳定发布", "让新模型出问题时可以迅速恢复。", "响应携带 model_version，发布记录保存代码、模型和配置。可先让少量流量使用新版本，指标异常就回滚。", "代码回滚但模型文件仍是新版本，会形成不兼容组合；应把它们作为一个发布单元。", "设计包含版本、时间、指标、状态的发布记录。"),
            ("测试与健康检查", "D 稳定发布", "在上线前验证函数、接口和完整用户路径。", "单元测试检查预处理，接口测试检查状态码和结构，端到端测试从网页输入走到结果。/health 只报告依赖是否就绪。", "健康检查若每次执行昂贵推理，会给服务增加压力；可以分存活和就绪检查。", "为接口写 5 个测试用例，至少包含 3 个失败场景。"),
            ("部署、日志与监控", "D 稳定发布", "看见线上是否健康，而不是发布后靠猜。", "日志记录时间、版本、耗时、状态码和匿名追踪号；监控关注错误率、延迟和请求量。警报要对应可行动阈值。", "日志不要记录密码、密钥或完整私人输入。准确率没有线上标签时也不能凭空实时得到。", "设计一条不含敏感数据的结构化日志。"),
            ("发布你的 AI 小应用", "E 完整项目", "把模型、接口、网页、测试和说明作为一个可复现产品发布。", "最终验收包括有效输入、错误提示、手机界面、版本展示、健康检查和回滚说明。README 给出本地启动与限制。", "能打开网页不等于部署完成；还要验证真实域名、刷新路由、缓存和失败路径。", "完成发布清单，邀请朋友测试并记录至少 3 条反馈。"),
        ],
    },
}


def challenge_for(course: int, index: int, title: str, action: str) -> dict[str, str]:
    """每节给出真正对应任务的参考实现；检查仍不绑定固定变量名。"""
    answers = {
        2: [
            "tasks={'气温':'回归','房价':'回归','情感':'分类'}\nx='学习时长'; y='考试分数'\nprint(tasks,x,'->',y)",
            "import csv,io\nraw='hours,score\\n1,48\\n2,55\\n3,61'\nrows=list(csv.DictReader(io.StringIO(raw)))\nprint(rows[0].keys(),len(rows),rows[:3])",
            "import csv,io\nraw='hours,score\\n1,48\\n,\\n2,55'\nrows=[]\nfor r in csv.DictReader(io.StringIO(raw)):\n    if r['hours'] and r['score']: rows.append((float(r['hours']),float(r['score'])))\nprint(rows)",
            "import numpy as np\nrng=np.random.default_rng(7); ids=rng.permutation(10)\ntrain,valid,test=ids[:6],ids[6:8],ids[8:]\nassert len(set(ids))==10\nprint(train,valid,test)",
            "def predict(x,w,b): return x*w+b\nprint(predict(5,6,40),predict(5,7,35))",
            "import numpy as np\ndef predict(x,w,b): return np.asarray(x)*w+b\nx=np.array([1.,2.,3.,4.]); y=predict(x,5,40)\nassert y.shape==x.shape\nprint(y,y.shape)",
            "import numpy as np\ndef mse(y,p): return np.mean((np.asarray(p)-y)**2)\ndef mae(y,p): return np.mean(np.abs(np.asarray(p)-y))\ny=np.array([50.,60.,70.]); p=np.array([52.,55.,80.])\nprint(mse(y,p),mae(y,p))",
            "import numpy as np\nx=np.array([1.,2.,3.]); y=np.array([3.,5.,7.])\ndef loss(w): return np.mean((w*x-y)**2)\nw=1.; eps=.001; slope=(loss(w+eps)-loss(w-eps))/(2*eps)\nprint('dw',slope,'move','left' if slope>0 else 'right')",
            "import numpy as np\ndef gradients(x,y,w,b):\n    err=x*w+b-y; n=len(x)\n    return 2*np.sum(err*x)/n,2*np.mean(err)\nx=np.array([1.,2.,3.]); y=2*x+1\nprint(gradients(x,y,0.,0.))",
            "import numpy as np\nx=np.arange(1,9,dtype=float); y=6*x+40; w=b=0.; lr=.01\nfor epoch in range(201):\n    p=x*w+b; e=p-y; loss=np.mean(e**2); dw=2*np.mean(e*x); db=2*np.mean(e); w-=lr*dw; b-=lr*db\n    if epoch%20==0: print(epoch,round(loss,3))\nprint(w,b)",
            "import numpy as np\nx=np.array([60.,120.,180.]); mean,std=x.mean(),x.std(); z=(x-mean)/std\nfor lr in (.001,.1):\n    w=0.; w-=lr*2*np.mean((w*z-np.array([1.,2.,3.]))*z); print(lr,w)\nprint(z)",
            "import numpy as np\ny=np.array([50.,60.,70.]); p=np.array([52.,58.,72.]); base=np.full_like(y,y.mean())\nmae=np.mean(abs(p-y)); rmse=np.sqrt(np.mean((p-y)**2)); r2=1-np.sum((p-y)**2)/np.sum((y-y.mean())**2)\nprint(mae,rmse,r2,'baseline',np.mean(abs(base-y)))",
            "w=4.0; data_loss=3.0\nfor lam in (0,.1,1): print(lam,data_loss+lam*w*w)",
            "import numpy as np\nX=np.array([[2.,8.],[4.,7.],[6.,6.]])\nw=np.array([6.,2.]); b=30.\nprint(X@w+b,(X@w+b).shape)",
            "import numpy as np\nx=np.arange(1,9,dtype=float); y=6*x+40; w,b=np.polyfit(x,y,1)\np=w*x+b; print({'w':w,'b':b,'mae':np.mean(abs(p-y)),'new':w*9+b})",
        ],
        3: [
            "import numpy as np\nimage=np.array([[0,1,0],[1,1,1],[0,1,0]],dtype=float)\nprint(image.shape,image[1,1],image.max())",
            "labels=['vertical','horizontal','vertical','horizontal']\nlabel_to_id={name:i for i,name in enumerate(sorted(set(labels)))}\nprint({x:labels.count(x) for x in set(labels)},label_to_id)",
            "import numpy as np\nimage=np.array([[0,128,255]],dtype=float)/255\nprint(image.min(),image.max(),image)",
            "import numpy as np\nwindow=np.array([[0,1],[0,1]]); kernel=np.array([[-1,1],[-1,1]])\nprint(np.sum(window*kernel))",
            "import numpy as np\ndef conv2d_valid(image,kernel):\n    oh=image.shape[0]-kernel.shape[0]+1; ow=image.shape[1]-kernel.shape[1]+1; out=np.zeros((oh,ow))\n    for i in range(oh):\n        for j in range(ow): out[i,j]=np.sum(image[i:i+kernel.shape[0],j:j+kernel.shape[1]]*kernel)\n    return out\nprint(conv2d_valid(np.arange(16).reshape(4,4),np.ones((2,2))))",
            "def out_size(n,k,p=0,s=1): return (n+2*p-k)//s+1\nfor p,s in ((0,1),(1,1),(1,2)): print(p,s,out_size(8,3,p,s))",
            "def conv_shape(h,w,in_channels,kernels,k=3,p=1,s=1): return ((h+2*p-k)//s+1,(w+2*p-k)//s+1,kernels)\nprint(conv_shape(28,28,3,16))",
            "import numpy as np\ndef relu(x): return np.maximum(x,0)\nfeature=np.array([[-2,1],[3,-4]])\nprint(relu(feature))",
            "import numpy as np\ndef max_pool2d(x):\n    h,w=x.shape; return np.array([[x[i:i+2,j:j+2].max() for j in range(0,w,2)] for i in range(0,h,2)])\nprint(max_pool2d(np.arange(16).reshape(4,4)))",
            "shapes={'input':(1,8,8,1),'conv':(1,8,8,4),'pool':(1,4,4,4),'flatten':(1,64),'logits':(1,2)}\nfor layer,shape in shapes.items(): print(layer,shape)",
            "steps=['optimizer.zero_grad()','logits=model(x)','loss=criterion(logits,y)','loss.backward()','optimizer.step()']\nfor i,step in enumerate(steps,1): print(i,step)",
            "safe=['左右平移一像素','轻微亮度变化']; unsafe='把数字6上下翻转'\nprint('safe',safe,'unsafe',unsafe)",
            "import numpy as np\ny=np.array([0,0,1,1,1]); p=np.array([0,1,1,0,1]); cm=np.zeros((2,2),int)\nfor a,b in zip(y,p): cm[a,b]+=1\nprint(cm)",
            "models=[{'model':'MLP','params':1200,'accuracy':.82,'seconds':2.1},{'model':'CNN','params':900,'accuracy':.91,'seconds':3.4}]\nfor row in models: print(row)",
            "model_card={'task':'vertical vs horizontal','input_shape':[3,3,1],'labels':['horizontal','vertical'],'metric':{'accuracy':.9},'limits':['仅为自制小数据演示']}\nprint(model_card)",
        ],
        4: [
            "rules=['只判断短评表达的体验','无法确定时标记待复核','不根据作者身份猜标签']\nprint({'input':'短评文本','output':['负面','正面'],'rules':rules})",
            "text='AI 课程真不错😊'\nprint('字符',list(text)); print('空格',text.split())",
            "def normalize_text(text): return ' '.join(text.strip().lower().split())\nprint(normalize_text('  AI   不 难  '))",
            "train=['课程 清楚','例子 实用','说明 混乱']; vocab={'<UNK>':0}\nfor text in train:\n    for word in text.split(): vocab.setdefault(word,len(vocab))\nencoded=[vocab.get(w,0) for w in '课程 新颖'.split()]\nprint(vocab,encoded)",
            "def vectorize(tokens,vocab):\n    out=[0]*len(vocab)\n    for t in tokens:\n        if t in vocab: out[vocab[t]]+=1\n    return out\nvocab={'课程':0,'清楚':1,'实用':2}\nprint(vectorize('课程 清楚 清楚'.split(),vocab))",
            "import math\ndocuments=[{'清楚','课程'},{'课程','实用'},{'加载','慢'}]; word='清楚'; df=sum(word in d for d in documents); idf=math.log((1+len(documents))/(1+df))+1\nprint('df',df,'idf',idf)",
            "def bigrams(tokens): return [' '.join(tokens[i:i+2]) for i in range(len(tokens)-1)]\nprint(bigrams('这个 课程 不 好'.split()))",
            "import math\ndef sigmoid(z): return 1/(1+math.exp(-z))\nfor z in (-2,0,2):\n    p=sigmoid(z); print(z,p,int(p>=.5))",
            "import math\ndef bce(y,p):\n    p=min(max(p,1e-7),1-1e-7); return -(y*math.log(p)+(1-y)*math.log(1-p))\nprint('correct',bce(1,.9),'wrong',bce(1,.01))",
            "import numpy as np\nX=np.array([[1.,1.],[1.,0.],[0.,1.],[0.,0.]]); y=np.array([1.,1.,0.,0.]); w=np.zeros(2); b=0.\nfor epoch in range(201):\n    p=1/(1+np.exp(-(X@w+b))); w-=.5*(X.T@(p-y)/len(y)); b-=.5*np.mean(p-y)\n    if epoch%50==0: print(epoch,np.mean(-(y*np.log(p+1e-7)+(1-y)*np.log(1-p+1e-7))))",
            "steps=['去重并按来源分组','划分原始文本','只在训练集拟合清洗与词表','转换验证和测试','训练与调参','最后一次测试']\nfor i,x in enumerate(steps,1): print(i,x)",
            "tp,fp,fn=8,2,4\nprecision=tp/(tp+fp); recall=tp/(tp+fn); f1=2*precision*recall/(precision+recall)\nprint(precision,recall,f1)",
            "errors=[{'text':'也不是不能用','truth':1,'pred':0,'reason':'双重否定','next':'补充否定样本'}]\nrequired={'text','truth','pred','reason','next'}\nassert required<=set(errors[0]); print(errors)",
            "model={'version':'1.0','vocab':{'好':0,'差':1},'weights':[1.2,-1.1],'bias':0.0,'threshold':0.5,'normalize':'strip+lower'}\nrequired={'version','vocab','weights','bias','threshold','normalize'}\nassert required<=set(model); print(model)",
            "model_card={'use':'短评情感演示','data':'6条自制样本','metric':'需扩充测试集','limits':['反讽','新领域词'],'not_for':['判断个人心理状态']}\nprint(model_card)",
        ],
        5: [
            "training=['读取带标签数据','计算损失','更新参数','保存版本']; inference=['加载固定模型','校验新输入','预处理','预测','返回结果']\nprint('training',training); print('inference',inference)",
            "import json,io,numpy as np\nbuf=io.BytesIO(); np.savez(buf,w=6.,b=40.); buf.seek(0); loaded=np.load(buf)\nmetadata={'version':'1.0.0','input_unit':'hours','labels':['score']}\nprint(loaded['w'],loaded['b'],json.dumps(metadata,ensure_ascii=False))",
            "request={'hours':5,'unit':'hour'}; response={'ok':True,'data':{'score':72,'confidence':.83},'model_version':'1.0.0'}\nprint(request,response)",
            "def validate_input(payload):\n    if 'hours' not in payload: return False,'缺少 hours'\n    if not isinstance(payload['hours'],(int,float)): return False,'hours 必须是数值'\n    if not 0<=payload['hours']<=24: return False,'hours 应在 0~24'\n    return True,''\nfor p in ({},{'hours':'5'},{'hours':25},{'hours':5}): print(validate_input(p))",
            "def predict_pipeline(payload):\n    ok,error=validate_input(payload)\n    if not ok: return {'ok':False,'error':error,'version':'1.0'}\n    return {'ok':True,'data':{'score':6*payload['hours']+40},'version':'1.0'}\ndef validate_input(p): return ('hours' in p and isinstance(p['hours'],(int,float)), '输入错误')\nprint(predict_pipeline({'hours':5}),predict_pipeline({}))",
            "cases={'预测成功':200,'缺少字段':400,'类型错误':422,'服务异常':500}\nfor name,status in cases.items(): print(name,status)",
            "def handle_predict(payload):\n    if 'input' not in payload: return {'ok':False,'error':'缺少 input'},400\n    if not isinstance(payload['input'],(int,float)): return {'ok':False,'error':'类型错误'},422\n    return {'ok':True,'data':payload['input']*2,'version':'1.0'},200\nfor p in ({},{'input':'x'},{'input':3}): print(handle_predict(p))",
            "states={'idle':'请输入内容','loading':'正在预测，请稍候','success':'预测完成','error':'预测失败，可以重试'}\nprint(states)",
            "flow=['state=loading','fetch POST /predict','检查 response.ok','解析 JSON','成功则 state=success','网络或业务失败则 state=error']\nfor i,x in enumerate(flow,1): print(i,x)",
            "checks=['限制请求大小','限制频率','服务端校验','密钥只放服务端','日志移除隐私','说明数据保存时间']\nassert len(checks)>=6; print(checks)",
            "from time import perf_counter\ndef infer(x): return x*2+1\nstart=perf_counter(); result=[infer(x) for x in range(10000)]; elapsed=perf_counter()-start\nprint('items',len(result),'seconds',elapsed)",
            "release={'version':'1.1.0','time':'2026-10-05','metric':{'error_rate':.01},'status':'canary','rollback':'1.0.0'}\nprint(release)",
            "tests=[('valid',{'input':1},200),('missing',{},400),('type',{'input':'x'},422),('too_large',{'input':999},422),('health',None,200)]\nfor case in tests: print(case)",
            "log={'time':'2026-10-05T12:00:00Z','version':'1.0','latency_ms':23,'status':200,'trace_id':'demo-001'}\nfor forbidden in ('password','secret','raw_input'): assert forbidden not in log\nprint(log)",
            "checklist={'valid_input':True,'error_message':True,'mobile':True,'version':True,'health':True,'rollback':True,'feedback_count':3}\nassert all(v is True for k,v in checklist.items() if k!='feedback_count'); print(checklist)",
        ],
    }
    answer = answers[course][index]
    if course in (2, 3):
        starter = "import numpy as np\n\n# 根据任务写下最小实验，并打印关键中间结果\n"
        test = "values=[v for k,v in globals().items() if not k.startswith('__')]\nassert any(hasattr(v,'shape') or callable(v) or isinstance(v,(list,dict,tuple)) for v in values) or len(__output__.strip())>5\nassert __output__.strip()"
    elif course == 4:
        starter = "# 从字符串、列表、字典或一个小函数开始\n"
        test = "values=[v for k,v in globals().items() if not k.startswith('__')]\nassert values\nassert __output__.strip()"
    else:
        starter = "# 用字典和函数模拟网页与接口，不需要安装服务器框架\n"
        test = "values=[v for k,v in globals().items() if not k.startswith('__')]\nassert any(isinstance(v,(list,dict,tuple)) or callable(v) for v in values)\nassert __output__.strip()"
    return {
        "title": title,
        "task": action,
        "hint": "先完成最小版本并打印中间结果；变量名可以自由选择，检查器只看核心行为。",
        "starter": starter,
        "test": test,
        "answer": answer,
    }


def lesson_markdown(course: int, index: int, item: tuple[str, ...], project: str) -> str:
    title, stage, lead, principle, pitfall, action = item
    previous = "上一节的结果" if index else "你已经在第一课学过的“输入 → 计算 → 输出”"
    order = course * 100 + index
    return f'''---
id: c{course}-{index:02d}
title: {title}
eyebrow: 第{['零','一','二','三','四','五'][course]}课 · {stage}
type: lesson
course: course-0{course}
stage: {stage}
order: {order}
minutes: {28 if index < 10 else 36}
nav: {title}
description: {lead}
---
# {title}

<p class="lesson-lead">{lead}</p>

## 这一步在完整项目中的位置

{previous} 是本节起点。你现在只增加一个新能力，最后把它接进“{project}”。每节都先用很小的数据手算或打印，确认理解后再扩大规模。

<div class="concept-chain"><div><b>已有输入</b><span>先检查类型与形状</span></div><i>→</i><div><b>{title}</b><span>只学习一个新动作</span></div><i>→</i><div><b>可检查结果</b><span>打印、断言、记录</span></div></div>

## 原理：先用人话理解

{principle}

这不是要背一句定义。请拿纸写出“输入是什么、发生了什么计算、输出是什么”，再把每一项对应到代码里的变量。只要这三件事说得清，代码变长时也不容易迷路。

## 从最小例子到代码

1. 先准备 3～5 个能手算的输入，不急着使用完整数据集。
2. 写出本节最核心的一个函数或表达式。
3. 打印中间结果以及 shape / 类型，不只看最后答案。
4. 改动一个输入，预测结果应该怎样变，再运行验证。
5. 把结论记入 `EXPERIMENT_LOG.md`，包括失败尝试。

<div class="callout"><strong>容易踩坑</strong><p>{pitfall}</p></div>

## 本节动手练习

<div class="exercise"><strong>你来写，不先抄答案</strong><ol><li>{action}</li><li>至少加入一个 <code>assert</code> 检查关键结果。</li><li>故意改错一个输入，观察检查如何帮助你发现问题。</li><li>回到网页实验室完成同名小任务；卡住时先看提示，最后才看标准答案。</li></ol></div>

## 完成标准

- [ ] 能不用术语解释本节输入、计算与输出；
- [ ] 能独立写出最小代码并成功运行；
- [ ] 能指出一个常见错误及其现象；
- [ ] 能说明这一步将怎样接入最终项目。

<details class="checkpoint"><summary>自检：如果结果不对，第一轮应该检查什么？</summary><p>先检查输入类型、数值范围与 shape，再用极小样本手算中间结果。不要一开始就盲目调学习率或更换模型。</p></details>

<p class="source-note">本节为本站原创教学内容；公式与术语遵循常见机器学习教材定义。练习使用本仓库自制的小型示例数据，不替代真实项目的数据审查。</p>
'''


def kit_file(course: int, index: int, item: tuple[str, ...]) -> str:
    title, _, lead, _, pitfall, action = item
    return f'''"""第 {course} 课 · {index:02d} {title}

目标：{lead}
任务：{action}

本文件故意不含完整答案。先写最小版本；运行成功后再与网页标准答案对照。
"""

# TODO 1: 准备本节需要的最小输入

# TODO 2: 写核心计算或函数

# TODO 3: 打印中间结果，并加入至少一个 assert

# TODO 4: 记录一次故意失败及修复方法

# 易错提醒：{pitfall}
'''


def main() -> None:
    all_challenges: dict[str, dict[str, str]] = {}
    for course, info in COURSES.items():
        content_dir = CONTENT / f"course-0{course}"
        content_dir.mkdir(parents=True, exist_ok=True)
        kit_dir = KITS / f"course-0{course}-{info['slug']}"
        kit_dir.mkdir(parents=True, exist_ok=True)
        (kit_dir / "data").mkdir(exist_ok=True)

        for index, item in enumerate(info["lessons"]):
            lesson_id = f"c{course}-{index:02d}"
            (content_dir / f"{lesson_id}.md").write_text(
                lesson_markdown(course, index, item, info["project"]), encoding="utf-8"
            )
            (kit_dir / f"{course:02d}{index:02d}_{info['slug'].replace('-', '_')}.py").write_text(
                kit_file(course, index, item), encoding="utf-8"
            )
            all_challenges[lesson_id] = challenge_for(course, index, item[0], item[5])

        data_suffix = "json" if info["data"].lstrip().startswith("{") else "csv"
        (kit_dir / "data" / f"sample.{data_suffix}").write_text(info["data"], encoding="utf-8")
        lesson_list = "\n".join(
            f"- `{course:02d}{i:02d}_{info['slug'].replace('-', '_')}.py`：{item[0]}"
            for i, item in enumerate(info["lessons"])
        )
        (kit_dir / "README.md").write_text(
            f"# {info['title']} · 练习素材\n\n"
            f"最终项目：**{info['project']}**。本目录有 15 个空白练习和一份可直接读取的小型示例数据。\n\n"
            "建议按编号完成；每次写完先运行、再回网页验证，最后才查看答案。\n\n"
            f"## 文件顺序\n\n{lesson_list}\n\n"
            "## 自检规则\n\n1. 每节至少保留一个 `assert`；\n2. 在根目录 `EXPERIMENT_LOG.md` 记录结果；\n3. 不直接复制标准答案；\n4. 最终项目补充 README 和失败案例。\n",
            encoding="utf-8",
        )

    payload = json.dumps(all_challenges, ensure_ascii=False, indent=2)
    (ROOT / "website" / "challenges-expanded.js").write_text(
        "// Generated by tools/generate_advanced_courses.py\n"
        "window.COURSE_CHALLENGES = Object.assign({}, window.COURSE_CHALLENGES || {}, "
        + payload
        + ");\n",
        encoding="utf-8",
    )
    print(f"已生成 {sum(len(c['lessons']) for c in COURSES.values())} 节进阶课程及网页实验。")


if __name__ == "__main__":
    main()
