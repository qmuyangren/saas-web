# ProTable 使用示例

## 基础用法

```vue
<template>
  <ProTable
    :columns="columns"
    :data-source="dataSource"
    :loading="loading"
    @change="handleChange"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ProTable from '@/components/common/ProTable'
import type { ProTableColumn } from '@/components/common/ProTable'

const loading = ref(false)
const dataSource = ref([])

const columns: ProTableColumn[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
    filterable: true,
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    customRender: (record) => {
      return record.status === 1 ? '启用' : '禁用'
    },
  },
]

const handleChange = (pagination, filters, sorter) => {
  console.log('表格变化', pagination, filters, sorter)
}

const handleEdit = (record) => {
  console.log('编辑', record)
}

const handleDelete = (record) => {
  console.log('删除', record)
}
</script>
```

## 自定义列

```vue
<template>
  <ProTable :columns="columns" :data-source="dataSource">
    <!-- 自定义状态列 -->
    <template #status="{ record }">
      <a-tag :color="record.status === 1 ? 'green' : 'red'">
        {{ record.status === 1 ? '启用' : '禁用' }}
      </a-tag>
    </template>

    <!-- 自定义操作列 -->
    <template #action="{ record }">
      <a-space>
        <a-button type="link" size="small" @click="handleView(record)">
          查看
        </a-button>
        <a-button type="link" size="small" @click="handleEdit(record)">
          编辑
        </a-button>
      </a-space>
    </template>
  </ProTable>
</template>

<script setup lang="ts">
const columns = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
  },
  {
    key: 'status',
    title: '状态',
    slot: 'status', // 使用自定义插槽
  },
  {
    key: 'action',
    title: '操作',
    slot: 'action',
  },
]
</script>
```

## 远程数据加载

```vue
<template>
  <ProTable
    :columns="columns"
    :data-source="tableData"
    :loading="loading"
    :pagination="pagination"
    @change="handleTableChange"
    @refresh="handleRefresh"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getUserList } from '@/api/user'

const loading = ref(false)
const tableData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
})

const handleTableChange = async (pag, filters, sorter) => {
  loading.value = true
  try {
    const res = await getUserList({
      current: pag.current,
      pageSize: pag.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    })
    tableData.value = res.list
    pagination.total = res.total
  } finally {
    loading.value = false
  }
}

const handleRefresh = () => {
  handleTableChange(pagination, {}, {})
}
</script>
```

## 筛选栏

```vue
<template>
  <ProTable :columns="columns" :data-source="dataSource" show-filter>
    <!-- 自定义筛选栏 -->
    <template #filter>
      <a-form layout="inline">
        <a-form-item label="姓名">
          <a-input v-model:value="filters.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="filters.status" placeholder="请选择状态">
            <a-select-option value="1">启用</a-select-option>
            <a-select-option value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch">搜索</a-button>
          <a-button @click="handleReset" style="margin-left: 8px">重置</a-button>
        </a-form-item>
      </a-form>
    </template>
  </ProTable>
</template>
```

## 导出功能

```vue
<template>
  <ProTable
    :columns="columns"
    :data-source="dataSource"
    show-export
    @export="handleExport"
  />
</template>

<script setup lang="ts">
import { exportToExcel } from '@/utils/export'

const handleExport = () => {
  exportToExcel(dataSource.value, '表格数据.xlsx')
}
</script>
```
