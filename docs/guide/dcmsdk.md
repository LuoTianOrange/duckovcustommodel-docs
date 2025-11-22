# DCM SDK 介绍

DCM SDK（Duckov Custom Model SDK）是为 Unity 编辑器设计的开发工具包，旨在简化模型打包和模组编译流程。

## SDK 功能概览

DCM SDK 提供以下核心功能：

<ToolGrid>
  <ToolCard
    title="游戏路径设置"
    description="自动或手动设置游戏安装路径，支持 Windows 平台自动检测游戏目录。"
    icon="settings"
  />

  <ToolCard
    title="AssetBundle 打包"
    description="可视化的 Bundle 打包工具，支持拖拽预制件快速打包，自动生成 .unity3d 格式文件。"
    icon="package"
  />

  <ToolCard
    title="Mod DLL 生成"
    description="图形化的 Mod 编译工具，填写基本信息即可自动生成模组 DLL 和配置文件。"
    icon="code"
  />

  <ToolCard
    title="动画器状态机行为组件"
    description="提供预制的状态机行为脚本，用于控制模型动画的播放、过渡和参数同步。"
    icon="box"
  />
</ToolGrid>

## 安装DCM SDK

推荐使用Git URL 安装，因为这样可以使用包管理器直接更新最新版本。如果通过本地路径安装，则需要手动更新。

### 通过 Git URL 安装（推荐）

1. 点击导航栏上面的**Windows（窗口）**按钮
2. 打开**Package Manage（包管理器）**
3. 点击包管理器左上角的"**+**"按钮

![image-20251121222645563](/images/image-20251121222645563.png)

点击“**添加来自 git URL 的包**”按钮

![image-20251121223154548](/images/image-20251121223154548.png)

将**DCM SDK**的 git仓库链接复制到输入框内，并点击添加按钮：


```bash [git]
https://github.com/Duckov-Custom-Model/DuckovCustomModel-SDK.git
```

![image-20251121230009032](/images/image-20251121230009032.png)

等待Unity安装**DCM SDK**包，网络不好可能无法成功安装，可以尝试使用代理服务

![image-20251122014620367](/images/image-20251122014620367.png)

当菜单出现**Duckov Custom Model**选项，并且包管理器可以看到**DCM SDK**的描述后，说明已经成功安装SDK了

![image-20251122020028222](/images/image-20251122020028222.png)



### 通过本地路径安装

复制下方的链接到浏览器下载**DCM SDK**的压缩包

```bash [SDK压缩包]
https://github.com/Duckov-Custom-Model/DuckovCustomModel-SDK/archive/refs/heads/main.zip
```

将压缩包解压后，把解压的文件夹复制到Unity项目的`Packages` 目录下，Unity 会自动识别并加载 **DCM SDK**

![image-20251122021208660](/images/image-20251122021208660.png)



## 设置游戏路径

首次使用需要设置游戏安装路径。点击 **Duckov Custom Model → 游戏路径设置**。

![游戏路径设置](/images/image-20251122023607270.png)

### 自动查找（Windows 用户推荐）

1. 点击 **自动查找** 按钮
2. SDK 会自动扫描游戏安装位置
3. 找到游戏后会显示成功提示

![自动查找成功](/images/image-20251122023921455.png)

### 手动指定路径

1. 点击 **浏览** 按钮
2. 导航到 逃离鸭科夫 的根目录
3. 选择包含 `Duckov.exe` 的文件夹
4. 点击 **选择文件夹**

![手动选择路径](/images/image-20251122024359862.png)

::: tip 提示
游戏路径只需设置一次，SDK 会自动保存配置。
:::



## 使用SDK打包模型

使用 SDK 可以更便捷地打包模型 AssetBundle。



### 导出模型 Bundle

1. 点击导航栏内的**Duckov Custom Model**菜单，并点击**AssetBundle 打包工具**按钮，会打开**AssetBundle 打包工具**

   ![AssetBundle 打包工具](/images/image-20251122032356015.png)

2. 在打包工具窗口中配置：
   - **Bundle 名称**：自定义 Bundle 文件名（如 `jiuhu`）
   - **构建目标平台**：选择对应平台（通常选择 `Windows`）
   - **模型预制件**：将准备好的 Prefab 拖入 **无(游戏对象)** 区域

   ![拖拽预制件](/images/Unity_RXUNEBZl42.gif)

3. 点击 **导出模型Bundle** 按钮

4. 在保存对话框中选择模型包文件夹，点击 **保存**

   ![保存 Bundle](/images/image-20251122034733946.png)

5. 打包成功后会显示提示窗口

   ![打包成功](/images/image-20251122035058816.png)

::: warning 重要提示
DCM SDK 打包的 AssetBundle 文件带有 `.unity3d` 后缀。在编写 `bundleinfo.json` 时，`BundlePath` 字段必须包含此后缀：

```json
{
  "BundlePath": "modelbundle.unity3d"
}
```

:::

## 使用SDK编译模组

SDK 提供图形化工具来生成模组 DLL，无需手动编写代码。



### 生成 Mod DLL

1. 点击导航栏内的**Duckov Custom Model**菜单，并点击**生成 Mod DLL**按钮，会打开**Mod DLL 生成工具**

   ![Mod DLL 生成工具](/images/image-20251122024804347.png)

