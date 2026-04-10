<template>
  <a-avatar :src="src" :size="size">
    {{ fallbackText }}
  </a-avatar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  src?: string
  size?: number | 'small' | 'default' | 'large'
  name?: string
}>(), {
  size: 'default',
  name: '',
})

const fallbackText = computed(() => {
  if (!props.src && props.name) {
    return props.name.charAt(0).toUpperCase()
  }
  return ''
})
</script>
