# 疑难解答

本页面汇总了在使用 DuckovCustomModel 模组过程中可能遇到的常见问题及解决方案。如果遇到了本文档内没有出现的问题，请联系我们。

## 安装模组的问题

### 我找不到模组文件夹

1. 在Steam游戏列表右键“**逃离鸭科夫**”游戏，依次点击**管理** -> **浏览本地文件**。

   ![image-20251118223458867](/images/image-20251118223458867.png)

2. 系统会打开逃离鸭科夫的游戏目录（一般是`SteamLibrary\steamapps\common\Escape from Duckov`）。

   ![image-20251118224245544](/images/image-20251118224245544.png)

3. 进入`Duckov_Data`文件夹，我们应该可以看到`Mods`文件夹。

   ![image-20251118224511418](/images/image-20251118224511418.png)

   ::: tip 小提示
   如果没有**Mods**文件夹，可以自己在**Duckov_Data**文件夹内手动创建一个。
   :::

### 我无法在游戏中勾选模组

1. 检查是否安装了`Harmony Lib`。本 Mod 需要 `Harmony Lib` 前置，需要保证从上到下顺序中，`Harmony Lib` 位于本 Mod 的前面，在调整顺序后需要重启游戏。
2. 你知道吗，99%无法勾选模型管理器的人是因为`HarmonyLib`的加载顺序不正确。

![image-20251114181640496](/images/image-20251114181640496.png)

正常的Mod安装顺序如下图，模型模组的顺序不影响模型管理器的加载：

![image-20251118233004252](/images/image-20251118233004252.png)



### 我的模组制作好了，但是在管理器找不到我的模型

- 检查`bundleinfo.json`内的`BundlePath`和`PrefabPath`路径是否正确。



### 编译模组错误：找不到引用

**解决方法**：

- 检查`csproj`内的`DuckovPath`路径是否正确



### 模组加载但模型未复制

**解决方法**：

- 检查 控制台中的错误信息，路径为`%userprofile%\AppData\LocalLow\TeamSoda\Duckov\Player.log`
- 确认模型包文件夹结构正确
- 验证目标目录的写入权限



### 模组不显示在模组管理器中

- 确认 `info.ini` 文件存在且格式正确
- 检查 `preview.png` 是否存在
- 确认模组文件夹放置在正确的位置
- 确认`info.ini`是否与模组的[命名空间](./create-mod#基础模组代码)对应



### 模组上传失败

- 使用加速器或魔法来上传模组
- 检查模组`info.ini`信息是否正确
- 检查创意工坊物品是否在审核中
- 检查账户是否有上传权限
- 检查模组预览图是否过大，推荐尺寸`256x256`



## 创建模型的问题

### 模型的透明材质显示不正常

待解决



### 旋转物体时，没有按照我选中的物体旋转

![旋转物体时，没有按照我选中的物体旋转](/images/旋转物体时，没有按照我选中的物体旋转.gif)

把操作物体的旋转方式从**Center（中心）**切换到**Pivot（轴心）**

![image-20251119154412970](/images/image-20251119154412970.png)



### 我的项目里面没有AssetBundleTools 菜单

请参考[打包模型](create-bundle#创建打包脚本)页面手动创建脚本。更推荐使用**DCM SDK**来打包模型。



### 我的模型的动画只会播放一遍

请打开动画上面的**Loop Time（循环时间）**

![image-20251122170224148](/images/image-20251122170224148.png)



## DCM SDK的问题

### 安装SDK时提示Error CS0246：

- **The type of or namespace name 'Newtonsoft' could not be found：**

  打开包管理器，点击"**+**"，然后点击**Add package by name**

  ![image-20251122220622320](../images/image-20251122220622320.png)

  输入

  ```
  com.unity.nuget.newtonsoft-json
  ```

  ![image-20251122220941886](../images/image-20251122220941886.png)

  然后点击**添加**按钮，等待包安装完成。







## 创建模组的问题

暂无，待补充
