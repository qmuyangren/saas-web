<template>
  <a-table v-bind="$attrs" :pagination="false">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </a-table>
  <div v-if="showPagination" class="flex justify-end mt-4">
    <a-pagination
      v-model:current="currentPage"
      v-model:page-size="currentPageSize"
      :total="total"
      :show-size-changer="showSizeChanger"
      :show-quick-jumper="showQuickJumper"
      :show-total="(t: number) => `共 ${t} 条`"
      @change="$emit('page-change', currentPage, currentPageSize)"
      @show-size-change="$emit('page-change', currentPage, currentPageSize)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  total?: number
  currentPage?: number
  pageSize?: number
  showPagination?: boolean
  showSizeChanger?: boolean
  showQuickJumper?: boolean
}>(), {
  total: 0,
  currentPage: 1,
  pageSize: 20,
  showPagination: true,
  showSizeChanger: true,
  showQuickJumper: true,
})

const emit = defineEmits<{
  'page-change': [page: number, pageSize: number]
}>()

const currentPage = computed({
  get: () => props.currentPage,
  set: (v: number) => emit('page-change', v, props.pageSize),
})

const currentPageSize = computed({
  get: () => props.pageSize,
  set: (v: number) => emit('page-change', props.currentPage, v),
})
</script>
