<template>
  <button
    class="theme-toggle"
    @click="handleToggle"
    :title="toggleButtonTitle"
    :aria-label="toggleButtonTitle"
  >
    <!-- 太阳图标 (暗色模式下显示) -->
    <svg
      v-if="theme.isDark.value"
      class="icon sun-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>

    <!-- 月亮图标 (明色模式下显示) -->
    <svg
      v-else
      class="icon moon-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
/**
 * 主题切换按钮组件
 */

import { useTheme } from '../styles/useTheme';

const theme = useTheme();

const toggleButtonTitle = '切换主题';

function handleToggle() {
  theme.toggleTheme();
}
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background-color: var(--bg-secondary);
  border-color: var(--color-primary-500);
  color: var(--color-primary-500);
}

.theme-toggle:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.icon {
  width: 20px;
  height: 20px;
}

.sun-icon,
.moon-icon {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
