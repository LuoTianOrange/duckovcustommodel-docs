<script setup lang="ts">
</script>

<template>
  <div class="tool-grid">
    <slot></slot>
  </div>
</template>

<style scoped>
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

@media (min-width: 768px) {
  .tool-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>