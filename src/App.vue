<template>
  <a-config-provider :locale="locale" :theme="currentTheme">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import { darkTheme, lightTheme } from '@/plugins/theme'

const appStore = useAppStore()
const userStore = useUserStore()

const locale = computed(() => {
  const currentLang = localStorage.getItem('lang') || 'zh-CN'
  return currentLang === 'en-US' ? enUS : zhCN
})

const currentTheme = computed(() => {
  return appStore.isDarkMode ? darkTheme : lightTheme
})

onMounted(() => {
  appStore.init()
  userStore.init()
})

watch(() => appStore.isDarkMode, (isDark) => {
  document.documentElement.classList.toggle('dark', isDark)
})
</script>

<style>
#app { min-height: 100vh; }
:root { --primary-color: #1890ff; }

.compact-mode .ant-layout-header { height: 56px !important; }
.compact-mode .action-icon { width: 36px !important; height: 36px !important; }
.content-white .pro-content { background: #fff !important; }

/* 全局暗色模式 */
.dark body { background: #000000; color: rgba(255,255,255,0.85); }
.dark .ant-layout { background: #000000; }
.dark .ant-layout-header { background: #141414; box-shadow: 0 1px 4px rgba(255,255,255,0.08); }
.dark .ant-layout-content { background: #141414; }
.dark .ant-layout-footer { background: #141414; color: rgba(255,255,255,0.45); }
.dark .ant-layout-sider { background: #141414 !important; }
.dark .ant-menu-light { background: #141414 !important; }
.dark .ant-menu-item { color: rgba(255,255,255,0.65); }
.dark .ant-menu-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.08); }
.dark .ant-menu-item-selected { color: #fff; background: #1890ff; }
.dark .ant-menu-submenu-title { color: rgba(255,255,255,0.65); }
.dark .ant-menu-submenu-title:hover { color: rgba(255,255,255,0.85); }
.dark .stat-card { background: #1f1f1f !important; }
.dark .ant-statistic-title { color: rgba(255,255,255,0.45); }
.dark .ant-statistic-content { color: rgba(255,255,255,0.85); }
.dark .ant-input, .dark .ant-input-affix-wrapper { background: #141414; border-color: #303030; color: rgba(255,255,255,0.85); }
.dark .ant-input:hover { border-color: #1890ff; }
.dark .ant-btn-default { background: #1f1f1f; border-color: #303030; color: rgba(255,255,255,0.65); }
.dark .ant-btn-default:hover { color: #1890ff; border-color: #1890ff; }
.dark .ant-dropdown-menu { background: #1f1f1f; }
.dark .ant-dropdown-menu-item { color: rgba(255,255,255,0.85); }
.dark .ant-dropdown-menu-item:hover { background: rgba(255,255,255,0.08); }
.dark .ant-divider { border-color: #303030; }
.dark .multi-tab { background: #141414; border-bottom-color: #303030; }
.dark .ant-drawer-content { background: #1f1f1f; }
.dark .ant-drawer-header { background: #1f1f1f; border-bottom-color: #303030; }
.dark .ant-modal-content { background: #1f1f1f; }
.dark .ant-modal-header { background: #1f1f1f; border-bottom-color: #303030; }
.dark .ant-modal-title { color: rgba(255,255,255,0.85); }
.dark .ant-popover-content { background: #1f1f1f; }
.dark .ant-table { background: #1f1f1f; }
.dark .ant-table-thead > tr > th { background: #1f1f1f; color: rgba(255,255,255,0.85); border-bottom-color: #303030; }
.dark .ant-table-tbody > tr:hover { background: rgba(255,255,255,0.08); }
.dark .ant-select-selector { background: #141414; border-color: #303030; color: rgba(255,255,255,0.85); }
.dark .ant-select-dropdown { background: #1f1f1f; }
.dark .ant-radio-button-wrapper { background: #141414; border-color: #303030; color: rgba(255,255,255,0.65); }
.dark .ant-radio-button-wrapper-checked { background: #1890ff; border-color: #1890ff; color: #fff; }
.dark .ant-badge-count { background: #ff4d4f; }
.dark .ant-badge-dot { background: #ff4d4f; }
.dark .ant-tag { background: #303030; border-color: transparent; color: rgba(255,255,255,0.85); }
.dark .ant-breadcrumb-separator { color: rgba(255,255,255,0.45); }
.dark .ant-breadcrumb-link { color: rgba(255,255,255,0.65); }
.dark ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
.dark ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
.dark ::-webkit-scrollbar-track { background: #141414; }
</style>
