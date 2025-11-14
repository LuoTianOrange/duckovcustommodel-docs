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

.model-name {
  margin-top: 8px;
}

.model-card:hover .model-name {
  color: cornflowerblue;
  text-decoration: underline;
}

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
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>