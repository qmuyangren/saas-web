import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Component } from 'vue'

export interface TabItem {
  path: string
  title: string
  affix: boolean
  icon: Component
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([
    { path: '/dashboard', title: '仪表盘', affix: true, icon: null as any },
  ])
  const activeTab = ref('/dashboard')

  const addTab = (path: string, title: string, icon?: any) => {
    const exists = tabs.value.find(t => t.path === path)
    if (!exists) {
      tabs.value.push({ path, title, affix: path === '/dashboard', icon: icon || null })
    }
    activeTab.value = path
  }

  const switchTab = (path: string) => {
    activeTab.value = path
  }

  const closeTab = (path: string) => {
    const index = tabs.value.findIndex(t => t.path === path)
    if (index > -1 && !tabs.value[index].affix) {
      tabs.value.splice(index, 1)
      if (activeTab.value === path && tabs.value.length > 0) {
        activeTab.value = tabs.value[Math.max(0, index - 1)].path
      }
    }
  }

  const closeOtherTabs = () => {
    tabs.value = tabs.value.filter(t => t.affix || t.path === activeTab.value)
  }

  const closeAllTabs = () => {
    tabs.value = tabs.value.filter(t => t.affix)
    activeTab.value = '/dashboard'
  }

  return { tabs, activeTab, addTab, switchTab, closeTab, closeOtherTabs, closeAllTabs }
})
