import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface LangItem {
  key: string
  label: string
  flag: string
}

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref('zh-CN')
  
  const languages = ref<LangItem[]>([
    { key: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
    { key: 'en-US', label: 'English', flag: '🇺🇸' },
    { key: 'zh-TW', label: '繁體中文', flag: '🇭🇰' },
    { key: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  ])
  
  const setLang = (lang: string) => {
    currentLang.value = lang
    localStorage.setItem('lang', lang)
  }
  
  const init = () => {
    const saved = localStorage.getItem('lang')
    if (saved && languages.value.find(l => l.key === saved)) {
      currentLang.value = saved
    }
  }
  
  return {
    currentLang,
    languages,
    setLang,
    init,
  }
})
