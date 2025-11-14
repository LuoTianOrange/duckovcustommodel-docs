# 动画层配置

除了基础的 Animator Controller 参数外，还可以配置可选的动画层来实现特殊效果。

## MeleeAttack 层

### 层配置

如果模型包含近战攻击动画，可以添加名为 `"MeleeAttack"` 的动画层：

- **层名称**：必须为 `"MeleeAttack"`（区分大小写）
- **用途**：用于播放近战攻击动画
- **权重调整**：层的权重会根据攻击状态自动调整

### 工作原理

1. **检测攻击**
   - 模组检测到角色执行近战攻击
   - 自动触发 `Attack` 触发器参数

2. **权重调整**
   - 攻击开始时，层权重从 0 逐渐增加到 1
   - 攻击动画播放
   - 攻击结束后，层权重从 1 逐渐减少到 0

3. **动画混合**
   - 基础层继续播放角色的基础动画
   - MeleeAttack 层覆盖上身或全身的动画
   - 通过权重实现平滑过渡

### 配置示例

Animator Controller:

Base Layer:

- Weight: 1.0 (固定)

- Blending: Override

- States: 

  ```
  ├─ Idle 
  ├─ Walk 
  └─ Run
  ```

  

MeleeAttack Layer:

- Weight: 0.0~1.0 (自动调整)
- Blending: Override (覆盖基础层)
- IK Pass: false
- States: 

```
├─ Empty (默认空状态) 
└─ Attack 
├─ Attack_1 
├─ Attack_2 
└─ Attack_3
```

- Transitions: 

```
Empty → Attack Conditions: Attack (Trigger) Exit 
```

- Time: 

```
false Attack → Empty Conditions: (none) Exit Time: true 
```

- Exit Time: 0.9

### Avatar Mask 设置

为了让攻击动画只影响上身，可以配置 Avatar Mask：

1. **创建 Avatar Mask**
   - 在 Unity 中创建新的 Avatar Mask
   - 勾选需要被攻击动画影响的骨骼（通常是上身）
   - 取消勾选下身骨骼（保持行走动画）
2. **应用到层**
   - 选中 MeleeAttack 层
   - 将创建的 Avatar Mask 赋值给 `Mask` 属性
3. **推荐配置**

Avatar Mask: 

- [x] Head 
- [x]  Upper Body 
- [x] Left Arm 
- [x] Right Arm 
- [ ] Lower Body 
- [ ] Left Leg 
- [ ] Right Leg

## 自定义动画层

除了 `MeleeAttack` 层外，你还可以创建自定义动画层来实现其他效果。

### 常见用途

| 层名称建议       | 用途                     | Blending 模式 |
| ---------------- | ------------------------ | ------------- |
| `UpperBody`      | 上身动画（如端枪、装弹） | Override      |
| `AdditiveLayer`  | 附加动画（如呼吸、受击） | Additive      |
| `FaceExpression` | 面部表情                 | Override      |
| `ADS`            | 瞄准姿态                 | Override      |

### 配置要点

:::tip 动画层最佳实践
1. **合理使用权重**：通过权重控制层的影响程度
2. **选择正确的 Blending 模式**：
- Override：完全覆盖下层动画
- Additive：叠加到下层动画上
3. **使用 Avatar Mask**：精确控制哪些骨骼受影响
4. **避免过多层**：过多层会影响性能
:::

## 动画器工作流程

### 完整流程

1. **初始化**
- 模组加载自定义模型
- 检测 Animator 组件和 Controller
- 识别所有配置的参数和层

2. **实时更新**
- 模组读取游戏状态
- 更新 Animator 参数（Bool、Float、Int）
- 根据游戏事件触发 Trigger 参数

3. **层权重管理**
- 检测特殊层（如 MeleeAttack）
- 根据游戏状态自动调整层权重
- 实现平滑过渡

4. **事件订阅**
- 订阅枪械相关事件（OnShootEvent、OnLoadedEvent）
- 订阅持有物品切换事件（OnHoldAgentChanged）
- 根据事件更新相关参数

### 参数更新优先级

```
游戏状态变化 
↓ 
模组检测变化 
↓ 
更新 Animator 参数 
↓ 
Animator Controller 响应 
↓ 
播放对应动画 
↓ 
（如果有特殊层）调整层权重 
↓ 
最终动画输出
```

## 调试和测试

### 在 Unity 编辑器中测试

1. **手动设置参数**
   - 在 Animator 窗口中手动修改参数值
   - 观察动画过渡和混合效果
   - 检查层权重变化

2. **使用 Animator Override Controller**
   - 创建 Animator Override Controller
   - 替换动画剪辑进行测试
   - 快速迭代动画效果

### 在游戏中测试

1. **构建 AssetBundle**
2. **放入游戏模型文件夹**
3. **在游戏中加载模型**
4. **测试各种动作和状态**
5. **观察动画播放是否正确**

### 常见问题排查

| 问题           | 可能原因               | 解决方案                   |
| -------------- | ---------------------- | -------------------------- |
| 攻击动画不播放 | MeleeAttack 层名称错误 | 确认层名称为 "MeleeAttack" |
| 攻击动画卡顿   | 权重过渡不平滑         | 检查动画长度和过渡设置     |
| 下身动画被影响 | Avatar Mask 配置错误   | 正确设置 Avatar Mask       |
| 动画不流畅     | 帧率问题或过渡时间过短 | 调整过渡时间和混合曲线     |

## 性能优化

:::warning 性能考虑
1. **限制层数量**：通常 2-4 层即可满足需求
2. **优化动画复杂度**：避免过于复杂的动画
3. **合理使用 Avatar Mask**：减少不必要的骨骼计算
4. **控制动画质量**：根据需要设置动画压缩质量
:::

## 相关文档

- [Bool 参数](/animator/bool-params)
- [Float 参数](/animator/float-params)
- [Int 参数](/animator/int-params)
- [Trigger 参数](/animator/trigger-params)
- [模型包结构](/creation/bundle-structure)