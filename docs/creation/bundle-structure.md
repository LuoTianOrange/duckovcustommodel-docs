# 打包模型包

制作好模型后，需要打包成模型包方便我们的Mod使用。

## 模型包结构

每个模型包文件夹应包含以下文件：

```bash [文件夹]
模型包文件夹/
├── bundleinfo.json          # 模型包配置文件（必需）
├── modelbundle.assetbundle  # Unity AssetBundle 文件（必需）
└── thumbnail.png            # 缩略图文件（建议）
```

## bundleinfo.json 格式

```json [json]
{
  "BundleName": "模型包名称",
  "BundlePath": "modelbundle.assetbundle",
  "Models": [
    {
      "ModelID": "unique_model_id",
      "Name": "模型显示名称",
      "Author": "作者名称",
      "Description": "模型描述",
      "Version": "1.0.0",
      "ThumbnailPath": "thumbnail.png",
      "PrefabPath": "Assets/Model.prefab",
      "DeathLootBoxPrefabPath": "Assets/DeathLootBox.prefab",
      "Target": ["Character", "AICharacter"],
      "SupportedAICharacters": ["Cname_Wolf", "Cname_Scav", "*"],
      "CustomSounds": [
        {
          "Path": "sounds/normal1.wav",
          "Tags": ["normal"]
        },
        {
          "Path": "sounds/normal2.wav",
          "Tags": ["normal"]
        },
        {
          "Path": "sounds/surprise.wav",
          "Tags": ["surprise", "normal"]
        },
        {
          "Path": "sounds/得吃的小曲.ogg",
          "Tags": ["search_found_item_quality_red"]
        },
        {
          "Path": "sounds/idle1.wav",
          "Tags": ["idle"]
        }
      ]
    }
  ]
}
```

## 字段说明

#### **BundleName**（必需）

模型包名称，用于标识和显示

#### **BundlePath**（必需）

AssetBundle 文件路径，相对于模型包文件夹的路径

#### **Models**（必需）

模型信息数组，可包含多个模型

#### **ModelInfo 字段**

- `ModelID`（必需）：模型的唯一标识符，用于在配置文件中引用模型，可以是数字，中文或英文
- `Name`（可选）：模型在界面中显示的名称
- `Author`（可选）：模型作者
- `Description`（可选）：模型描述信息
- `Version`（可选）：模型版本号
- `ThumbnailPath`（可选）：缩略图路径，相对于模型包文件夹的外部文件路径（如 `"thumbnail.png"`）
- `PrefabPath`（必需）：模型 Prefab 在打包 AssetBundle 时，在 Unity 内的资源路径（如 `"Assets/Model.prefab"`）
- `DeathLootBoxPrefabPath`（可选）：死亡战利品箱 Prefab 在打包 AssetBundle 时，在 Unity 内的资源路径（如 `"Assets/DeathLootBox.prefab"`）
  - 当角色使用该模型并死亡时，如果配置了此字段，死亡战利品箱会使用自定义的 Prefab 替换默认模型
  - 如果未配置此字段，死亡战利品箱将使用默认模型
- `Target`（可选）：模型适用的目标类型数组（默认：`["Character"]`）
  - 可选值：`"Character"`（角色）、`"Pet"`（宠物）、`"AICharacter"`（AI 角色）
  - 可以同时包含多个值，表示该模型同时适用于多个目标类型
  - 模型选择界面会根据当前选择的目标类型过滤显示兼容的模型
- `SupportedAICharacters`（可选）：支持的 AI 角色名称键数组（仅在 `Target` 包含 `"AICharacter"` 时有效）
  - 可以指定该模型适用于哪些 AI 角色，具体请查看[AI 角色适配](/creation/ai-characters.md)
  - 特殊值 `"*"`：表示该模型适用于所有 AI 角色
  - 如果为空数组且 `Target` 包含 `"AICharacter"`，则该模型不会应用于任何 AI 角色
- `CustomSounds`（可选）：自定义音效信息数组，支持为音效配置标签，具体标签信息请查看[添加自定义音效](./sounds.md#SoundInfo-字段说明)
  - 每个音效可以配置多个标签（`normal`、`surprise`）
  - 未指定标签时，默认为 `["normal"]`
  - 同一音效文件可以同时用于多个场景
  - 音效文件路径在 `Path` 中指定，相对于模型包文件夹
- `WalkSoundFrequency`（可选）：走路时每秒的脚步声触发频率
  - 用于控制角色走路时脚步声的播放频率
  - 如果未指定，将自动使用原始角色的走路脚步声频率设置
- `RunSoundFrequency`（可选）：跑步时每秒的脚步声触发频率
  - 用于控制角色跑步时脚步声的播放频率
  - 如果未指定，将自动使用原始角色的跑步脚步声频率设置

## 添加多个模型

可以在`Models`内添加多个模型，以下是酒狐Mod的示例`bundleinfo.json`文件。文件内添加了酒狐的`Character`模型和狐狸的`Pet`模型，同时两个模型都支持替换所有`AICharacter`模型。

```json [json]
{
  "BundleName": "jiuhu",
  "BundlePath": "jiuhu",
  "Models": [
    {
      "ModelID": "10004",
      "Name": "酒狐",
      "Author": "酒石酸菌",
      "Description": "酒狐模型",
      "Version": "1.0.12",
      "ThumbnailPath": "preview.png",
      "PrefabPath": "Assets/酒狐模型.prefab",
      "Target": [
        "Character", 
        "AICharacter"
      ],
      "SupportedAICharacters": ["*"],
      "CustomSounds": [
        {
          "Path": "sounds/idle1.ogg",
          "Tags": [
            "normal"
          ]
        },
        {
          "Path": "sounds/idle2.ogg",
          "Tags": [
            "normal"
          ]
        }
      ]
    },
    {
      "ModelID": "10005",
      "Name": "酒狐(狐狸形态)",
      "Author": "酒石酸菌",
      "Description": "酒狐狐狸模型",
      "Version": "1.0.12",
      "ThumbnailPath": "preview2.png",
      "PrefabPath": "Assets/酒狐狐狸.prefab",
      "Target": [
        "Pet",
        "AICharacter"
      ],
      "SupportedAICharacters": ["*"]
    }
  ]
}
```



## 下一步

完成打包模型包后，轮到我们的最后一步——[创建模组](./create-mod)，就快要成功了！
