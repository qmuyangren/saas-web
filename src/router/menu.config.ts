import type { Component } from 'vue'
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  ToolOutlined,
  TeamOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'

export interface MenuItem {
  key: string
  title: string
  icon: Component
  children?: MenuItem[]
}

// 菜单配置
export const menuData: MenuItem[] = [
  {
    key: '/dashboard',
    title: '仪表盘',
    icon: DashboardOutlined,
  },
  {
    key: '/users',
    title: '用户管理',
    icon: UserOutlined,
  },
  {
    key: 'system',
    title: '系统管理',
    icon: SettingOutlined,
    children: [
      {
        key: '/system/config',
        title: '系统配置',
        icon: ToolOutlined,
      },
      {
        key: '/system/role',
        title: '角色管理',
        icon: TeamOutlined,
      },
      {
        key: '/system/menu',
        title: '菜单管理',
        icon: AppstoreOutlined,
      },
    ],
  },
]

// 根据路径获取父级菜单 key
export function getParentMenuKey(path: string): string | undefined {
  return menuData.find(item => item.children?.some(c => c.key === path))?.key
}

// 获取所有扁平化的菜单项
export function getAllMenuItems(): MenuItem[] {
  const items: MenuItem[] = []
  
  function traverse(items: MenuItem[]) {
    items.forEach(item => {
      items.push(item)
      if (item.children) {
        traverse(item.children)
      }
    })
  }
  
  traverse(menuData)
  return items
}
