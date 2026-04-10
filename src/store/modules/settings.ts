import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SettingItem {
  key: string
  label: string
  type: 'switch' | 'select' | 'slider'
  value: any
  options?: any[]
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<SettingItem[]>([
    { key: 'showTags', label: '显示标签页', type: 'switch', value: true },
    { key: 'showBreadcrumb', label: '显示面包屑', type: 'switch', value: true },
    { key: 'showFooter', label: '显示页脚', type: 'switch', value: true },
    { key: 'compactMode', label: '紧凑模式', type: 'switch', value: false },
    { key: 'fontSize', label: '字体大小', type: 'select', value: 'medium', options: [
      { label: '小', value: 'small' },
      { label: '中', value: 'medium' },
      { label: '大', value: 'large' },
    ]},
    { key: 'sidebarWidth', label: '侧边栏宽度', type: 'slider', value: 240, options: [
      { label: '窄', value: 200 },
      { label: '中', value: 240 },
      { label: '宽', value: 280 },
    ]},
  ])
  
  const updateSetting = (key: string, value: any) => {
    const setting = settings.value.find(s => s.key === key)
    if (setting) setting.value = value
  }
  
  const resetSettings = () => {
    settings.value.forEach(s => {
      if (s.key === 'showTags') s.value = true
      if (s.key === 'showBreadcrumb') s.value = true
      if (s.key === 'showFooter') s.value = true
      if (s.key === 'compactMode') s.value = false
      if (s.key === 'fontSize') s.value = 'medium'
      if (s.key === 'sidebarWidth') s.value = 240
    })
  }
  
  return {
    settings,
    updateSetting,
    resetSettings,
  }
})
