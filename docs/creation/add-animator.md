# 添加动画器

在将模型导入 Unity 后，需要为模型添加和配置 Animator 组件，使其能够响应游戏状态并播放相应的动画。

## 前置要求

在开始之前，确保你已经：

1. 完成了 [创建模型](./create-model.md) 的步骤
2. 模型已经正确导入到 Unity 项目中
3. 模型的 Rig 类型设置为 Humanoid（人形）或 Generic（泛型）

## 添加 Animator 组件

### 1. 选择模型 Prefab

在 Unity Project 窗口中，找到并选择你的模型 Prefab。

### 2. 添加 Animator

1. 在 Inspector 窗口中，点击 **Add Component** 按钮
2. 搜索并选择 **Animator** 组件
3. Animator 组件将被添加到模型上

::: tip
如果模型在导入时已经包含 Animator 组件，可以跳过此步骤。
:::

## 创建 Animator Controller

### 1. 创建 Controller 资源

1. 在 Project 窗口中右键点击，选择 **Create > Animator Controller**
2. 将其命名为有意义的名称，如 `MyCharacterController`
3. 将创建的 Animator Controller 拖拽到模型的 Animator 组件的 **Controller** 字段中

### 2. 打开 Animator 窗口

1. 双击创建的 Animator Controller
2. Animator 窗口将打开，显示状态机编辑器

## 配置基础状态机

### 创建基础状态

一个基本的角色动画器至少需要以下状态：

#### Idle（待机）

1. 在 Animator 窗口中右键点击，选择 **Create State（创建状态） > Empty（空）**
2. 将状态命名为 `Idle`
3. 在 Inspector 中为该状态分配待机动画片段

#### Walk（走路）

1. 创建新状态，命名为 `Walk`
2. 分配走路动画片段

#### Run（跑步）

1. 创建新状态，命名为 `Run`
2. 分配跑步动画片段

#### Dash（翻滚）

1. 创建新状态，命名为 `Dash`
2. 分配跑步动画片段

### 示例状态机结构

![image-20251114191831714](/images/image-20251114191831714.png)

## 添加参数

根据游戏需要，添加以下参数到 Animator Controller。

### 1. 打开 Parameters 面板

在 Animator 窗口左侧，找到 **Parameters** 面板。

![image-20251114191649296](/images/image-20251114191649296.png)

### 2. 添加基础参数

点击 **+** 按钮，添加以下参数：

#### Bool 类型参数

- Grounded (bool) - 是否在地面上 
- Moving (bool) - 是否正在移动 
- Running (bool) - 是否正在奔跑 

#### Float 类型参数

- MoveSpeed (float) - 移动速度（0-2） 
- MoveDirX (float) - 移动方向 X 
- MoveDirY (float) - 移动方向 Y

::: info 参数详解
完整的参数列表和说明，请参考 [动画器参数文档](../animator/overview.md)。你不需要添加所有参数，只需根据你的动画需求添加相应的参数。
:::

## 配置状态转换

### 添加转换条件

以 Idle 到 Walk 的转换为例：

1. 右键点击 **Idle** 状态，选择 **Make Transition**（创建过渡）
2. 点击 **Walk** 状态，创建转换箭头
3. 选择转换箭头，在 Inspector（检查器） 中配置：
   - 取消勾选 **Has Exit Time**（有退出时间）（如果需要立即切换动画）
   - 点击 **Conditions** 下的 **+** 按钮
   - 添加条件：`Moving` **true**

### 常用转换配置

| 从   | 到   | 条件                           |
| ---- | ---- | ------------------------------ |
| Idle | Walk | Moving = true, Running = false |
| Walk | Idle | Moving = false                 |
| Walk | Run  | Running = true                 |
| Run  | Walk | Running = false                |

::: warning 注意
- 确保转换条件不会产生冲突
- 合理设置 Transition Duration（转换时间）以获得平滑的动画过渡
- 对于快速响应的动作（如死亡），建议禁用 Exit Time
:::

## 使用 Blend Tree（进阶）

对于需要平滑过渡的动画（如不同速度的移动），可以使用 Blend Tree。

### 创建 Blend Tree

1. 在 Animator 窗口中右键，选择 **Create State > From New Blend Tree**
2. 双击 Blend Tree 状态进入编辑模式
3. 设置 Blend Type（如 1D、2D Simple Directional）
4. 添加动画片段到 Blend Tree

