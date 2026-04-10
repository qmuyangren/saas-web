<template>
  <div class="pro-table">
    <!-- 工具栏 -->
    <div class="pro-table-toolbar" v-if="$slots.toolbar || showToolbar">
      <slot name="toolbar">
        <a-space>
          <a-input
            v-model:value="searchValue"
            placeholder="搜索..."
            allow-clear
            @search="handleSearch"
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
          <a-button @click="handleRefresh">
            <template #icon><ReloadOutlined /></template>
            刷新
          </a-button>
          <a-button @click="handleExport" v-if="showExport">
            <template #icon><ExportOutlined /></template>
            导出
          </a-button>
        </a-space>
      </slot>
    </div>

    <!-- 筛选栏 -->
    <div class="pro-table-filter" v-if="$slots.filter || showFilter">
      <slot name="filter" />
    </div>

    <!-- 表格 -->
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="paginationConfig"
      :row-key="rowKey"
      :scroll="scroll"
      @change="handleTableChange"
    >
      <!-- 自定义列插槽 -->
      <template
        v-for="slot in customSlots"
        :key="slot"
        #[slot]="{ record, index, column }"
      >
        <slot :name="slot" :record="record" :index="index" :column="column" />
      </template>

      <!-- 操作列 -->
      <template #action="{ record, index }" v-if="showAction">
        <slot name="action" :record="record" :index="index">
          <a-space>
            <a-button type="link" size="small" @click="handleEdit(record)">
              编辑
            </a-button>
            <a-popconfirm
              title="确定删除吗？"
              @confirm="handleDelete(record)"
            >
              <a-button type="link" size="small" danger>
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </slot>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import {
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
} from '@ant-design/icons-vue'
import type { PropType } from 'vue'

// Props
interface ColumnType {
  key: string
  title: string
  dataIndex?: string
  sortable?: boolean
  filterable?: boolean
  width?: number | string
  customRender?: (record: any) => any
}

interface PaginationConfig {
  current: number
  pageSize: number
  total: number
  showSizeChanger: boolean
  showQuickJumper: boolean
  pageSizeOptions: string[]
}

const props = defineProps({
  // 列配置
  columns: {
    type: Array as PropType<ColumnType[]>,
    required: true,
  },
  // 数据源
  dataSource: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  // 分页配置
  pagination: {
    type: [Boolean, Object] as PropType<boolean | Partial<PaginationConfig>>,
    default: true,
  },
  // 行键
  rowKey: {
    type: String,
    default: 'id',
  },
  // 显示工具栏
  showToolbar: {
    type: Boolean,
    default: true,
  },
  // 显示筛选栏
  showFilter: {
    type: Boolean,
    default: false,
  },
  // 显示导出
  showExport: {
    type: Boolean,
    default: true,
  },
  // 显示操作列
  showAction: {
    type: Boolean,
    default: true,
  },
  // 表格滚动配置
  scroll: {
    type: Object as PropType<{ x?: number | string; y?: number | string }>,
    default: () => ({ x: 'max-content' }),
  },
})

// Emits
const emit = defineEmits<{
  (e: 'search', value: string): void
  (e: 'refresh'): void
  (e: 'export'): void
  (e: 'change', pagination: any, filters: any, sorter: any): void
  (e: 'edit', record: any): void
  (e: 'delete', record: any): void
}>()

// 自定义插槽
const customSlots = computed(() => {
  return props.columns
    .filter((col) => col.customRender)
    .map((col) => col.key)
})

// 搜索值
const searchValue = ref('')

// 分页配置
const paginationConfig = computed<PaginationConfig>(() => {
  if (props.pagination === false) {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: false,
      showQuickJumper: false,
      pageSizeOptions: [],
    }
  }

  const defaultConfig: PaginationConfig = {
    current: 1,
    pageSize: 10,
    total: props.dataSource.length,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  }

  if (typeof props.pagination === 'object') {
    return {
      ...defaultConfig,
      ...props.pagination,
    }
  }

  return defaultConfig
})

// 搜索处理
const handleSearch = () => {
  emit('search', searchValue.value)
}

// 刷新处理
const handleRefresh = () => {
  emit('refresh')
}

// 导出处理
const handleExport = () => {
  emit('export')
}

// 表格变化处理
const handleTableChange = (
  pagination: any,
  filters: any,
  sorter: any
) => {
  emit('change', pagination, filters, sorter)
}

// 编辑处理
const handleEdit = (record: any) => {
  emit('edit', record)
}

// 删除处理
const handleDelete = (record: any) => {
  emit('delete', record)
}

// 暴露方法
defineExpose({
  handleRefresh,
  handleExport,
})
</script>

<style scoped lang="scss">
.pro-table {
  &-toolbar {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-filter {
    margin-bottom: 16px;
    padding: 16px;
    background: #fafafa;
    border-radius: 4px;
  }
}
</style>
