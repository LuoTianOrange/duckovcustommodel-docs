# Bool 类型参数

布尔类型参数用于控制状态切换，值为 `true` 或 `false`。

## 基础状态参数

### Grounded
角色是否在地面上

- `true`：角色在地面上
- `false`：角色在空中（跳跃、下落）

### Die
角色是否死亡

- `true`：角色已死亡
- `false`：角色存活

### Moving
角色是否正在移动

- `true`：角色正在移动
- `false`：角色静止

### Running
角色是否正在奔跑

- `true`：角色正在奔跑
- `false`：角色正常行走或静止

### Dashing
角色是否正在冲刺

- `true`：角色正在冲刺
- `false`：角色未冲刺

### Hidden
角色是否处于隐藏状态

- `true`：角色隐藏
- `false`：角色可见

## 武器相关参数

### GunReady
枪械是否准备就绪

- `true`：枪械准备就绪
- `false`：枪械未准备就绪

### Loaded
枪械是否已装弹

- **更新机制**：当持有 `ItemAgent_Gun` 时，由 `OnLoadedEvent` 事件更新
- `true`：枪械已装弹
- `false`：枪械未装弹或空弹

### Reloading
是否正在装弹

- `true`：正在装弹
- `false`：未在装弹

### RightHandOut
右手是否伸出

- `true`：右手伸出
- `false`：右手收回

### InAds
是否正在瞄准（ADS - Aim Down Sights）

- `true`：正在瞄准
- `false`：未瞄准

## 动作状态参数

### ActionRunning
是否正在执行动作

- **判断依据**：由 `CharacterMainControl.CurrentAction` 决定
- `true`：正在执行动作
- `false`：未执行动作

::: tip
可以配合 `ActionPriority`（Int 参数）来判断具体执行的动作类型
:::

## 装备相关参数

### HideOriginalEquipment
是否隐藏原有装备

- **控制方式**：由 `HideEquipmentConfig.json` 中对应 `ModelTarget` 的配置控制
- `true`：隐藏原有装备
- `false`：显示原有装备

### 装备槽位参数

以下参数基于装备的 TypeID 判断（TypeID > 0 时为 `true`）：

| 参数               | 说明                   |
| ------------------ | ---------------------- |
| `LeftHandEquip`    | 左手槽位是否有装备     |
| `RightHandEquip`   | 右手槽位是否有装备     |
| `ArmorEquip`       | 护甲槽位是否有装备     |
| `HelmetEquip`      | 头盔槽位是否有装备     |
| `HeadsetEquip`     | 耳机槽位是否有装备     |
| `FaceEquip`        | 面部槽位是否有装备     |
| `BackpackEquip`    | 背包槽位是否有装备     |
| `MeleeWeaponEquip` | 近战武器槽位是否有装备 |

## 其他参数

### ThermalOn
热成像是否开启

- `true`：热成像开启
- `false`：热成像关闭

### HavePopText
是否有弹出文本

- **检测方式**：检测弹出文本槽位是否有子对象
- `true`：有弹出文本
- `false`：无弹出文本

## 使用示例

在 Animator Controller 中使用这些参数：

```
State: Idle 
↓ (Transition: Moving == true) 
State: Walk 
↓ (Transition: Running == true) 
State: Run 
↓ (Transition: Dashing == true) 
State: Dash
```

## 相关文档

- [Float 参数](/animator/float-params)
- [Int 参数](/animator/int-params)
- [Trigger 参数](/animator/trigger-params)