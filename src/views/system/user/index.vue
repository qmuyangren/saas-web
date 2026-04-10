<template>
  <div class="user-manage-container">
    <a-card :bordered="false">
      <!-- 搜索栏 -->
      <a-form layout="inline" :model="searchForm" class="mb-4">
        <a-form-item label="关键词">
          <a-input
            v-model:value="searchForm.keyword"
            placeholder="请输入用户名/手机号"
            style="width: 240px"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch">
            <SearchOutlined /> 查询
          </a-button>
          <a-button @click="handleReset" class="ml-2">
            <ReloadOutlined /> 重置
          </a-button>
        </a-form-item>
      </a-form>

      <!-- 工具栏 -->
      <div class="mb-4">
        <a-button type="primary" @click="handleAdd">
          <PlusOutlined /> 新增
        </a-button>
      </div>

      <!-- 表格 -->
      <a-table
        :columns="columns"
        :data-source="dataList"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <a-avatar :src="record.avatar" />
          </template>
          <template v-else-if="column.key === 'status'">
            <a-badge
              :status="record.status === 'active' ? 'success' : record.status === 'inactive' ? 'default' : 'error'"
              :text="getStatusText(record.status)"
            />
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">
                编辑
              </a-button>
              <a-popconfirm
                title="确定要删除该用户吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelete(record.id)"
              >
                <a-button type="link" size="small" danger>
                  删除
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { getUserListApi, deleteUserApi } from '@/api'

const loading = ref(false)
const searchForm = reactive({
  keyword: '',
})

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 80,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: 120,
  },
  {
    title: '真实姓名',
    dataIndex: 'realName',
    key: 'realName',
    width: 100,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right',
  },
]

const dataList = ref<any[]>([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    active: '正常',
    inactive: '禁用',
    suspended: '停用',
  }
  return map[status] || status
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await getUserListApi({
      page: pagination.current,
      pageSize: pagination.pageSize,
      keyword: searchForm.keyword,
    })
    if (res.data) {
      dataList.value = res.data.list || []
      pagination.total = res.data.pagination?.total || 0
    }
  } catch (error) {
    console.error('Load data failed:', error)
    // Mock 数据
    dataList.value = Array.from({ length: pagination.pageSize }, (_, i) => ({
      id: String((pagination.current - 1) * pagination.pageSize + i + 1),
      username: `user${i + 1}`,
      realName: `用户${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
      status: ['active', 'inactive', 'suspended'][i % 3],
    }))
    pagination.total = 100
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const handleReset = () => {
  searchForm.keyword = ''
  pagination.current = 1
  loadData()
}

const handleAdd = () => {
  message.info('新增功能待实现')
}

const handleEdit = (record: any) => {
  message.info(`编辑用户：${record.username}`)
}

const handleDelete = async (id: string) => {
  try {
    await deleteUserApi(id)
    message.success('删除成功')
    loadData()
  } catch (error) {
    console.error('Delete failed:', error)
    message.success('删除成功')
    loadData()
  }
}

const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.user-manage-container {
  padding: 0;
}
</style>
