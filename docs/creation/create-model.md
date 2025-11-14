# 创建模型

本文档将指导你如何在 Unity 中导入和配置模型，使其能够与 Duckov Custom Model 模组兼容。

## 创建 Unity 项目

### 1. 启动 Unity Hub

打开 Unity Hub，点击 **New Project**（新项目）。

![image-20251114192750252](/images/image-20251114192750252.png)

### 2. 选择模板

- 选择 **3D** 模板（推荐使用 3D URP 或标准 3D）
- 设置项目名称，如 `DuckovModelPack`
- 选择保存位置
- 点击 **Create Project**

![image-20251114193602668](/images/image-20251114193602668.png)

::: tip 项目设置
建议使用2022.3.62f2版本创建项目以确保最佳兼容性。
:::

## 导入模型文件

### 1. 准备模型资源

将你的模型文件（FBX、OBJ 等）以及相关的贴图文件复制到项目的 `Assets` 文件夹中：

![image-20251114193711153](/images/image-20251114193711153.png)

### 2. 导入模型

1. 在 Unity 中，模型文件会自动被检测并导入
2. 在 Project 窗口中找到导入的模型文件
3. 选择模型文件，在 Inspector 窗口中查看导入设置

### 3. 配置模型导入设置

选择导入的模型文件，在 Inspector 窗口中进行以下配置：

#### Model 选项卡

保持不动即可。

![image-20251114194804994](/images/image-20251114194804994.png)

#### Rig 选项卡

::: warning 重要设置
Rig 类型的选择会影响动画系统的工作方式。
:::

**对于人形角色模型**（推荐）：

1. 将 **Animation Type** 设置为 **Humanoid**
2. 点击 **Avatar Definition** 的 **Configure** 按钮
3. Unity 会自动尝试匹配骨骼，检查映射是否正确
4. 确认后点击 **Apply**，然后点击 **Done**

**对于非人形模型**：

1. 将 **Animation Type** 设置为 **Generic（泛型）**
2. 选择或创建适当的 Avatar

![image-20251114195057956](/images/image-20251114195057956.png)

#### Animation 选项卡

如果模型文件包含动画：

1. 勾选 **Import Animation**
2. 在动画列表中配置每个动画片段：
   - 设置动画名称
   - 配置循环设置（Loop Time）
   - 调整动画起始和结束帧

如果模型文件不包含动画，可以跳过此选项卡的设置。

![image-20251114202715589](/images/image-20251114202715589.png)

#### Materials 选项卡

1. **Location**: 选择 **Use Embedded Materials** 或 **Use External Materials**
2. **Naming**: 选择合适的命名方式
3. 点击 **Extract Materials** 提取材质文件（如果需要修改）

::: info 材质设置
如果需要自定义材质，建议提取材质后再进行修改。
:::

![image-20251114203418375](/images/image-20251114203418375.png)

### 4. 应用设置

配置完成后，点击 Inspector 窗口底部的 **应用** 按钮。

## 创建模型 Prefab

### 1. 创建 Prefab

1. 在 Project 窗口中创建 `Prefabs` 文件夹
2. 将导入的模型从 `Models` 文件夹拖拽到场景中
3. 调整模型的位置、旋转和缩放（通常保持默认值）
4. 将场景中的模型拖拽到 `Prefabs` 文件夹，创建 Prefab

::: tip Prefab 命名
使用清晰的命名方式，如 `MyCharacter_Prefab`，便于后续管理。
:::

### 2. 检查 Prefab 结构

选择创建的 Prefab，在 Inspector 中确认：

- 模型的层级结构正确
- 所有必要的组件都已添加
- 材质已正确应用

## 下一步

完成模型创建和基础配置后，你可以继续：

1. [添加动画器](./add-animator.md) - 详细配置 Animator Controller
2. [配置定位锚点](./locators.md) - 精确调整装备位置
3. [添加自定义音效](./sounds.md) - 为模型添加音频（可选）
4. [配置模型包结构](./bundle-structure.md) - 准备导出 AssetBundle