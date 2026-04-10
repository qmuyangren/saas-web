<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    :items="menuItems"
    @click="handleClick"
    style="border-right: none"
  />
</template>

<script setup lang="ts">
import { h, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import type { MenuProps } from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue'
import type { Menu } from '@/store/modules/permission'

defineProps<{ collapsed: boolean }>()

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

// 递归渲染菜单
const renderMenuItems = (menus: Menu[]): MenuProps['items'] => {
  if (!menus || menus.length === 0) return []

  return menus
    .filter(menu => menu.enable)
    .map(menu => {
      const iconComponent = menu.icon ? Icons[menu.icon as keyof typeof Icons] : null
      const item: any = {
        key: menu.path,
        icon: iconComponent ? () => h(iconComponent) : undefined,
        label: menu.name,
        title: menu.name,
      }

      if (menu.children && menu.children.length > 0) {
        item.children = renderMenuItems(menu.children)
      }

      return item
    })
}

const menuItems = computed<MenuProps['items']>(() => {
  const menuList = userStore.getMenuList
  return renderMenuItems(menuList) || []
})

const handleClick = ({ key }: { key: string }) => {
  if (key && key.startsWith('/')) {
    router.push(key)
  }
}

// 监听路由变化，同步菜单选中状态
watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path]

    // 查找父级菜单并展开
    const findParent = (menus: Menu[], currentPath: string): string | null => {
      for (const menu of menus) {
        if (menu.children?.some(child => child.path === currentPath)) {
          return menu.path
        }
        if (menu.children) {
          const result = findParent(menu.children, currentPath)
          if (result) return result
        }
      }
      return null
    }

    const parentPath = findParent(userStore.getMenuList, path)
    openKeys.value = parentPath ? [parentPath] : []
  },
  { immediate: true }
)
</script>

<style scoped>
:deep(.ant-menu-dark) {
  background: #001529;
}

:deep(.ant-menu-inline-collapsed) {
  & > .ant-menu-item {
    text-align: center;
    padding: 0 !important;
  }
}
</style>
