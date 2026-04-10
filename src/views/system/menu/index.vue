<template>
  <div class="p-6">
    <a-card>
      <template #title>菜单管理</template>
      <template #extra>
        <a-button type="primary" @click="handleAdd">新增菜单</a-button>
      </template>
      <a-tree
        :tree-data="menuList"
        :default-expand-all="true"
        @select="handleSelect"
      >
        <template #title="{ title }">
          <span>{{ title }}</span>
        </template>
      </a-tree>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuList = ref([
  {
    key: '1',
    title: '仪表盘',
    children: [
      { key: '1-1', title: '工作台' },
    ],
  },
  {
    key: '2',
    title: '系统管理',
    children: [
      { key: '2-1', title: '用户管理' },
      { key: '2-2', title: '角色管理' },
      { key: '2-3', title: '菜单管理' },
    ],
  },
])

const handleSelect = (keys: any[]) => {
  console.log('Select:', keys)
}

const handleAdd = () => {}
</script>
