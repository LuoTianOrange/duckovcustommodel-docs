<script setup lang="ts">
import { 
  Wrench,
  Box,
  Rocket,
  Palette,
  Package,
  Settings,
  Code,
  Download
} from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  title: string
  description: string
  icon?: string
  image?: string  // 可选的示例图片
  imageAlt?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'package',
  imageAlt: '示例图片'
})

// 图标映射
const iconMap: Record<string, any> = {
  'wrench': Wrench,
  'box': Box,
  'rocket': Rocket,
  'palette': Palette,
  'package': Package,
  'settings': Settings,
  'code': Code,
  'download': Download
}

const iconComponent = computed(() => iconMap[props.icon] || Package)
</script>

<template>
  <div class="tool-card">
    <div class="card-header">
      <component :is="iconComponent" :size="24" class="card-icon" />
      <h3 class="card-title">{{ title }}</h3>
    </div>
    
    <p class="card-description">{{ description }}</p>
    
    <div v-if="image" class="card-image">
      <img :src="image" :alt="imageAlt" />
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  height: 100%;
}

.tool-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px var(--vp-c-shadow-2);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card-icon {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.card-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-description {
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

.card-image {
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.tool-card:hover .card-image img {
  transform: scale(1.02);
}
</style>