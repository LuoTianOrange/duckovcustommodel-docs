# 创建模组

本文档介绍如何将自定义模型打包成游戏模组，使其能够通过游戏的模组管理器自动加载。

## 模组工作原理

模组的主要作用是在被加载时，自动将模型包复制到游戏的模型目录：

```
游戏安装路径/ModConfigs/DuckovCustomModel/Models
```

这样玩家只需要在游戏的模组管理器中启用你的模组，模型就会自动安装。

## 模组包结构

一个完整的模组包应包含以下文件：

```
MyModelMod/                      # 模组包根目录
├── Model/                 # 模型包文件夹
│   ├── bundleinfo.json          # 模型包配置文件（必需）
│   ├── modelbundle.assetbundle  # Unity AssetBundle 文件（必需）
│   ├── thumbnail.png            # 模型缩略图（建议）
│   └── sounds/                  # 音频文件夹（可选）
│       └── voice.ogg
├── mod.dll                      # 模组 DLL（必需）
├── info.ini                     # 模组信息配置（必需）
└── preview.png                  # 模组预览图（必需）
```

### 文件说明

| 文件/文件夹 | 必需 | 说明 |
|------------|------|------|
| 模型包文件夹 | 是 | 包含模型资源的文件夹 |
| `bundleinfo.json` | 是 | 模型包配置文件，参考 [模型包结构](./bundle-structure.md) |
| `modelbundle.assetbundle` | 是 | Unity AssetBundle 文件 |
| `thumbnail.png` | 建议 | 模型缩略图，显示在模型选择界面 |
| `sounds/` | 否 | 音频文件文件夹 |
| `mod.dll` | 是 | 模组的主要逻辑代码 |
| `info.ini` | 是 | 模组的信息 |
| `preview.png` | 是 | 模组预览图，显示在游戏的模组管理器中 |

## 开发环境设置

### 必需工具

1. **Rider** 或 **Visual Studio**
   - 用于编写和编译 C# 代码
   - 推荐使用 Rider（JetBrains 出品）

2. **.NET Framework 2.1**
   - 模组建议使用 .NET Framework 2.1 标准

### 创建项目

1. 打开 Rider 或 Visual Studio
2. 创建新项目：
   - 项目类型：**类库（Class Library）**
   - 目标框架：**.NET Framework 2.1** 或 **.NET Standard 2.1**
   - 语言：**C#**
3. 项目命名示例：`MyModelMod`

::: tip
如果 .NET Framework 2.1 不可用，可以尝试 .NET Standard 2.1 或 .NET Framework 4.x。
:::

## 编写模组代码

### 添加引用

首先需要添加必要的 DLL 引用，通过编辑项目的csproj来引入游戏的DLL。

如果使用的是Rider，使用快捷键`Ctrl+T`打开快速搜索，输入`csp`来快速定位csproj文件，打开

![image-20251115043215043](/images/image-20251115043215043.png)

复制以下代码块中的内容到你的csproj文件：

其中DuckovPath需要修改为你的鸭科夫的游戏路径

```xml
<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <TargetFramework>netstandard2.1</TargetFramework>
        <Nullable>enable</Nullable>
        <LangVersion>latest</LangVersion>
    </PropertyGroup>

    <PropertyGroup>
        <DuckovPath>E:\SteamLibrary\steamapps\common\Escape from Duckov</DuckovPath>
    </PropertyGroup>

    <ItemGroup>
        <Reference Include="$(DuckovPath)\Duckov_Data\Managed\TeamSoda.*">
            <Private>False</Private>
        </Reference>
        <Reference Include="$(DuckovPath)\Duckov_Data\Managed\Unity*">
            <Private>False</Private>
        </Reference>
        <Reference Include="$(DuckovPath)\Duckov_Data\Managed\Newtonsoft.Json.dll">
            <Private>False</Private>
        </Reference>
    </ItemGroup>

    <ItemGroup>
        <None Update="info.ini">
            <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
        </None>
    </ItemGroup>

</Project>
```



### 基础模组代码

创建一个新的 C# 类文件（`ModBehaviour.cs`），添加以下代码：

