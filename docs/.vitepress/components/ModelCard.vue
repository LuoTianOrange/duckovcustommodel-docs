<template>
  <div class="model-grid">
    <a 
      v-for="model in models" 
      :key="model.id" 
      :href="model.url" 
      target="_blank"
      class="model-card"
    >
      <div class="model-image-container">
        <img :src="model.image" class="model-image" />
      </div>
      <div class="model-tags" v-if="model.tag && model.tag.length > 0">
        <span v-for="tag in model.tag" :key="tag" class="model-tag">
          {{ tag }}
        </span>
      </div>
      <div class="model-name">{{ model.name }}</div>
      <div class="model-ids" v-if="model.modelID && model.modelID.length > 0">
        <span 
          v-for="id in model.modelID" 
          :key="id" 
          class="model-id"
        >
          #{{ id }}
        </span>
      </div>
    </a>
  </div>
</template>

<script setup>
defineProps({
  models: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.model-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.model-card {
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.model-card:hover {
  transform: translateY(-4px);
}

.model-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.model-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.model-card:hover .model-image {
  transform: scale(1.05);
}

.model-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: 8px;
  min-height: 20px;
}

.model-tag {
  display: inline-block;
  padding: 1px 6px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.model-name {
  margin-top: 4px;
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.model-card:hover .model-name {
  color: var(--vp-c-brand);
}

.model-ids {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  margin-top: 4px;
}

.model-id {
  display: inline-block;
  padding: 1px 5px;
  background: rgba(var(--vp-c-default-1), 0.1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  /* font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; */
  letter-spacing: 0.3px;
  line-height: 16px;
  transition: all 0.2s ease;
}

/* .model-card:hover .model-id {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-dark);
  transform: translateY(-1px);
} */

/* 深色模式适配 */
html.dark .model-id {
  background: rgba(255, 255, 255, 0.05);
  color: var(--vp-c-text-2);
}

html.dark .model-card:hover .model-id {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-lighter);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .model-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .model-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .model-id {
    padding: 1px 4px;
    font-size: 9px;
    line-height: 14px;
  }
  
  .model-tag {
    padding: 1px 5px;
    font-size: 11px;
    line-height: 16px;
  }
}

@media (max-width: 480px) {
  .model-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>