<template>
  <a-pagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="total"
    :show-size-changer="showSizeChanger"
    :show-quick-jumper="showQuickJumper"
    :show-total="(t: number) => `共 ${t} 条`"
    @change="$emit('change', current, pageSize)"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  current?: number
  pageSize?: number
  total?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
}>(), {
  current: 1,
  pageSize: 20,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
})

defineEmits<{
  change: [page: number, pageSize: number]
}>()
</script>
