# 模型展示

本页面整理了部分模型，点击下方的头像可以跳转到对应的创意工坊链接。

<div class="model-stats">
  <div class="stat-card">
    <div class="stat-number">{{ totalModels }}</div>
    <div class="stat-label">总模组数</div>
  </div>
  <div class="stat-card" v-for="(count, category) in categoryStats" :key="category">
    <div class="stat-number">{{ count }}</div>
    <div class="stat-label">{{ category.toUpperCase() }}</div>
  </div>
</div>

## YSM模型

<ModelCard :models="modelsData.ysm" />

## 其他模型
<ModelCard :models="modelsData.others" />

<script setup>
import { ref, computed, onMounted } from 'vue'
import ModelCard from '../.vitepress/components/ModelCard.vue'
import modelsData from './models.json'

const models = ref(modelsData)

// 计算总模组数量
const totalModels = computed(() => {
  let total = 0
  for (const category in models.value) {
    total += models.value[category].length
  }
  return total
})

// 计算各分类数量
const categoryStats = computed(() => {
  const stats = {}
  for (const category in models.value) {
    stats[category] = models.value[category].length
  }
  return stats
})
</script>

<style scoped>
.model-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.stat-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--vp-c-brand);
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .model-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .stat-card {
    padding: 16px;
  }
  
  .stat-number {
    font-size: 28px;
  }
  
  .stat-label {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .model-stats {
    grid-template-columns: 1fr;
  }
}
</style>