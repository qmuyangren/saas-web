<template>
  <a-tag :color="color">
    {{ text }}
  </a-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  status?: string
  text?: string
}>(), {
  status: '',
  text: '',
})

const colorMap: Record<string, string> = {
  active: 'green',
  inactive: 'red',
  suspended: 'orange',
  enabled: 'green',
  disabled: 'red',
}

const textMap: Record<string, string> = {
  active: '活跃',
  inactive: '禁用',
  suspended: '已冻结',
  enabled: '启用',
  disabled: '停用',
}

const color = computed(() => colorMap[props.status] || 'default')
const text = computed(() => props.text || textMap[props.status] || props.status)
</script>
