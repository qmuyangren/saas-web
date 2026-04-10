<template>
  <div class="fullscreen-trigger" @click="toggleFullscreen">
    <FullscreenOutlined v-if="!isFullscreen" />
    <FullscreenExitOutlined v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue'

const isFullscreen = ref(false)

const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      await document.exitFullscreen()
      isFullscreen.value = false
    }
  } catch (error) {
    console.error('Fullscreen error:', error)
  }
}
</script>

<style scoped>
.fullscreen-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.fullscreen-trigger:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1890ff;
}

.dark .fullscreen-trigger {
  color: rgba(255, 255, 255, 0.65);
}
.dark .fullscreen-trigger:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
