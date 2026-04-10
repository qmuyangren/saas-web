<template>
  <a-input v-bind="$attrs" :value="modelValue" @update:value="$emit('update:modelValue', $event)">
    <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
    <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
  </a-input>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
}>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