### 配置 1D Blend Tree 示例（移动速度）

1. 设置 Parameter 为 `MoveSpeed`
2. 添加动画片段：
   - Idle (Threshold: 0)
   - Walk (Threshold: 1)
   - Run (Threshold: 2)

### 配置 2D Blend Tree 示例（移动方向）

1. 设置 Parameters 为 `MoveDirX` 和 `MoveDirY`
2. 添加动画片段：
   - Idle (0, 0)
   - Walk Forward (0, 1)
   - Walk Backward (0, -1)
   - Walk Left (-1, 0)
   - Walk Right (1, 0)
   - Walk Forward Left (-0.7, 0.7)
   - Walk Forward Right (0.7, 0.7)
   - Walk Backward Left (-0.7, -0.7)
   - Walk Backward Right (0.7, -0.7)

## 添加动画层（可选）

对于需要独立控制的动画（如上半身动作），可以添加额外的动画层。

### 添加 MeleeAttack 层

模组支持自动管理近战攻击层。如果你想添加近战攻击动画：

1. 在 Animator 窗口中，点击 **Layers** 面板的 **+** 按钮
2. 将新层命名为 `MeleeAttack`
3. 设置 Weight 为 1.0
4. 设置 Blending 为 **Override** 或 **Additive**（根据需要）
5. 在该层中创建攻击动画状态

::: info
模组会自动检测名为 `MeleeAttack` 的层，并在攻击时自动调整其权重。更多信息请参考 [动画层文档](../animator/layers.md)。
:::

## 配置 Avatar Mask（可选）

如果使用多个动画层，可能需要配置 Avatar Mask 来控制哪些骨骼受该层影响。

### 创建 Avatar Mask

1. 在 Project 窗口右键，选择 **Create > Avatar Mask**
2. 命名为描述性的名称，如 `UpperBodyMask`
3. 在 Inspector 中选择要包含的骨骼部分

### 应用 Mask 到层

1. 选择 Animator Controller 中的层
2. 在 Inspector 中，将创建的 Avatar Mask 拖拽到 **Mask** 字段

## 测试动画

### 在 Unity 中测试

1. 将模型 Prefab 拖拽到场景中
2. 选择场景中的模型
3. 在 Animator 窗口中，点击播放按钮
4. 在 Parameters 面板中手动调整参数值，观察动画变化

### 常见问题排查

| 问题       | 可能原因           | 解决方法                                            |
| ---------- | ------------------ | --------------------------------------------------- |
| 动画不播放 | 未分配动画片段     | 检查每个状态是否都分配了 Motion                     |
| 转换不正常 | 转换条件错误       | 检查 Conditions 设置                                |
| 动画卡顿   | Exit Time 设置不当 | 调整 Transition Duration 和 Exit Time（有退出时间） |
| 动画不连贯 | 动画片段不循环     | 确保动画片段勾选了 Loop Time（循环时间）            |

## 高级功能

### Sub-State Machine（子动画机）

对于复杂的状态逻辑，可以使用 Sub-State Machine：

1. 右键选择 **Create Sub-State Machine**
2. 双击进入子状态机
3. 在其中创建相关的状态



## 保存和导出

完成 Animator Controller 的配置后：

1. 保存场景和项目（Ctrl + S）
2. 确保 Animator Controller 已正确分配给模型 Prefab
3. 继续进行 [AssetBundle 构建](./bundle-structure.md)

## 参数参考

为了让你的模型能够正确响应游戏状态，建议配置以下参数：

### 必需参数（最小功能集）

- `Running` (Bool)
- `Moving` (Bool)
- `Dashing` (Bool)

### 推荐参数（完整功能）

- [Bool 类型参数](../animator/bool-params.md)
- [Float 类型参数](../animator/float-params.md)
- [Int 类型参数](../animator/int-params.md)
- [Trigger 类型参数](../animator/trigger-params.md)

## 下一步

完成动画器配置后，你可以：

1. [添加定位锚点](./locators.md) - 配置装备绑定点
2. [配置自定义音效](./sounds.md) - 添加音频文件
3. [构建 AssetBundle](./bundle-structure.md) - 导出模型包

## 相关资源

- [动画器概览](../animator/overview.md)
- [Unity Animator 官方文档](https://docs.unity3d.com/Manual/class-AnimatorController.html)
- [Unity Blend Tree 教程](https://docs.unity3d.com/Manual/class-BlendTree.html)