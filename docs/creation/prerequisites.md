# 准备工作

在开始创建自定义模型之前，你需要准备以下工具和资源。

## 必需工具

### .NET 运行环境

Unity 和相关工具需要 .NET 运行环境支持。

![image-20251120164645845](/images/image-20251120164645845.png)

- **推荐版本**：.NET 6.0 或更高版本
- **下载地址**：[.NET 10.0 Runtime](https://dotnet.microsoft.com/zh-cn/download)

::: tip 安装建议

- 安装完成后重启计算机以确保环境变量生效
  :::

**安装步骤：**

1. 访问 .NET 官方下载页面
2. 点击 **下载 .NET SDK** 
3. 运行下载的安装程序
4. 按照安装向导完成安装
5. 重启计算机



### Git

你需要安装Git来导入SDK和进行项目的版本控制。

![image-20251122194812359](/images/image-20251122194812359.png)

下载地址：[Git - Install for Windows](https://git-scm.com/install/windows)

x86 Windows用户选择**[Git for Windows/x64 Setup](https://github.com/git-for-windows/git/releases/download/v2.52.0.windows.1/Git-2.52.0-64-bit.exe)**安装即可

**安装步骤：**

1. 下载Git安装包

2. 点击**Install**

   ![image-20251122214552444](/images/image-20251122214552444.png)

3. 一直点击确认直到安装完成

### Unity 编辑器

你需要安装 Unity 编辑器来创建和导出 AssetBundle。

![image-20251122194047379](/images/image-20251122194047379.png)

- **推荐版本**：与游戏使用的 Unity 版本一致（2022.3.62f2）
- **下载地址**：[NoUnityCN](https://www.nounitycn.top/download?v=unityhub://2022.3.62f2/7670c08855a9)，推荐下载安装包单独安装

::: tip 版本兼容性
使用与游戏相同的 Unity 版本可以避免潜在的兼容性问题。如果不想使用游戏使用的版本，可以使用大版本相同的版本(2022.3.xx)。
:::

### Unity Hub

你需要安装Unity Hub来启动Unity编辑器。

![image-20251122194405607](/images/image-20251122194405607.png)

- **推荐版本**：下载最新的就行
- **下载地址**：
  - [Windows版本](https://github.com/NoUnityCN/service/releases/download/unityhub/UnityHubSetup.exe)
  - [Mac OS版本](https://github.com/NoUnityCN/service/releases/download/unityhub/UnityHubSetup.dmg)

### 3D 建模软件

如果你需要创建或修改 3D 模型，可以使用以下软件之一：

- **Blender**（免费开源）- [下载地址](https://www.blender.org/)
- **Blockbench**（MC模型）
- 其他支持导出 FBX/OBJ 格式的 3D 软件

### 文本编辑器

用于编辑 JSON 配置文件，同时检查格式是否正确：

![image-20251122194535762](/images/image-20251122194535762.png)

- **Visual Studio Code**（推荐）- [下载地址](https://code.visualstudio.com/)
- **Notepad++**
- 任何支持 JSON 语法高亮的编辑器

## 必需知识

### Unity 基础知识

- **GameObject 和 Transform**：了解 Unity 的基本对象层级结构
- **Prefab**(预制件)：知道如何创建和编辑 Prefab
- **Animator**：了解 Animator Controller 的基本使用
- **AssetBundle**：知道如何构建和导出 AssetBundle

::: info 学习资源
如果你不熟悉 Unity，建议先学习 [Unity 官方教程](https://docs.unity.org.cn/)
:::

### 动画系统基础

- **Animator Controller**：状态机、参数、过渡
- **Animation Clip**：动画片段的创建和编辑
- **Avatar 和 Rig**：人形角色动画系统

### JSON 格式

- 了解 JSON 的基本语法
- 能够编辑和验证 JSON 文件

## 资源准备

### 3D 模型

你需要准备以下模型资源：

1. **角色模型**
   - 格式：FBX、OBJ 或其他 Unity 支持的格式
   - 建议使用人形模型（Humanoid Rig）
   - 模型应包含必要的骨骼结构

2. **动画文件**（可选）
   - 如果需要自定义动画，准备动画文件
   - 可以使用 [Mixamo](https://www.mixamo.com/) 等网站获取免费动画

3. **贴图材质**
   - Albedo（颜色贴图）
   - Normal Map（法线贴图，可选）
   - 其他 PBR 贴图（可选）

### 音频文件（可选）

如果需要为模型添加自定义音效：

- **格式**：WAV、OGG 或其他 Unity 支持的音频格式
- **类型**：
  - 普通音效（normal）
  - 死亡音效（death）
  - 待机音效（idle）

### 缩略图（可选）

- **格式**：PNG、JPG
- **尺寸**：建议 256x256 或更高
- **用途**：在模型选择界面中显示，上传MOD

## 目录结构规划

在开始之前，建议规划好你的模型包目录结构：

``` bash [文件夹]
ModelPack/ 
├── bundleinfo.json # 模型包配置文件 
├── modelbundle # Unity AssetBundle 文件 
├── thumbnail.png # 缩略图 
└── sounds/ # 音效文件夹（可选） 
	├── normal1.wav 
	├── surprise.wav 
	├── death.wav 
	└── idle1.wav
```



## 检查清单

在开始创建模型之前，确认你已经：

- 安装了 Unity 编辑器
- 准备了 3D 模型文件
- 了解 Unity 的基本操作
- 了解 Animator Controller 的使用
- 准备了必要的资源文件（模型、贴图、音频等）
- 规划了模型包的目录结构
- 有足够的耐心和时间

## 下一步

完成准备工作后，你可以：

1. [创建模型](./create-model.md) - 设置 Unity 项目并导入模型
2. [配置定位锚点](./locators.md) - 添加装备定位锚点
3. [配置动画器](./add-animator.md) - 设置 Animator Controller
4. [构建 AssetBundle](./create-bundle.md) - 导出模型包
4. [打包模型包](./bundle-structure) - 打包模型包
4. [创建模组](./create-mod) - 创建模组

::: tip 建议
如果是第一次创建模型，建议先从简单的角色模型开始，熟悉整个流程后再尝试更复杂的功能。
:::
