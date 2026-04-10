<template>
  <a-modal v-bind="$attrs" :open="open" @update:open="$emit('update:open', $event)">
    <template #title><slot name="title" /></template>
    <slot />
    <template #footer>
      <slot name="footer">
        <a-button @click="$emit('update:open', false)">取消</a-button>
        <a-button type="primary" :loading="confirmLoading" @click="$emit('confirm')">确定</a-button>
      </slot>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
defineProps<{
  open?: boolean
  confirmLoading?: boolean
}>()
defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()
</script>
