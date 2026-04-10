<template>
  <a-card v-bind="$attrs" :bordered="bordered" :hoverable="hoverable">
    <template v-if="$slots.title" #title><slot name="title" /></template>
    <template v-if="$slots.extra" #extra><slot name="extra" /></template>
    <slot />
  </a-card>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  bordered?: boolean
  hoverable?: boolean
}>(), {
  bordered: true,
  hoverable: false,
})
</script>