2. 填写模组信息：

   | 字段                     | 说明                                     | 示例                       |
   | ------------------------ | ---------------------------------------- | -------------------------- |
   | **DLL名称 (Namespace)**  | 模组的命名空间和唯一标识符，建议使用英文 | `jiuhu`                    |
   | **Mod 显示名称**         | 游戏中显示的模组名称，支持中文           | `酒狐`                     |
   | **Mod 描述**             | 模组功能的简短描述                       | `把玩家模型替换为酒狐模型` |
   | **预览图（可选）**       | 模组在游戏中的缩略图，支持 PNG/JPG       | `preview.png`              |
   | **自动复制到游戏文件夹** | 勾选后自动复制到游戏 Mods 目录           | ✅ 推荐勾选                 |

3. 点击 **生成 Mod DLL** 按钮

4. 在文件夹选择对话框中选择输出目录

   ![image-20251122030725840](/images/image-20251122030725840.png)

5. 生成成功后会显示确认窗口

   ![image-20251122030806763](/images/image-20251122030806763.png)

::: tip 自动部署 

如果勾选了 **自动复制到游戏文件夹**，生成的模组会自动复制到游戏的 `Mods` 文件夹。

:::

### 生成的文件

SDK 会在指定目录生成以下文件：

```bash [文件夹]
MyMod/
├── mod.dll           # 编译好的模组 DLL
├── info.ini          # 模组信息配置文件
└── preview.png       # 预览图（如果提供）
```



## 动画器状态机行为组件

模组提供了四个状态机行为组件，可以在动画状态进入时触发音效、对话或控制参数：

![image-20251123041851503](/images/image-20251123041851503.png)

### ModelParameterDriver

在动画状态进入时自动控制 Animator 参数，类似于 Unity 内置的 Animator Parameter Driver。

![image-20251123042141690](/images/image-20251123042141690.png)

- `parameters`：参数操作数组，可配置多个参数操作
  - `type`：操作类型
    - `Set`：直接设置参数值
    - `Add`：在现有值基础上增加指定值
    - `Random`：随机设置参数值（支持范围随机和概率触发）
    - `Copy`：从源参数复制值到目标参数（支持范围转换）
  - `name`：目标参数名称（将被写入的参数）
  - `source`：源参数名称（用于 Copy 操作，将被读取的参数）
  - `value`：操作使用的值（用于 Set 和 Add 操作）
  - `valueMin` / `valueMax`：随机值的最小值和最大值（用于 Random 操作）
  - `chance`：触发概率（0.0 - 1.0），用于控制操作是否执行
  - `convertRange`：是否进行范围转换（用于 Copy 操作）
  - `sourceMin` / `sourceMax`：源参数的范围（用于 Copy 操作的范围转换）
  - `destMin` / `destMax`：目标参数的范围（用于 Copy 操作的范围转换）
- `debugString`：调试信息（可选），会在日志中输出，便于调试
- 支持所有 Animator 参数类型（Float、Int、Bool、Trigger）
- 在动画状态进入时自动应用参数驱动
- 支持参数验证，确保目标参数和源参数存在后才应用驱动

### ModelSoundTrigger

在动画状态进入时触发音效播放。

![image-20251123042613911](/images/image-20251123042613911.png)

- `soundTags`：音效标签数组，可配置多个标签
- `playOrder`：标签选择方式（Random：随机选择，Sequential：顺序选择）
- `playMode`：音效播放模式（Normal、StopPrevious、SkipIfPlaying、UseTempObject）
- `eventName`：事件名称，用于音效播放管理（可选，为空时使用默认名称）

### ModelSoundStopTrigger

在动画状态进入或退出时停止音效播放。

![image-20251123042717926](/images/image-20251123042717926.png)

- `stopAllSounds`：是否停止所有正在播放的音效（true：停止所有正在播放的音效，false：停止指定事件名称的音效）
- `useBuiltInEventName`：是否使用内置事件名称（true：直接使用内置事件名称如 `idle`，false：使用自定义触发器事件名称）
- `eventName`：事件名称
  - 当 `stopAllSounds` 为 false 且 `useBuiltInEventName` 为 false 时：自定义触发器事件名称（可选，为空时使用默认名称 `CustomModelSoundTrigger`）
  - 当 `stopAllSounds` 为 false 且 `useBuiltInEventName` 为 true 时：内置事件名称（必需，如 `idle`）
- `stopOnEnter`：是否在状态进入时停止（true：进入时停止，false：退出时停止）

**注意事项**：
- 当 `useBuiltInEventName` 为 true 时，必须指定 `eventName`，否则会显示警告
- 自定义触发器的事件名称格式为 `CustomModelSoundTrigger:{eventName}`，与 `ModelSoundTrigger` 保持一致
- 内置事件名称（如 `idle`）直接使用，不添加前缀

### ModelDialogueTrigger

在动画状态进入时触发对话播放。

![image-20251123042904922](/images/image-20251123042904922.png)

- `fileName`：对话定义文件名（不含扩展名）
- `dialogueId`：对话 ID，对应对话配置文件中的对话 ID
- `defaultLanguage`：默认语言，当前的语言文件不存在时使用



## SDK 工具菜单

在 Unity 编辑器顶部菜单栏的 **Duckov Custom Model** 下可以找到以下工具：

| 工具                     | 功能                         |
| ------------------------ | ---------------------------- |
| **游戏路径设置**         | 配置 逃离鸭科夫 游戏安装路径 |
| **AssetBundle 打包工具** | 打包模型 Bundle              |
| **生成 Mod DLL**         | 编译模组 DLL                 |