```C#
using System;
using System.IO;
using UnityEngine;

namespace DuckovCustomModelRegister
{
    public class ModBehaviour : Duckov.Modding.ModBehaviour
    {
        public const string TargetModId = "DuckovCustomModel";

        private static string? _modConfigsRootPath;
        private static bool _isInitialized;

        public static string ModDirectory => Path.GetDirectoryName(typeof(ModBehaviour).Assembly.Location)!;
        public static string ModelDirectory => Path.Combine(GetModConfigDirectory(TargetModId), "Models");

        private static string ModConfigsRootPath
        {
            get
            {
                if (_isInitialized) return _modConfigsRootPath!;
                InitializePath();
                _isInitialized = true;

                return _modConfigsRootPath!;
            }
        }

        private void OnEnable()
        {
            CreateModelDirectoryIfNeeded();
            CopyModels();
        }

        private static void InitializePath()
        {
            var installPath = Path.Combine(Application.dataPath, "..", "ModConfigs");
            installPath = Path.GetFullPath(installPath);

            if (IsDirectoryWritable(installPath))
            {
                _modConfigsRootPath = installPath;
                Debug.Log($"[DuckovCustomModelRegister] Using install directory for ModConfigs: {_modConfigsRootPath}");
                return;
            }

            Debug.LogWarning(
                $"[DuckovCustomModelRegister] Install directory is read-only, using persistent data path instead: {installPath}");
            _modConfigsRootPath = GetPersistentDataPath();
            Debug.Log($"[DuckovCustomModelRegister] Using persistent data path for ModConfigs: {_modConfigsRootPath}");
        }

        private static bool IsDirectoryWritable(string directoryPath)
        {
            try
            {
                if (!Directory.Exists(directoryPath)) Directory.CreateDirectory(directoryPath);

                var testFile = Path.Combine(directoryPath, ".writetest");
                File.WriteAllText(testFile, "test");
                File.Delete(testFile);
                return true;
            }
            catch (Exception ex)
            {
                Debug.LogWarning(
                    $"[DuckovCustomModelRegister] Directory is not writable: {directoryPath}, Error: {ex.Message}");
                return false;
            }
        }

        private static string GetPersistentDataPath()
        {
            var persistentPath = Application.persistentDataPath;
            var modConfigsPath = Path.Combine(persistentPath, "ModConfigs");

            if (Directory.Exists(modConfigsPath)) return modConfigsPath;
            try
            {
                Directory.CreateDirectory(modConfigsPath);
            }
            catch (Exception ex)
            {
                Debug.LogError(
                    $"[DuckovCustomModelRegister] Failed to create ModConfigs directory at persistent path: {ex.Message}");
                throw;
            }

            return modConfigsPath;
        }

        private static string GetModConfigDirectory(string modId)
        {
            return Path.Combine(ModConfigsRootPath, modId);
        }

        private static void CreateModelDirectoryIfNeeded()
        {
            if (Directory.Exists(ModelDirectory)) return;
            Directory.CreateDirectory(ModelDirectory);
        }

        private static void CopyModels()
        {
            var sourceDir = Path.Combine(ModDirectory, "Models");
            CopyFolder(sourceDir, ModelDirectory);
        }

        private static void CopyFolder(string sourceDir, string destDir)
        {
            if (!Directory.Exists(sourceDir)) return;
            if (!Directory.Exists(destDir)) Directory.CreateDirectory(destDir);

            foreach (var filePath in Directory.GetFiles(sourceDir))
            {
                var fileName = Path.GetFileName(filePath);
                var destFilePath = Path.Combine(destDir, fileName);
                File.Copy(filePath, destFilePath, true);
            }

            foreach (var directory in Directory.GetDirectories(sourceDir))
            {
                var dirName = Path.GetFileName(directory);
                var destSubDir = Path.Combine(destDir, dirName);
                CopyFolder(directory, destSubDir);
            }
        }
    }
}
```



## 配置 info.ini

在模组根目录创建 `info.ini` 文件，配置模组的元数据：

```ini
name = DuckovCustomModelRegister
displayName = Duckov Custom Model Template Model
description = A template mod for adding custom models to Duckov Custom Model.
```

### 字段说明

| 字段 | 说明 | 示例 |
|------|------|------|
| `Name` | 模组名称，需要和DLL对应 | `jiuhu` |
| `displayName` | 显示名称 | `酒狐` |
| `description` | 模组描述 | `把玩家模型替换为酒狐` |

## 编译模组

### 构建项目

1. 在 Rider/Visual Studio 中，选择 **生成（Build）** > **生成解决方案（Build Solution）**
2. 或使用快捷键：`Ctrl + Shift + B`

### 查找输出文件

编译完成后，DLL 文件通常位于：

```
项目目录/bin/Debug/net21/MyModelMod.dll
```

或

```
项目目录/bin/Release/net21/MyModelMod.dll
```

::: tip
建议使用 Release 配置进行最终构建，以获得更好的性能。
:::

## 打包模组

### 准备文件

1. 创建模组包文件夹（如 `MyModelMod_v1.0`）
2. 将以下文件复制到该文件夹：
   - 编译好的 `mod.dll`
   - `info.ini`
   - `preview.png`（模组预览图）
   - 所有模型包文件夹

### 最终结构

```
MyModelMod_v1.0/
├── MyCharacterPack/
│   ├── bundleinfo.json
│   ├── modelbundle.assetbundle
│   └── thumbnail.png
├── mod.dll
├── info.ini
└── preview.png
```

### 发布模组

在游戏进入主界面后，在Mods列表可以上传自己的Mod

![image-20251115044711551](/images/image-20251115044711551.png)

![image-20251115044729813](/images/image-20251115044729813.png)

## 常见问题

### 编译错误：找不到引用

**解决方法**：

### 模组加载但模型未复制

**解决方法**：

- 检查 控制台中的错误信息
- 确认模型包文件夹结构正确
- 验证目标目录的写入权限

### 模组不显示在模组管理器中

**解决方法**：
- 确认 `info.ini` 文件存在且格式正确
- 检查 `preview.png` 是否存在
- 确认模组文件夹放置在正确的位置
- 确认`info.ini`是否与模组的命名空间对应

## 下一步

完成模组创建后，你可以：

1. 在游戏论坛或社区分享你的模组
2. 创建使用说明和预览图
3. 收集用户反馈并持续改进

## 相关资源

- [模型包结构](./bundle-structure.md)
- [bundleinfo.json 配置](./bundle-structure.md#bundleinfo-json-格式)