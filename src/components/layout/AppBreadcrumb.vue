<template>
  <a-breadcrumb class="app-breadcrumb">
    <a-breadcrumb-item
      v-for="item in crumbs"
      :key="item.path"
    >
      <span v-if="!item.path" class="current">{{ item.title }}</span>
      <router-link v-else :to="item.path">{{ item.title }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const titleMap: Record<string, string> = {
  'dashboard': '仪表盘',
  'users': '用户管理',
  'system': '系统管理',
  'config': '系统配置',
  'role': '角色管理',
  'menu': '菜单管理',
}

const crumbs = computed(() => {
  const path = route.path
  if (path === '/login' || path === '/404') return []
  
  const parts = path.split('/').filter(Boolean)
  const result: { path: string; title: string }[] = []
  
  let currentPath = ''
  for (let i = 0; i < parts.length; i++) {
    currentPath += '/' + parts[i]
    result.push({
      path: i === parts.length - 1 ? '' : currentPath,
      title: titleMap[parts[i]] || parts[i].charAt(0).toUpperCase() + parts[i].slice(1),
    })
  }
  
  return result
})
</script>

<style scoped>
.app-breadcrumb {
  display: flex;
  align-items: center;
}

:deep(.ant-breadcrumb-link) {
  color: rgba(0, 0, 0, 0.65);
}

:deep(.ant-breadcrumb-separator) {
  color: rgba(0, 0, 0, 0.45);
}

:deep(a) {
  color: rgba(0, 0, 0, 0.65);
  transition: color 0.2s;
}

:deep(a:hover) {
  color: #1890ff;
}

.current {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}

.dark :deep(.ant-breadcrumb-link) {
  color: rgba(255, 255, 255, 0.65);
}
.dark :deep(.ant-breadcrumb-separator) {
  color: rgba(255, 255, 255, 0.45);
}
.dark :deep(a) {
  color: rgba(255, 255, 255, 0.65);
}
.dark .current {
  color: rgba(255, 255, 255, 0.85);
}
</style>
