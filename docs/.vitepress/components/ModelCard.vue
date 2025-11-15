<template>
  <div class="model-grid">
    <a 
      v-for="model in models" 
      :key="model.id" 
      :href="model.url" 
      target="_blank"
      class="model-card"
    >
      <img :src="model.image" class="model-image" />
      <div class="model-tags" v-if="model.tag && model.tag.length > 0">
        <span v-for="tag in model.tag" :key="tag" class="model-tag">
          {{ tag }}
        </span>
      </div>
      <div class="model-name">{{ model.name }}</div>
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

.model-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.model-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: 8px;
  min-height: 24px;
}

.model-tag {
  display: inline-block;
  padding: 2px 8px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
}

.model-name {
  margin-top: 4px;
  font-weight: 500;
}

.model-card:hover .model-name {
  color: var(--vp-c-brand);
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
}

@media (max-width: 480px) {
  .model-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>