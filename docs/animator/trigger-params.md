# Trigger 类型参数

触发器类型参数用于触发一次性动作。触发一个循环后会自动重置。

## 可用触发器

### Attack
攻击触发

- **用途**：用于触发近战攻击动画
- **触发时机**：角色执行近战攻击时
- **使用场景**：
  - 切换到攻击动画状态
  - 触发攻击特效
  - 播放攻击音效

### Shoot
射击触发

- **更新机制**：当持有 `ItemAgent_Gun` 时，由 `OnShootEvent` 事件触发
- **用途**：用于触发射击动画
- **触发时机**：枪械开火时
- **使用场景**：
  - 播放后坐力动画
  - 触发枪口火焰特效
  - 同步射击音效

## 使用方式

### 在 Animator Controller 中设置

1. **创建触发器参数**
   
   - 在 Animator Controller 的 Parameters 中添加触发器
   - 名称必须与上述名称完全匹配
   
2. **设置过渡条件**

   - Any State → Attack Animation Conditions: Attack (Trigger) 

   - Settings: Exit Time = false

3. **动画完成后返回**

   - Attack Animation → Idle Conditions: Exit Time = true Settings: Exit Time = 0.9

## 近战攻击示例

### 基础配置

Parameters:

- Attack (Trigger)

```
States: 
├─ Idle 
└─ Attack 
├─ Attack_1 (0.0 - 0.33) 
├─ Attack_2 (0.33 - 0.66) 
└─ Attack_3 (0.66 - 1.0)
```

Transitions: 

```
Any State → Attack Conditions: Attack Exit Time: false
```

```
Attack → Idle Conditions: (none) Exit Time: true Exit Time Value: 0.9
```

### 配合 MeleeAttack 层

如果使用专门的近战攻击动画层：

Base Layer:

- 角色基础动画

MeleeAttack Layer:

- Weight: 根据攻击状态自动调整
- Blending: Override
- States: └─ Attack Animation Conditions: Attack (Trigger)

::: tip

详见 [动画层配置](/animator/layers)

:::

## 射击动画示例

### 基础配置

Parameters:

- Shoot (Trigger)
- InAds (Bool)

```
States: ├─ Idle ├─ Shoot_Hip └─ Shoot_ADS

Transitions: Idle → Shoot_Hip Conditions: Shoot AND !InAds

Idle → Shoot_ADS Conditions: Shoot AND InAds

Shoot_* → Idle Exit Time: true
```

## 事件订阅说明

### OnShootEvent 订阅

当角色持有 `ItemAgent_Gun` 时：

1. 模组自动订阅枪械的 `OnShootEvent` 事件
2. 事件触发时设置 `Shoot` 触发器
3. Animator 响应触发器，播放射击动画

### OnHoldAgentChanged 处理

当角色切换持有物品时：

1. 取消订阅之前物品的事件
2. 订阅新物品的相关事件
3. 更新相关参数状态

## 最佳实践

:::tip 触发器使用建议
1. **避免长时间动画**：触发器动画应该简短，避免阻塞其他动作
2. **使用 Exit Time**：确保动画播放完整后再过渡
3. **配合其他参数**：结合 Bool 和 Int 参数来控制不同情况下的触发效果
4. **测试触发时机**：确保触发器在正确的时机被调用
:::

## 调试技巧

### 在 Unity 中调试

1. 运行游戏
2. 在 Animator 窗口中观察触发器状态
3. 触发动作时，触发器会短暂高亮显示
4. 检查动画是否正确播放

### 常见问题

| 问题         | 可能原因           | 解决方案               |
| ------------ | ------------------ | ---------------------- |
| 触发器不工作 | 参数名称不匹配     | 检查拼写和大小写       |
| 动画不播放   | 过渡条件错误       | 检查 Transition 设置   |
| 动画卡住     | Exit Time 设置错误 | 调整 Exit Time 值      |
| 连续触发失败 | 动画未完成         | 缩短动画时长或调整逻辑 |

## 相关文档

- [Bool 参数](/animator/bool-params)
- [动画层配置](/animator/layers)
- [模型制作指南](/creation/bundle-structure)