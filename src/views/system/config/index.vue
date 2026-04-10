<template>
  <div class="p-6">
    <a-card>
      <template #title>系统配置</template>
      <a-alert message="功能开发中..." type="info" style="margin-bottom: 16px" />
      <a-table :columns="columns" :data-source="mockData" :loading="loading" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'type'">
            <a-tag :color="getTypeColor(record.type)">{{ record.type }}</a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const mockData = ref([
  { id: '1', key: 'site_name', value: '管理系统', type: 'string', description: '站点名称' },
  { id: '2', key: 'site_logo', value: '/logo.png', type: 'string', description: '站点 Logo' },
  { id: '3', key: 'max_upload_size', value: '10', type: 'number', description: '最大上传文件大小 (MB)' },
  { id: '4', key: 'enable_register', value: 'true', type: 'boolean', description: '是否开启注册' },
])

const columns = [
  { title: '配置键', dataIndex: 'key', key: 'key' },
  { title: '配置值', dataIndex: 'value', key: 'value' },
  { title: '类型', key: 'type', width: 100 },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '操作', key: 'action', width: 150 },
]

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = { string: 'blue', number: 'green', boolean: 'orange', json: 'purple' }
  return colors[type] || 'default'
}

const handleEdit = (_record: any) => {
  message.info('编辑功能开发中')
}

const handleDelete = async (record: any) => {
  mockData.value = mockData.value.filter(item => item.id !== record.id)
  message.success('删除成功')
}

onMounted(() => {
  loading.value = false
})
</script>
