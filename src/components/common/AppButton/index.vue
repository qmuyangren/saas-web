<template>
  <a-button :type="type" :size="size" :loading="loading" :disabled="disabled" v-bind="$attrs">
    <slot />
  </a-button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  size?: 'small' | 'middle' | 'large'
  loading?: boolean
  disabled?: boolean
}>()
</script>
