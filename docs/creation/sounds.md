# 添加自定义音效

本文档介绍如何给模型配置自定义音效，以及如何触发自定义音效。

## 音效配置

在 `bundleinfo.json` 的 `ModelInfo` 中可以配置音效：

```json
{
  "ModelID": "unique_model_id",
  "Name": "模型显示名称",
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
      "Path": "sounds/death.wav",
      "Tags": ["death"]
    }
  ]
}
```

### SoundInfo 字段说明

- `Path`（必需）：音效文件路径，相对于模型包文件夹
- `Tags`（可选）：音效标签数组，用于指定音效的使用场景
  - `"normal"`：普通音效，用于玩家按键触发和 AI 普通状态
  - `"surprise"`：警戒音效，用于 AI 警戒状态
  - `"death"`：死亡音效，用于 AI 死亡状态
  - `"idle"`：待机音效，用于角色自动播放（可通过配置控制哪些角色类型允许自动播放）
  - `"trigger_on_death"`： 死亡音效，用于角色死亡时自动播放音效
  - `"trigger_on_hurt"`： 受伤音效，用于角色受伤时自动播放音效
  - `"search_found_item_quality_none"`： 搜索到品质为none的物品时自动播放音效
  - `"search_found_item_quality_white"`： 搜索到品质为white的物品时自动播放音效
  - `"search_found_item_quality_green"`： 搜索到品质为green的物品时自动播放音效
  - `"search_found_item_quality_blue"`： 搜索到品质为blue的物品时自动播放音效
  - `"search_found_item_quality_purple"`： 搜索到品质为purple的物品时自动播放音效
  - `"search_found_item_quality_orange"`： 搜索到品质为orange的物品时自动播放音效
  - `"search_found_item_quality_red"`： 搜索到品质为red的物品时自动播放音效
  - `"search_found_item_quality_q7"`： 搜索到品质为q7的物品时自动播放音效
  - `"search_found_item_quality_q8"`： 搜索到品质为q8的物品时自动播放音效
  - 可以同时包含多个标签，表示该音效可用于多个场景
  - 未指定标签时，默认为 `["normal"]`

## 音效触发方式

自定义音效有两种触发方式，玩家按键触发和AI自动触发。

### 玩家按键触发

- 当角色模型配置了音效时，玩家按下游戏中的 `Quack` 键会触发音效
- 只会播放标签为 `"normal"` 的音效
- 从所有 `"normal"` 标签的音效中随机选择一个播放
- 只有玩家角色会响应按键，宠物不会触发
- 播放音效时会同时创建 AI 声音，使其他 AI 能够听到玩家发出的声音

### AI 自动触发

- AI 会根据游戏状态自动触发相应标签的音效
- `"normal"`：AI 普通状态时触发
- `"surprise"`：AI 惊讶状态时触发
- `"death"`：AI 死亡状态时触发
- `"idle"`：启用了自动播放的角色会在随机间隔时间自动播放待机音效
  - 播放间隔可在 `IdleAudioConfig.json` 中配置
  - 默认间隔为 30-45 秒（随机）
  - 角色死亡时不会播放
  - 哪些角色类型允许自动播放可通过 `EnableIdleAudio` 和 `AICharacterEnableIdleAudio` 配置控制
  - 默认情况下，AI 角色和宠物允许自动播放，玩家角色不允许（可通过配置启用）
- 如果指定标签的音效不存在，将使用原版事件（不会回退到其他标签）

## 音效文件要求

- 音效文件应放置在模型包文件夹内
- 支持游戏使用的音频格式（通常为 WAV、OGG 等）
- 音效文件路径在 `Path` 中指定，相对于模型包文件夹
- 例如：如果模型包文件夹为 `MyModel/`，音效文件为 `MyModel/sounds/voice.wav`，则 `Path` 应设置为 `"sounds/voice.wav"`

## 注意事项

- 如果模型没有配置音效，不会影响其他功能
