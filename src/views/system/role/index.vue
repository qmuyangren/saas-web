<template>
  <div class="p-6">
    <a-card>
      <template #title>角色管理</template>
      <template #extra>
        <a-button type="primary" @click="handleCreate">新增角色</a-button>
      </template>
      <a-table :columns="columns" :data-source="roleList" :loading="loading" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'green' : 'red'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
              <a-button type="link" size="small" @click="handlePermission(record)">权限</a-button>
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

const loading = ref(false)
const roleList = ref<any[]>([])

const columns = [
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '角色编码', dataIndex: 'code', key: 'code' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '状态', key: 'status', width: 80 },
  { title: '操作', key: 'action', width: 200 },
]

const fetchData = () => {
  roleList.value = [
    { id: '1', name: '超级管理员', code: 'super_admin', description: '拥有所有权限', status: 'active' },
    { id: '2', name: '管理员', code: 'admin', description: '管理所有用户', status: 'active' },
    { id: '3', name: '普通用户', code: 'user', description: '基本访问权限', status: 'active' },
  ]
}

const handleCreate = () => {}
const handleEdit = (_record: any) => {}
const handlePermission = (_record: any) => {}
const handleDelete = (_record: any) => {}

onMounted(fetchData)
</script>
