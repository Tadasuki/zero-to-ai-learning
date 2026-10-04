window.COURSE_CHALLENGES = {
  "lesson-00": {
    title: "第一次让 Python 说话",
    task: "用三条 print 语句分别输出：代码文件、Python 解释器、终端。",
    hint: "print 后面要有一对括号，文字放在英文引号中。",
    starter: "# 请从这里开始写\n",
    test: "text = ''.join(__output__.split()).lower()\nassert '代码' in text\nassert 'python' in text or '解释器' in text\nassert '终端' in text",
    answer: "print(\"代码文件\")\nprint(\"Python 解释器\")\nprint(\"终端\")"
  },
  "lesson-01": {
    title: "写出属于你的三行程序",
    task: "打印三行非空文字：你的名字、学习目标、想完成的 AI 项目。内容由你自己决定。",
    hint: "每一行使用一次 print，例如 print(\"我的名字是……\")。",
    starter: "# 第 1 行：名字\n\n# 第 2 行：学习目标\n\n# 第 3 行：AI 项目\n",
    test: "lines = [line for line in __output__.splitlines() if line.strip()]\nassert len(lines) >= 3, '需要打印至少三行非空文字'",
    answer: "print(\"我的名字是小林\")\nprint(\"我的目标是学会 Python\")\nprint(\"我想完成手写数字识别项目\")"
  },
  "lesson-02": {
    title: "计算一个神经元的加权结果",
    task: "创建 input_value=0.8、weight=0.5、bias=0.1，计算 output，并用 f-string 打印结果。",
    hint: "计算顺序是 input_value * weight + bias。",
    starter: "# 创建三个变量\n\n# 计算 output\n\n# 用 f-string 打印\n",
    test: "numbers = [v for k, v in globals().items() if not k.startswith('__') and isinstance(v, (int, float)) and not isinstance(v, bool)]\nassert any(abs(v - 0.5) < 1e-9 for v in numbers) or '0.5' in __output__",
    answer: "input_value = 0.8\nweight = 0.5\nbias = 0.1\noutput = input_value * weight + bias\nprint(f\"神经元输出是 {output}\")"
  },
  "lesson-03": {
    title: "用循环分析损失列表",
    task: "创建 losses=[0.8,0.45,0.3,0.18,0.12]，用循环打印每个值，并计算 average_loss。",
    hint: "可以先用 total=0，在循环里累加，最后除以 len(losses)。",
    starter: "losses = [0.8, 0.45, 0.3, 0.18, 0.12]\n\n# 用循环打印并累加\n\n# 计算 average_loss\n",
    test: "lists = [v for k, v in globals().items() if not k.startswith('__') and isinstance(v, list) and len(v) == 5]\nassert any(all(abs(a-b) < 1e-9 for a,b in zip(v, [0.8,0.45,0.3,0.18,0.12])) for v in lists)\nnumbers = [v for k, v in globals().items() if not k.startswith('__') and isinstance(v, (int, float)) and not isinstance(v, bool)]\nassert any(abs(v - 0.37) < 1e-9 for v in numbers) or '0.37' in __output__\nassert len([x for x in __output__.splitlines() if x.strip()]) >= 5",
    answer: "losses = [0.8, 0.45, 0.3, 0.18, 0.12]\ntotal = 0\nfor loss in losses:\n    print(loss)\n    total = total + loss\naverage_loss = total / len(losses)\nprint(f\"平均损失：{average_loss}\")"
  },
  "lesson-04": {
    title: "自己写 ReLU 函数",
    task: "定义 relu(x)：x 小于 0 返回 0，否则返回 x；打印 relu(-2)、relu(0)、relu(3)。",
    hint: "函数体内使用 if/else 和 return。",
    starter: "def relu(x):\n    # 在这里完成\n    pass\n\n# 测试三次\n",
    test: "assert relu(-2) == 0\nassert relu(0) == 0\nassert relu(3) == 3",
    answer: "def relu(x):\n    if x < 0:\n        return 0\n    else:\n        return x\n\nprint(relu(-2))\nprint(relu(0))\nprint(relu(3))"
  },
  "lesson-05": {
    title: "创建数组并改变形状",
    task: "用 NumPy 创建 shape 为 (2,3) 的数组 x，再把它 reshape 为长度 6 的 flat。",
    hint: "先 import numpy as np；使用 np.array 和 reshape。",
    starter: "import numpy as np\n\n# 创建 x\n\n# 创建 flat\n\n# 打印两个 shape\n",
    test: "import numpy as np\narrays = [v for k,v in globals().items() if not k.startswith('__') and isinstance(v, np.ndarray)]\nmatrices = [v for v in arrays if v.shape == (2,3)]\nvectors = [v for v in arrays if v.shape == (6,)]\nassert matrices and vectors\nassert any(np.array_equal(m.reshape(6), f) for m in matrices for f in vectors)",
    answer: "import numpy as np\n\nx = np.array([[1, 2, 3], [4, 5, 6]])\nflat = x.reshape(6)\nprint(x.shape)\nprint(flat.shape)"
  },
  "lesson-06": {
    title: "完成第一次矩阵乘法",
    task: "创建 a(shape 2×3) 和 b(shape 3×2)，用 @ 得到 result，并打印 result.shape。",
    hint: "a 可以用两行三个数，b 用三行两个数。",
    starter: "import numpy as np\n\n# 创建 a 和 b\n\n# 计算 result\n",
    test: "import numpy as np\narrays = [v for k,v in globals().items() if not k.startswith('__') and isinstance(v, np.ndarray)]\nleft = [v for v in arrays if v.shape == (2,3)]\nright = [v for v in arrays if v.shape == (3,2)]\nresults = [v for v in arrays if v.shape == (2,2)]\nassert left and right and results\nassert any(np.allclose(r, a @ b) for a in left for b in right for r in results)",
    answer: "import numpy as np\n\na = np.array([[1, 2, 3], [4, 5, 6]])\nb = np.array([[1, 0], [0, 1], [1, 1]])\nresult = a @ b\nprint(result)\nprint(result.shape)"
  },
  "lesson-07": {
    title: "把像素归一化并拉平",
    task: "创建 2×2 的 uint8 像素数组 pixels，得到 0～1 的 normalized，再得到长度 4 的 flat。",
    hint: "先 astype(np.float32)，再除以 255.0，最后 reshape。",
    starter: "import numpy as np\n\npixels = np.array([[0, 255], [128, 64]], dtype=np.uint8)\n\n# normalized\n\n# flat\n",
    test: "import numpy as np\narrays = [v for k,v in globals().items() if not k.startswith('__') and isinstance(v, np.ndarray)]\nnormalized_arrays = [v for v in arrays if v.shape == (2,2) and np.issubdtype(v.dtype, np.floating) and v.min() >= 0 and v.max() <= 1]\nflat_arrays = [v for v in arrays if v.shape == (4,) and np.issubdtype(v.dtype, np.floating)]\nassert normalized_arrays and flat_arrays\nassert any(np.allclose(f, n.reshape(4)) for n in normalized_arrays for f in flat_arrays)",
    answer: "import numpy as np\n\npixels = np.array([[0, 255], [128, 64]], dtype=np.uint8)\nnormalized = pixels.astype(np.float32) / 255.0\nflat = normalized.reshape(4)\nprint(normalized)\nprint(flat)"
  },
  "lesson-08": {
    title: "写出一个完整神经元",
    task: "定义 neuron(inputs, weights, bias)，计算加权和并经过 ReLU，返回输出。",
    hint: "可以用 sum(x*w for x,w in zip(inputs,weights)) 计算加权和。",
    starter: "def neuron(inputs, weights, bias):\n    # 计算 z\n    # 应用 ReLU\n    pass\n",
    test: "assert neuron([1, 2], [0.5, 0.25], 0.1) == 1.1\nassert neuron([-2, -1], [1, 1], 0) == 0",
    answer: "def neuron(inputs, weights, bias):\n    z = sum(x * w for x, w in zip(inputs, weights)) + bias\n    return max(0, z)\n\nprint(neuron([1, 2], [0.5, 0.25], 0.1))"
  },
  "lesson-09": {
    title: "只初始化网络参数",
    task: "使用 NumPy 创建 w1、b1、w2、b2，形状分别为 (784,64)、(1,64)、(64,10)、(1,10)。",
    hint: "权重用 rng.standard_normal(shape) 乘 0.01，偏置用 np.zeros。",
    starter: "import numpy as np\nrng = np.random.default_rng(42)\n\n# 创建四组参数\n",
    test: "arrays = [v for k,v in globals().items() if not k.startswith('__') and isinstance(v, np.ndarray)]\nby_shape = {shape: [v for v in arrays if v.shape == shape] for shape in [(784,64),(1,64),(64,10),(1,10)]}\nassert all(by_shape.values())\nassert any(not np.all(v == 0) for v in by_shape[(784,64)])",
    answer: "import numpy as np\nrng = np.random.default_rng(42)\n\nw1 = rng.standard_normal((784, 64)) * 0.01\nb1 = np.zeros((1, 64))\nw2 = rng.standard_normal((64, 10)) * 0.01\nb2 = np.zeros((1, 10))\nprint(w1.shape, b1.shape, w2.shape, b2.shape)"
  },
  "lesson-10": {
    title: "实现稳定版 Softmax",
    task: "定义 softmax(x)，按行减最大值、取指数、除以行和。输入和输出都是二维数组。",
    hint: "np.max 和 np.sum 都要使用 axis=1, keepdims=True。",
    starter: "import numpy as np\n\ndef softmax(x):\n    # 完成稳定版 softmax\n    pass\n",
    test: "x_test = np.array([[2.0, 1.0, 0.1], [1000.0, 999.0, 998.0]])\np = softmax(x_test)\nassert p.shape == x_test.shape\nassert np.allclose(p.sum(axis=1), 1.0)\nassert np.isfinite(p).all()",
    answer: "import numpy as np\n\ndef softmax(x):\n    shifted = x - np.max(x, axis=1, keepdims=True)\n    exp_x = np.exp(shifted)\n    return exp_x / np.sum(exp_x, axis=1, keepdims=True)\n\nprint(softmax(np.array([[2.0, 1.0, 0.1]])))"
  },
  "lesson-11": {
    title: "按梯度更新一个参数",
    task: "定义 update(parameter, gradient, learning_rate)，返回 parameter - learning_rate * gradient。",
    hint: "这个函数只负责一步更新，不要在里面写循环。",
    starter: "def update(parameter, gradient, learning_rate):\n    # 返回更新后的参数\n    pass\n",
    test: "assert abs(update(2.0, 4.0, 0.1) - 1.6) < 1e-9\nassert abs(update(-1.0, -2.0, 0.5) - 0.0) < 1e-9",
    answer: "def update(parameter, gradient, learning_rate):\n    return parameter - learning_rate * gradient\n\nprint(update(2.0, 4.0, 0.1))"
  },
  "lesson-12": {
    title: "写出两层网络的 forward",
    task: "实现 relu、softmax、forward。forward 返回 probabilities 和包含 x、z1、a1 的 cache。",
    hint: "顺序：z1=x@w1+b1，a1=relu(z1)，z2=a1@w2+b2，最后 softmax。",
    starter: "import numpy as np\n\ndef relu(x):\n    pass\n\ndef softmax(x):\n    pass\n\ndef forward(x, w1, b1, w2, b2):\n    pass\n",
    test: "rng = np.random.default_rng(1)\nx = rng.normal(size=(4, 3))\nw1 = rng.normal(size=(3, 5))\nb1 = np.zeros((1, 5))\nw2 = rng.normal(size=(5, 2))\nb2 = np.zeros((1, 2))\nprobabilities, cache = forward(x, w1, b1, w2, b2)\nassert probabilities.shape == (4, 2)\nassert np.allclose(probabilities.sum(axis=1), 1.0)\nassert len(cache) >= 3",
    answer: "import numpy as np\n\ndef relu(x):\n    return np.maximum(0, x)\n\ndef softmax(x):\n    shifted = x - np.max(x, axis=1, keepdims=True)\n    exp_x = np.exp(shifted)\n    return exp_x / np.sum(exp_x, axis=1, keepdims=True)\n\ndef forward(x, w1, b1, w2, b2):\n    z1 = x @ w1 + b1\n    a1 = relu(z1)\n    z2 = a1 @ w2 + b2\n    probabilities = softmax(z2)\n    return probabilities, (x, z1, a1)"
  },
  "lesson-13": {
    title: "实现损失与参数更新",
    task: "实现 cross_entropy_loss(probabilities,y) 和 step(parameter,gradient,learning_rate)。",
    hint: "用 np.arange 选出每个样本正确类别的概率；loss 取负对数平均值。",
    starter: "import numpy as np\n\ndef cross_entropy_loss(probabilities, y):\n    pass\n\ndef step(parameter, gradient, learning_rate):\n    pass\n",
    test: "p = np.array([[0.8, 0.2], [0.1, 0.9]])\ny = np.array([0, 1])\nloss = cross_entropy_loss(p, y)\nassert 0 < loss < 0.3\nassert np.allclose(step(np.array([1.0]), np.array([0.5]), 0.1), np.array([0.95]))",
    answer: "import numpy as np\n\ndef cross_entropy_loss(probabilities, y):\n    correct = probabilities[np.arange(len(y)), y]\n    return -np.mean(np.log(correct + 1e-12))\n\ndef step(parameter, gradient, learning_rate):\n    return parameter - learning_rate * gradient"
  },
  "lesson-14": {
    title: "实现模型准确率",
    task: "定义 accuracy(probabilities,y)：用 argmax 得到预测类别，返回预测正确的平均比例。",
    hint: "np.argmax(probabilities, axis=1) 得到每一行最大值的位置。",
    starter: "import numpy as np\n\ndef accuracy(probabilities, y):\n    pass\n",
    test: "p = np.array([[0.1, 0.9], [0.8, 0.2], [0.4, 0.6]])\ny = np.array([1, 0, 0])\nassert abs(accuracy(p, y) - 2 / 3) < 1e-9",
    answer: "import numpy as np\n\ndef accuracy(probabilities, y):\n    predictions = np.argmax(probabilities, axis=1)\n    return np.mean(predictions == y)\n\np = np.array([[0.1, 0.9], [0.8, 0.2], [0.4, 0.6]])\ny = np.array([1, 0, 0])\nprint(accuracy(p, y))"
  },
  "c2-00": {
    title: "分清分类与回归",
    task: "创建一个连续数值预测并打印；数值内容可以自己决定。",
    hint: "例如 temperature_prediction = 26.5。",
    starter: "# 创建并打印一个连续数值预测\n",
    test: "values=[v for k,v in globals().items() if not k.startswith('__') and isinstance(v,(int,float)) and not isinstance(v,bool)]\nassert values\nassert __output__.strip()",
    answer: "temperature_prediction = 26.5\nprint(temperature_prediction)"
  },
  "c2-01": {
    title: "整理成对的 x 与 y",
    task: "创建长度相同、至少含 4 个样本的特征数组和标签数组，并打印两者平均值。",
    hint: "使用 NumPy 数组和 np.mean。",
    starter: "import numpy as np\n\n# 创建特征和标签\n",
    test: "arrays=[v for k,v in globals().items() if not k.startswith('__') and isinstance(v,np.ndarray) and v.ndim==1 and len(v)>=4]\nassert len(arrays)>=2\nassert any(len(a)==len(b) for i,a in enumerate(arrays) for b in arrays[i+1:])\nassert len(__output__.split())>=2",
    answer: "import numpy as np\nhours=np.array([1.,2.,3.,4.])\nscores=np.array([52.,61.,73.,82.])\nprint(hours.mean())\nprint(scores.mean())"
  },
  "c2-02": {
    title: "实现直线预测",
    task: "定义一个接收 x、w、b 的预测函数，验证 3、8、45 得到 69。",
    hint: "返回 w*x+b；函数名可以自定。",
    starter: "# 定义预测函数\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nassert any(abs(f(3,8,45)-69)<1e-9 for f in funcs)",
    answer: "def predict(x,w,b):\n    return w*x+b\n\nprint(predict(3,8,45))"
  },
  "c2-03": {
    title: "计算均方误差",
    task: "实现一个均方误差函数，使 [1,2] 与 [2,4] 的 MSE 等于 2.5。",
    hint: "差值平方后取平均。",
    starter: "import numpy as np\n\n# 定义 MSE 函数\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\na=np.array([1.,2.]); b=np.array([2.,4.])\nassert any(abs(float(f(a,b))-2.5)<1e-9 for f in funcs)",
    answer: "import numpy as np\ndef mse(y_true,y_pred):\n    return np.mean((y_pred-y_true)**2)\nprint(mse(np.array([1.,2.]),np.array([2.,4.])))"
  },
  "c2-04": {
    title: "按同一索引划分数据",
    task: "把 0～9 的 x 和对应 y 划成 8 个训练样本、2 个测试样本。变量名可以自定。",
    hint: "先生成同一组索引，再同时索引 x 和 y。",
    starter: "import numpy as np\nx=np.arange(10)\ny=x*2+1\n\n# 划分数据\n",
    test: "arrays=[v for k,v in globals().items() if not k.startswith('__') and isinstance(v,np.ndarray)]\nassert sum(len(v)==8 for v in arrays)>=2\nassert sum(len(v)==2 for v in arrays)>=2",
    answer: "import numpy as np\nx=np.arange(10); y=x*2+1\nidx=np.arange(10)\ntrain_idx=idx[:8]; test_idx=idx[8:]\nx_train,y_train=x[train_idx],y[train_idx]\nx_test,y_test=x[test_idx],y[test_idx]\nprint(x_train,y_train,x_test,y_test)"
  },
  "c2-05": {
    title: "训练一条回归直线",
    task: "用梯度下降拟合 y=2x+1；训练后预测 x=5 应接近 11（误差小于 0.5）。",
    hint: "循环计算 pred、error、dw、db，再更新参数。",
    starter: "import numpy as np\nx=np.array([0.,1.,2.,3.,4.])\ny=2*x+1\nw=0.0\nb=0.0\n\n# 训练 w 和 b\n",
    test: "numbers=[float(v) for k,v in globals().items() if not k.startswith('__') and isinstance(v,(int,float)) and not isinstance(v,bool)]\nassert any(abs(v-11)<0.5 for v in numbers) or any(abs(float(t)-11)<0.5 for t in __output__.split() if t.replace('.','',1).replace('-','',1).isdigit())",
    answer: "import numpy as np\nx=np.array([0.,1.,2.,3.,4.]); y=2*x+1\nw=0.; b=0.\nfor _ in range(1000):\n    pred=w*x+b\n    error=pred-y\n    w-=0.05*np.mean(2*error*x)\n    b-=0.05*np.mean(2*error)\nresult=w*5+b\nprint(result)"
  },
  "c3-00": {
    title: "保留图片二维结构",
    task: "创建一张 4×4 灰度图数组并打印 shape。像素内容自定。",
    hint: "使用 np.array 或 np.arange(...).reshape(4,4)。",
    starter: "import numpy as np\n\n# 创建 4×4 图片\n",
    test: "arrays=[v for k,v in globals().items() if not k.startswith('__') and isinstance(v,np.ndarray)]\nassert any(v.shape==(4,4) for v in arrays)",
    answer: "import numpy as np\nimage=np.arange(16).reshape(4,4)\nprint(image.shape)"
  },
  "c3-01": {
    title: "增加 batch 与 channel",
    task: "把 4×4 灰度图变成 shape 为 (1,1,4,4) 的批量张量。",
    hint: "可以使用 reshape 或连续两次 np.expand_dims。",
    starter: "import numpy as np\nimage=np.arange(16).reshape(4,4)\n\n# 增加两个维度\n",
    test: "arrays=[v for k,v in globals().items() if not k.startswith('__') and isinstance(v,np.ndarray)]\nassert any(v.shape==(1,1,4,4) for v in arrays)",
    answer: "import numpy as np\nimage=np.arange(16).reshape(4,4)\nbatch=image.reshape(1,1,4,4)\nprint(batch.shape)"
  },
  "c3-02": {
    title: "实现二维 valid 卷积",
    task: "定义一个函数，用 2×2 卷积核扫描 4×4 单通道输入，返回 3×3 结果。",
    hint: "双层循环取局部窗口，执行 sum(window*kernel)。",
    starter: "import numpy as np\n\n# 定义 valid_conv2d\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nx=np.arange(16).reshape(4,4); k=np.array([[1,0],[0,-1]])\nassert any(isinstance(f(x,k),np.ndarray) and f(x,k).shape==(3,3) for f in funcs)",
    answer: "import numpy as np\ndef valid_conv2d(x,kernel):\n    kh,kw=kernel.shape\n    out=np.zeros((x.shape[0]-kh+1,x.shape[1]-kw+1))\n    for i in range(out.shape[0]):\n        for j in range(out.shape[1]):\n            out[i,j]=np.sum(x[i:i+kh,j:j+kw]*kernel)\n    return out\nprint(valid_conv2d(np.arange(16).reshape(4,4),np.ones((2,2))))"
  },
  "c3-03": {
    title: "实现 2×2 最大池化",
    task: "定义最大池化函数，把任意 4×4 输入压缩成 2×2。",
    hint: "每次取不重叠的 2×2 窗口并求最大值。",
    starter: "import numpy as np\n\n# 定义 max_pool2x2\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nx=np.arange(16).reshape(4,4)\nexpected=np.array([[5,7],[13,15]])\nassert any(np.array_equal(f(x),expected) for f in funcs)",
    answer: "import numpy as np\ndef max_pool2x2(x):\n    out=np.zeros((x.shape[0]//2,x.shape[1]//2))\n    for i in range(out.shape[0]):\n        for j in range(out.shape[1]):\n            out[i,j]=np.max(x[i*2:i*2+2,j*2:j*2+2])\n    return out\nprint(max_pool2x2(np.arange(16).reshape(4,4)))"
  },
  "c3-04": {
    title: "追踪 CNN 的 shape",
    task: "从 (32,1,28,28) 出发，创建变量记录池化后的 (32,8,13,13) 和最终 (32,10)。",
    hint: "这里练习 shape 推理，可以直接用元组表达。",
    starter: "input_shape=(32,1,28,28)\n\n# 写出中间和输出 shape\n",
    test: "tuples=[v for k,v in globals().items() if not k.startswith('__') and isinstance(v,tuple)]\nassert (32,8,13,13) in tuples\nassert (32,10) in tuples",
    answer: "input_shape=(32,1,28,28)\nconv_shape=(32,8,26,26)\npool_shape=(32,8,13,13)\noutput_shape=(32,10)\nprint(pool_shape,output_shape)"
  },
  "c3-05": {
    title: "比较模型预测准确率",
    task: "实现准确率函数，对给定概率和标签返回 0.75。",
    hint: "按行 argmax，再与标签比较并取平均。",
    starter: "import numpy as np\n\n# 定义 accuracy\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\np=np.array([[.9,.1],[.2,.8],[.7,.3],[.6,.4]]); y=np.array([0,1,0,1])\nassert any(abs(float(f(p,y))-.75)<1e-9 for f in funcs)",
    answer: "import numpy as np\ndef accuracy(p,y):\n    return np.mean(np.argmax(p,axis=1)==y)\nprint(accuracy(np.array([[.9,.1],[.2,.8],[.7,.3],[.6,.4]]),np.array([0,1,0,1])))"
  },
  "c4-00": {
    title: "建立文本与标签",
    task: "创建至少 4 条文本和同样数量的 0/1 标签，并打印一组样本。",
    hint: "文本和标签可用两个列表保存。",
    starter: "# 创建文本和标签\n",
    test: "lists=[v for k,v in globals().items() if not k.startswith('__') and isinstance(v,list) and len(v)>=4]\nassert any(all(isinstance(x,str) for x in v) for v in lists)\nassert any(all(x in (0,1) for x in v) for v in lists)\nassert __output__.strip()",
    answer: "texts=['很好看','太失望','值得推荐','不喜欢']\nlabels=[1,0,1,0]\nprint(texts[0],labels[0])"
  },
  "c4-01": {
    title: "清洗并拆分文本",
    task: "定义文本清洗函数，使 '  AI, Is GREAT!  ' 变成小写且不含首尾空格、逗号和感叹号。",
    hint: "使用 lower、strip 和 replace。",
    starter: "# 定义 normalize\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nassert any(f('  AI, Is GREAT!  ')=='ai is great' for f in funcs)",
    answer: "def normalize(text):\n    return text.lower().strip().replace(',','').replace('!','')\nprint(normalize('  AI, Is GREAT!  '))"
  },
  "c4-02": {
    title: "实现词袋向量",
    task: "定义向量化函数；词表 ['好','差','电影']，tokens ['好','电影','好'] 应得到 [2,0,1]。",
    hint: "为词表中每个词统计 tokens.count(word)。",
    starter: "import numpy as np\n\n# 定义 vectorize\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nexpected=np.array([2,0,1])\nassert any(np.array_equal(np.asarray(f(['好','电影','好'],['好','差','电影'])),expected) for f in funcs)",
    answer: "import numpy as np\ndef vectorize(tokens,vocab):\n    return np.array([tokens.count(word) for word in vocab])\nprint(vectorize(['好','电影','好'],['好','差','电影']))"
  },
  "c4-03": {
    title: "把分数变成概率",
    task: "实现 Sigmoid；输入 0 应为 0.5，输入越大概率越大。",
    hint: "公式是 1/(1+exp(-x))。",
    starter: "import numpy as np\n\n# 定义 sigmoid\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nassert any(abs(float(f(0))-.5)<1e-9 and f(2)>f(-2) for f in funcs)",
    answer: "import numpy as np\ndef sigmoid(x):\n    return 1/(1+np.exp(-x))\nprint(sigmoid(0),sigmoid(2))"
  },
  "c4-04": {
    title: "统计四种分类结果",
    task: "定义 confusion 函数，返回 TP、TN、FP、FN 四个计数。",
    hint: "逐对比较预测和真实标签。",
    starter: "# 定义 confusion(y_true,y_pred)\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nvalid=False\nfor f in funcs:\n    try:\n        r=f([1,1,0,0],[1,0,1,0]); vals=list(r.values()) if isinstance(r,dict) else list(r); valid=valid or sorted(vals)==[1,1,1,1]\n    except Exception: pass\nassert valid",
    answer: "def confusion(y_true,y_pred):\n    tp=sum(a==1 and b==1 for a,b in zip(y_true,y_pred))\n    tn=sum(a==0 and b==0 for a,b in zip(y_true,y_pred))\n    fp=sum(a==0 and b==1 for a,b in zip(y_true,y_pred))\n    fn=sum(a==1 and b==0 for a,b in zip(y_true,y_pred))\n    return {'TP':tp,'TN':tn,'FP':fp,'FN':fn}\nprint(confusion([1,1,0,0],[1,0,1,0]))"
  },
  "c4-05": {
    title: "完成单句情感预测",
    task: "定义 predict_text(text)，让含“好”返回正面，含“差”返回负面，并附带 0～1 置信度。",
    hint: "可返回 (label, confidence) 或字典。",
    starter: "# 定义 predict_text\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\ndef label(r):\n    return r.get('label') if isinstance(r,dict) else r[0]\nassert any(label(f('这部电影很好'))=='正面' and label(f('体验很差'))=='负面' for f in funcs)",
    answer: "def predict_text(text):\n    score=text.count('好')-text.count('差')\n    label='正面' if score>=0 else '负面'\n    confidence=min(1.0,0.5+0.2*abs(score))\n    return {'label':label,'confidence':confidence}\nprint(predict_text('这部电影很好'))"
  },
  "c5-00": {
    title: "写出纯推理函数",
    task: "定义 predict(x,w,b)，只返回 w*x+b，不修改任何输入。",
    hint: "推理函数只做前向计算。",
    starter: "# 定义 predict\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nassert any(f(3,2,1)==7 for f in funcs)",
    answer: "def predict(x,w,b):\n    return w*x+b\nprint(predict(3,2,1))"
  },
  "c5-01": {
    title: "模型往返保存",
    task: "把 w=2、b=1 保存到 model.npz，再加载并打印；网页实验室内文件只在本次运行有效。",
    hint: "使用 np.savez 和 np.load。",
    starter: "import numpy as np\n\n# 保存并重新加载\n",
    test: "assert 'loaded' in globals() or any(k for k in globals() if not k.startswith('__') and hasattr(globals()[k],'files'))\nassert '2' in __output__ and '1' in __output__",
    answer: "import numpy as np\nnp.savez('model.npz',w=2.0,b=1.0)\nloaded=np.load('model.npz')\nprint(loaded['w'],loaded['b'])"
  },
  "c5-02": {
    title: "返回结构化预测结果",
    task: "定义推理管线：接收数值，返回含 label、confidence、model_version 的字典。",
    hint: "confidence 必须在 0～1 之间。",
    starter: "# 定义 predict_pipeline\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nvalid=False\nfor f in funcs:\n    try:\n        r=f(2); valid=valid or isinstance(r,dict) and {'label','confidence','model_version'}<=set(r) and 0<=r['confidence']<=1\n    except Exception: pass\nassert valid",
    answer: "def predict_pipeline(x):\n    if not isinstance(x,(int,float)):\n        raise ValueError('input 必须是数值')\n    return {'label':'高' if x>0 else '低','confidence':0.8,'model_version':'1.0'}\nprint(predict_pipeline(2))"
  },
  "c5-03": {
    title: "实现预测请求处理器",
    task: "定义 handle_predict(payload)：缺少 input 返回错误和 400，成功返回结果和 200。",
    hint: "可以返回 (字典, 状态码)。",
    starter: "# 定义 handle_predict\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nvalid=False\nfor f in funcs:\n    try:\n        bad=f({}); good=f({'input':3}); valid=valid or bad[1]==400 and good[1]==200\n    except Exception: pass\nassert valid",
    answer: "def handle_predict(payload):\n    if 'input' not in payload:\n        return {'error':'缺少 input'},400\n    return {'label':'高' if payload['input']>0 else '低','confidence':0.8},200\nprint(handle_predict({'input':3}))"
  },
  "c5-04": {
    title: "描述网页状态机",
    task: "创建包含 idle、loading、success、error 四种状态及对应提示文字的字典。",
    hint: "每个键对应一条非空中文提示。",
    starter: "# 创建 states 字典\n",
    test: "dicts=[v for k,v in globals().items() if not k.startswith('__') and isinstance(v,dict)]\nrequired={'idle','loading','success','error'}\nassert any(required<=set(v) and all(isinstance(v[k],str) and v[k] for k in required) for v in dicts)",
    answer: "states={'idle':'请输入内容','loading':'正在预测','success':'预测完成','error':'预测失败，请重试'}\nprint(states)"
  },
  "c5-05": {
    title: "完成可部署的预测接口",
    task: "定义 app_predict(payload)，校验数值 input，并始终返回含 ok、data 或 error、version 的字典。",
    hint: "分别测试有效输入、缺失 input 和错误类型。",
    starter: "# 定义 app_predict\n",
    test: "funcs=[v for k,v in globals().items() if not k.startswith('__') and callable(v)]\nvalid=False\nfor f in funcs:\n    try:\n        a=f({'input':2}); b=f({}); c=f({'input':'x'}); valid=valid or a.get('ok') is True and b.get('ok') is False and c.get('ok') is False and all('version' in r for r in (a,b,c))\n    except Exception: pass\nassert valid",
    answer: "def app_predict(payload):\n    version='1.0'\n    if 'input' not in payload:\n        return {'ok':False,'error':'缺少 input','version':version}\n    if not isinstance(payload['input'],(int,float)):\n        return {'ok':False,'error':'input 必须是数值','version':version}\n    label='高' if payload['input']>0 else '低'\n    return {'ok':True,'data':{'label':label,'confidence':0.8},'version':version}\nprint(app_predict({'input':2}))"
  }
};
