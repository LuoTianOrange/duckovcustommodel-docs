# Float 类型参数

浮点类型参数用于控制连续变化的值。

## 移动相关参数

### MoveSpeed
移动速度比例

- **范围**：`0~2+`
- **说明**：
  - `0~1`：正常行走
  - `2`：奔跑速度
  - 可能超过 2

### 移动方向参数

| 参数       | 范围         | 说明                              |
| ---------- | ------------ | --------------------------------- |
| `MoveDirX` | `-1.0 ~ 1.0` | 移动方向 X 分量（角色本地坐标系） |
| `MoveDirY` | `-1.0 ~ 1.0` | 移动方向 Y 分量（角色本地坐标系） |

### 速度参数

| 参数                | 说明                       |
| ------------------- | -------------------------- |
| `VelocityX`         | 速度 X 分量                |
| `VelocityY`         | 速度 Y 分量                |
| `VelocityZ`         | 速度 Z 分量                |
| `VelocityMagnitude` | 速度大小（速度向量的长度） |

## 瞄准相关参数

### 瞄准方向参数

| 参数      | 说明            |
| --------- | --------------- |
| `AimDirX` | 瞄准方向 X 分量 |
| `AimDirY` | 瞄准方向 Y 分量 |
| `AimDirZ` | 瞄准方向 Z 分量 |

### AdsValue
瞄准值

- **范围**：`0.0 - 1.0`
- **说明**：瞄准进度（0 = 未瞄准，1 = 完全瞄准）

## 资源比率参数

### AmmoRate
弹药比率

- **范围**：`0.0 - 1.0`
- **计算**：当前弹药数 / 最大弹药容量
- **用途**：可用于显示弹药量的视觉反馈

### HealthRate
生命值比率

- **范围**：`0.0 - 1.0`
- **计算**：当前生命值 / 最大生命值
- **用途**：可用于受伤状态的动画过渡

### WaterRate
水分比率

- **范围**：`0.0 - 1.0`
- **计算**：当前水分 / 最大水分

### WeightRate
重量比率

- **范围**：`0.0+`（可能大于 1.0）
- **计算**：当前总重量 / 最大负重
- **说明**：超过 1.0 表示超重

::: tip
可以配合 `WeightState`（Int 参数）来判断具体的重量状态等级
:::

## 动作相关参数

### ActionProgress
动作进度百分比

- **范围**：`0.0 - 1.0`
- **说明**：当前动作的进度
- **获取方式**：由 `IProgress.GetProgress().progress` 获取
- **用途**：可用于显示动作执行进度（如装弹进度）

## 时间相关参数

### Time
当前 24 小时时间

- **范围**：`0.0 - 24.0`
- **获取方式**：由 `TimeOfDayController.Instance.Time` 获取
- **特殊值**：`-1.0` 表示不可用
- **用途**：可用于根据时间切换动画状态

## 使用示例

### 移动速度混合

```
Blend Tree: Movement 
├─ Idle (MoveSpeed: 0) 
├─ Walk (MoveSpeed: 1) 
└─ Run (MoveSpeed: 2)
```

### 生命值状态

```
State: Healthy (HealthRate > 0.7)
 ↓ 
State: Injured (0.3 < HealthRate ≤ 0.7)
 ↓ 
State: Critical (HealthRate ≤ 0.3)
```

### 瞄准过渡

```
Layer: ADS Layer Weight = AdsValue 
├─ Normal Pose (AdsValue: 0) 
└─ ADS Pose (AdsValue: 1)
```

## 相关文档

- [Bool 参数](/animator/bool-params)
- [Int 参数](/animator/int-params)
- [动画层配置](/animator/layers)