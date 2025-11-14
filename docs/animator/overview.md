# 动画器参数概述

自定义模型 Prefab 需要包含 `Animator` 组件，并配置相应的 Animator Controller。

## 参数类型

Animator Controller 支持以下类型的参数：

| 类型        | 说明   | 用途                                       |
| ----------- | ------ | ------------------------------------------ |
| **Bool**    | 布尔值 | 控制状态切换（如是否在地面、是否死亡）     |
| **Float**   | 浮点数 | 控制连续变化的值（如移动速度、生命值比率） |
| **Int**     | 整数   | 控制枚举状态（如手部状态、射击模式）       |
| **Trigger** | 触发器 | 触发一次性动作（如攻击、射击）             |

## 参数使用说明

::: info
模型不需要使用所有参数，只需要根据需求配置相关参数。未使用的参数不会影响模型功能。
:::

## 参数更新机制

1. 模组会自动读取游戏状态并更新 Animator 参数
2. 移动、跳跃、冲刺等状态会实时同步到自定义模型的 Animator
3. 攻击、装弹等动作会触发相应的动画参数
4. 当角色持有枪械时，会自动订阅相关事件更新参数

## 快速导航

- [Bool 参数](/animator/bool-params) - 布尔类型参数列表
- [Float 参数](/animator/float-params) - 浮点类型参数列表
- [Int 参数](/animator/int-params) - 整数类型参数列表
- [Trigger 参数](/animator/trigger-params) - 触发器类型参数列表
- [动画层配置](/animator/layers) - 可选动画层说明

## 相关文档

- [模型包结构](/creation/bundle-structure)
- [定位锚点](/creation/locators)