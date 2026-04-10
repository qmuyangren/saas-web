<template>
  <a-form layout="inline" class="mb-4" @submit.prevent="$emit('search', formData ?? {})">
    <slot :form-data="formData" />
    <a-form-item>
      <a-space>
        <a-button type="primary" html-type="submit">搜索</a-button>
        <a-button @click="$emit('reset')">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
defineProps<{
  formData?: Record<string, unknown>
}>()
defineEmits<{
  search: [data: Record<string, unknown>]
  reset: []
}>()
</script>
