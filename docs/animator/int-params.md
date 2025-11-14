# Int 类型参数

整数类型参数用于控制枚举状态。

## 角色类型参数

### CurrentCharacterType
当前角色类型

| 值   | 说明              |
| ---- | ----------------- |
| `0`  | 角色（Character） |
| `1`  | 宠物（Pet）       |

## 手部状态参数

### HandState
手部状态

| 值   | 说明                    |
| ---- | ----------------------- |
| `0`  | 默认状态                |
| `1`  | 正常（normal）          |
| `2`  | 枪械（gun）             |
| `3`  | 近战武器（meleeWeapon） |
| `4`  | 弓（bow）               |
| `-1` | 搬运状态                |

::: tip 使用场景
可以根据不同的 HandState 切换手部动画姿态
:::

## 武器相关参数

### ShootMode
射击模式

- **更新时机**：当持有 `ItemAgent_Gun` 时，由枪械的 `triggerMode` 决定

| 值   | 说明           |
| ---- | -------------- |
| `0`  | 自动（auto）   |
| `1`  | 半自动（semi） |
| `2`  | 栓动（bolt）   |

### GunState
枪械状态

- **更新时机**：当持有 `ItemAgent_Gun` 时，由枪械的 `GunState` 决定

| 值   | 说明                                 |
| ---- | ------------------------------------ |
| `0`  | 射击冷却（shootCooling）             |
| `1`  | 就绪（ready）                        |
| `2`  | 开火（fire）                         |
| `3`  | 连发每发冷却（burstEachShotCooling） |
| `4`  | 空弹（empty）                        |
| `5`  | 装弹中（reloading）                  |

### WeaponInLocator
武器当前所在的定位点类型

| 值   | 说明                            |
| ---- | ------------------------------- |
| `0`  | 无武器                          |
| `1`  | 右手定位点（`normalHandheld`）  |
| `2`  | 近战武器定位点（`meleeWeapon`） |
| `3`  | 左手定位点（`leftHandSocket`）  |

::: info
当武器类型为左手但模型没有左手定位点时，会自动使用右手定位点（值为 `1`）
:::

## 瞄准类型参数

### AimType
瞄准类型

- **更新方式**：由 `CharacterMainControl.AimType` 决定

| 值   | 说明                       |
| ---- | -------------------------- |
| `0`  | 正常瞄准（normalAim）      |
| `1`  | 角色技能（characterSkill） |
| `2`  | 手持技能（handheldSkill）  |

## 重量状态参数

### WeightState
重量状态

- **生效范围**：仅在 Raid 地图中生效

| 值   | 范围                     | 说明 |
| ---- | ------------------------ | ---- |
| `0`  | WeightRate ≤ 0.25        | 轻量 |
| `1`  | 0.25 < WeightRate ≤ 0.75 | 正常 |
| `2`  | 0.75 < WeightRate ≤ 1.0  | 超重 |
| `3`  | WeightRate > 1.0         | 过载 |

::: tip
配合 `WeightRate`（Float 参数）可以实现更细腻的重量反馈动画
:::

## 装备 TypeID 参数

这些参数存储装备的 TypeID，无装备时为 `0`。

| 参数                | 说明                  |
| ------------------- | --------------------- |
| `LeftHandTypeID`    | 左手装备的 TypeID     |
| `RightHandTypeID`   | 右手装备的 TypeID     |
| `ArmorTypeID`       | 护甲装备的 TypeID     |
| `HelmetTypeID`      | 头盔装备的 TypeID     |
| `HeadsetTypeID`     | 耳机装备的 TypeID     |
| `FaceTypeID`        | 面部装备的 TypeID     |
| `BackpackTypeID`    | 背包装备的 TypeID     |
| `MeleeWeaponTypeID` | 近战武器装备的 TypeID |

::: tip 高级用法
可以根据具体的 TypeID 来显示不同的装备外观或动画
:::

## 动作优先级参数

### ActionPriority
动作优先级

- **更新方式**：由 `CharacterMainControl.CurrentAction.ActionPriority()` 决定

| 值   | 说明                  |
| ---- | --------------------- |
| `0`  | Whatever（任意）      |
| `1`  | Reload（装弹）        |
| `2`  | Attack（攻击）        |
| `3`  | usingItem（使用物品） |
| `4`  | Dash（冲刺）          |
| `5`  | Skills（技能）        |
| `6`  | Fishing（钓鱼）       |
| `7`  | Interact（交互）      |

::: info 配合使用
当 `ActionRunning`（Bool 参数）为 `true` 时，动作优先级可以近似用于判断角色正在执行什么动作
:::

## 环境参数

### Weather
当前天气状态

- **获取方式**：由 `TimeOfDayController.Instance.CurrentWeather` 获取
- **特殊值**：`-1` 表示不可用

| 值   | 说明                 |
| ---- | -------------------- |
| `0`  | 晴天（Sunny）        |
| `1`  | 多云（Cloudy）       |
| `2`  | 雨天（Rainy）        |
| `3`  | 风暴 I（Stormy_I）   |
| `4`  | 风暴 II（Stormy_II） |

### TimePhase
当前时间阶段

- **获取方式**：由 `TimeOfDayController.Instance.CurrentPhase.timePhaseTag` 获取
- **特殊值**：`-1` 表示不可用

| 值   | 说明          |
| ---- | ------------- |
| `0`  | 白天（day）   |
| `1`  | 黎明（dawn）  |
| `2`  | 夜晚（night） |

## 使用示例

### 根据手部状态切换动画

```
State Machine: HandState 
├─ Default (HandState == 0) 
├─ Normal (HandState == 1) 
├─ Gun (HandState == 2) 
├─ MeleeWeapon (HandState == 3) 
├─ Bow (HandState == 4) 
└─ Carrying (HandState == -1)
```

### 根据天气切换效果

```
State: Sunny (Weather == 0) 
			↓ 
State: Rainy (Weather == 2) 
			↓ 
State: Stormy (Weather == 3 or 4)
```

## 相关文档

- [Bool 参数](/animator/bool-params)
- [Float 参数](/animator/float-params)
- [Trigger 参数](/animator/trigger-params)