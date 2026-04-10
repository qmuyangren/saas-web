<template>
  <a-tag :color="color">
    {{ text }}
  </a-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  role?: string
  text?: string
}>(), {
  role: '',
  text: '',
})

const colorMap: Record<string, string> = {
  super_admin: 'red',
  admin: 'orange',
  manager: 'blue',
  user: 'green',
}

const textMap: Record<string, string> = {
  super_admin: '超级管理员',
  admin: '管理员',
  manager: '经理',
  user: '普通用户',
}

const color = computed(() => colorMap[props.role] || 'default')
const text = computed(() => props.text || textMap[props.role] || props.role)
</script>
