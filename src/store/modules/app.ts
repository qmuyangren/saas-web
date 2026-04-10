import { defineStore } from 'pinia'
import { PROJECT_CONFIG_KEY } from '@/constants'
import { Persistent } from '@/utils/cache'

export interface ProjectConfig {
  darkMode?: boolean
  pageLoading?: boolean
  showTags?: boolean
  showFooter?: boolean
  compactMode?: boolean
  contentBg?: string
  siteName?: string
}

export interface AppState {
  darkMode: boolean
  pageLoading: boolean
  collapsed: boolean
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    darkMode: false,
    pageLoading: false,
    collapsed: false,
    projectConfig: Persistent.getLocal(PROJECT_CONFIG_KEY),
  }),

  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },

    getPageLoading(): boolean {
      return this.pageLoading
    },

    getCollapsed(): boolean {
      return this.collapsed
    },

    isDarkMode(): boolean {
      return this.darkMode
    },
  },

  actions: {
    setProjectConfig(config: Partial<ProjectConfig>) {
      this.projectConfig = { ...this.projectConfig, ...config } as ProjectConfig
      Persistent.setLocal(PROJECT_CONFIG_KEY, this.projectConfig)
    },

    setPageLoading(loading: boolean) {
      this.pageLoading = loading
    },

    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed
    },

    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },

    setDarkMode(dark: boolean) {
      this.darkMode = dark
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    toggleTheme() {
      this.darkMode = !this.darkMode
      this.setDarkMode(this.darkMode)
    },

    resetState() {
      this.darkMode = false
      this.pageLoading = false
      this.collapsed = false
      this.projectConfig = null
      Persistent.clearLocal(PROJECT_CONFIG_KEY)
    },

    init() {
      const savedConfig = Persistent.getLocal(PROJECT_CONFIG_KEY) as ProjectConfig | null
      if (savedConfig) {
        this.projectConfig = savedConfig
        if (savedConfig.darkMode) {
          this.setDarkMode(true)
        }
      }
    },
  },
})

export function useAppStoreWithOut() {
  return useAppStore()
}
