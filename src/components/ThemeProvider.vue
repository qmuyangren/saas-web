<template>
  <slot />
</template>

<script setup lang="ts">
/**
 * 主题提供者组件 - ThemeProvider
 * 
 * 功能:
 * - 初始化主题系统
 * - 提供主题上下文
 * - 支持 SSR 安全
 */

import { useTheme } from '../styles/useTheme';

// 初始化主题
const theme = useTheme();

// 暴露主题 API 供子组件使用
defineExpose({
  theme,
});
</script>

<style scoped>
/* 主题提供者本身不需要样式 */
</style>
