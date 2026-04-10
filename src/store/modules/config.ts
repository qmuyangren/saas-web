import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const siteTitle = ref('管理系统')
  const siteLogo = ref('')
  const sidebarTheme = ref('dark')
  const locale = ref('zh-CN')

  const setSiteTitle = (title: string) => {
    siteTitle.value = title
    document.title = title
  }

  const setLocale = (l: string) => {
    locale.value = l
  }

  return {
    siteTitle,
    siteLogo,
    sidebarTheme,
    locale,
    setSiteTitle,
    setLocale,
  }
})
