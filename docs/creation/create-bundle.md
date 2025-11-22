# 打包模型

本文档介绍如何将 Unity 中的模型打包成 AssetBundle 文件。

## 前置要求

在开始打包之前，确保你已经完成：

- 模型导入和设置
- 动画控制器配置
- 定位锚点设置
- 创建模型预制件（Prefab）



## 使用SDK打包(推荐)

如果安装了**DCM SDK**，可以使用SDK来打包模型。请查看[SDK介绍](/guide/dcmsdk.md#使用SDK打包模型)页面。



## 手动打包

### 设置 AssetBundle 名称

#### 1. 选择预制件

在 Project 窗口中找到并选中你的模型预制件（Prefab）。

![image-20251116155828569](/images/image-20251116155828569.png)

#### 2. 分配 AssetBundle 名称

在 Inspector 窗口的右下角：

1. 找到 **AssetBundle** 下拉菜单

![image-20251116160058483](/images/image-20251116160058483.png)

1. 点击下拉菜单

   ![image-20251116155957262](/images/image-20251116155957262.png)

2. 选择 **New...** 创建新的 AssetBundle 名称

3. 输入名称，例如：`mymodel`

![image-20251116160158992](/images/image-20251116160158992.png)

::: tip 命名规范
- 使用小写字母
- 使用下划线分隔单词
- 避免使用空格和特殊字符
- 例如：`character_model`、`pet_bundle`、`ai_pack`
:::

#### 3. 确认分配

分配后，Inspector 右下角应该显示你设置的 AssetBundle 名称。

![image-20251116155558526](/images/image-20251116155558526.png)

```
AssetBundle: mymodel
Variant: [None]
```

::: tip 添加多个模型

- 可以在一个AssetBundle 添加多个模型
- 在`bundleinfo.json`填写`PrefabPath`时，填写不同的路径，如模型1是`Assets/Model1.prefab`，模型2是`Assets/Model2.prefab`，他们使用共同的`BundlePath`

:::

### 创建打包脚本

#### 1. 创建编辑器脚本文件夹

如果还没有 `Editor` 文件夹，在 `Assets` 目录下创建：

![image-20251116160758560](/images/image-20251116160758560.png)

```bash [文件夹]
Assets/
└── Editor/
    └── BuildAssetBundle.cs
```

::: warning 重要
`BuildAssetBundle.cs`必须放在 `Editor` 文件夹中，否则脚本无法正常工作。
:::

#### 2. 创建打包脚本

创建 `BuildAssetBundle.cs` 文件，添加以下代码：

```csharp [csharp]
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;
 
/// <summary>
/// AssetBundle 打包工具
/// </summary>
public class BuildAssetBundle 
{
    /// <summary>
    /// 打包生成所有的AssetBundles（包）
    /// </summary>
    [MenuItem("AssetBundleTools/BuildAllAssetBundles")]
    public static void BuildAllAB() {
        // 打包AB输出路径
        string strABOutPAthDir = string.Empty;
 
        // 获取“StreamingAssets”文件夹路径（不一定这个文件夹，可自定义）
        strABOutPAthDir = Application.streamingAssetsPath;
 
        // 判断文件夹是否存在，不存在则新建
        if (Directory.Exists(strABOutPAthDir) == false)
        {
            Directory.CreateDirectory(strABOutPAthDir);
        }
 
        // 打包生成AB包 (目标平台根据需要设置即可)
        BuildPipeline.BuildAssetBundles(strABOutPAthDir,BuildAssetBundleOptions.None,BuildTarget.StandaloneWindows64);
 
    }
}
```

#### 3. 保存脚本

保存文件后，Unity 会自动编译脚本。

### 执行打包

#### 1. 打开打包菜单

在 Unity 编辑器顶部菜单栏，找到并点击：

![image-20251116160551501](/images/image-20251116160551501.png)

```
AssetBundleTools > BuildAllAssetBundles
```

#### 2. 等待打包完成

打包过程可能需要几秒到几分钟，取决于模型的复杂度。



#### 3. 检查输出文件

打包完成后，在 `Assets/StreamingAssets` 文件夹中会生成以下文件：

```bash [文件夹]
Assets/StreamingAssets/
├── AssetBundles              # 主清单文件
├── AssetBundles.manifest     # 主清单配置
├── mymodel                   # 你的 AssetBundle 文件
└── mymodel.manifest          # AssetBundle 配置文件
```

::: warning
使用这个脚本打包的是 **不带后缀名** 的 AssetBundle 文件（如 `mymodel`），如果使用**DCM SDK**打包会带`.unity3d`的后缀名。
:::

## 常见问题

### 问题 1：找不到 AssetBundleTools 菜单

**原因**：
- 脚本没有放在 `Editor` 文件夹中
- 脚本编译错误

**解决方法**：
1. 确认脚本在 `Assets/Editor/` 文件夹中
2. 检查 Console 窗口是否有编译错误
3. 重启 Unity

### 问题 2：打包后没有生成文件

**原因**：
- 没有为任何资源分配 AssetBundle 名称
- 输出路径没有写入权限

**解决方法**：
1. 检查预制件是否分配了 AssetBundle 名称
2. 确认输出目录有写入权限
3. 查看 Console 是否有错误信息

### 问题 3：AssetBundle 文件很大

**原因**：
- 使用了未压缩选项
- 包含了过多不必要的资源

**解决方法**：
1. 使用 `ChunkBasedCompression` 压缩选项
2. 优化模型和贴图
3. 只打包必要的资源

### 问题 4：点击打包后没有反应

**原因**：

- 预制件没有更新

**解决方法**：

1. 如果预制件没有更新是不会重新打包模型的

## 下一步

完成打包后，你可以：

1. [添加音效](./sounds.md) - 给模型添加待机或其他音效
2. [适配AI角色](./ai-characters.md) - 配置模型可以修改的AI角色
2. [打包模型包](./bundle-structure) - 把模型和配置文件等资产打包成模型包
3. [创建模组](./create-mod.md) - 将 AssetBundle 打包成模组

## 相关资源

- [Unity AssetBundle 官方文档](https://docs.unity3d.com/Manual/AssetBundlesIntro.html)
- [模型包结构](./bundle-structure.md)
