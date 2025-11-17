<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const offlineReady = ref(false)
function onOfflineReady() {
  offlineReady.value = true
}
async function close() {
  offlineReady.value = false
}

onBeforeMount(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({
    immediate: true,
    onOfflineReady,
    onRegistered() {
      console.info('Service Worker registered')
    },
    onRegisterError(e) {
      console.error('Service Worker registration error!', e)
    },
  })
})
</script>

<template>
  <template v-if="offlineReady">
    <div class="pwa-toast" role="alertdialog" aria-labelledby="pwa-message">
      <div id="pwa-message" class="mb-3">
        网页应用已缓存，可以离线使用
      </div>
      <button type="button" class="pwa-cancel" @click="close">
        关闭
      </button>
    </div>
  </template>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  z-index: 100;
  text-align: left;
  box-shadow: var(--vp-shadow-3);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: background-color 0.5s, color 0.5s, border-color 0.5s;
}

.pwa-toast #pwa-message {
  margin-bottom: 8px;
}

.pwa-toast button {
  border: 1px solid var(--vp-c-divider);
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background-color 0.25s, border-color 0.25s;
}

.pwa-toast button:hover {
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
}
</style>