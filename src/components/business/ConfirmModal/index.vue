<template>
  <a-modal
    v-model:open="visible"
    :title="title"
    :width="width"
    :confirm-loading="confirmLoading"
    @ok="$emit('confirm')"
    @cancel="visible = false"
  >
    <slot />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  title?: string
  width?: number | string
  confirmLoading?: boolean
}>(), {
  title: '确认',
  width: 520,
  confirmLoading: false,
})

defineEmits<{
  confirm: []
}>()

const visible = ref(false)
</script>
