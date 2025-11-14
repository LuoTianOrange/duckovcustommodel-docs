# 模型下载
整理了部分模型，点击下方的头像可以跳转到对应的创意工坊链接。

## YSM模型

<ModelCard :models="modelsData.ysm" />

## 其他模型
<ModelCard :models="modelsData.others" />

<script setup>
import ModelCard from '../.vitepress/components/ModelCard.vue'
import modelsData from './models.json'
</script>