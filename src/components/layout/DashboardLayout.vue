<template>
  <a-layout class="dashboard-layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      theme="dark"
      width="256"
      :collapsedWidth="80"
      :trigger="null"
    >
      <div class="logo">
        <AppstoreOutlined class="logo-icon" />
        <h1 v-if="!collapsed">{{ appTitle }}</h1>
      </div>
      <AppMenu :collapsed="collapsed" />
    </a-layout-sider>

    <!-- 主内容区 -->
    <a-layout>
      <!-- Header -->
      <a-layout-header class="header">
        <AppHeader
          :collapsed="collapsed"
          :is-dark="appStore.isDarkMode"
          @toggle="toggleCollapsed"
        />
      </a-layout-header>

      <!-- 标签页 -->
      <div v-if="showTags" class="multi-tab">
        <AppTabs />
      </div>

      <!-- 内容区 -->
      <a-layout-content class="content">
        <a-spin :spinning="appStore.pageLoading">
          <router-view v-slot="{ Component, route }">
            <transition
              v-if="enableTransition"
              name="fade-slide"
              mode="out-in"
              appear
            >
              <component :is="Component" :key="route.fullPath" />
            </transition>
            <component v-else :is="Component" :key="route.fullPath" />
          </router-view>
        </a-spin>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer v-if="showFooter" class="footer">
        <AppFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { AppstoreOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/store/modules/app'
import {
  AppMenu,
  AppHeader,
  AppTabs,
  AppFooter,
} from '@/components/layout'

const appStore = useAppStore()
const collapsed = ref(false)
const showTags = ref(true)
const showFooter = ref(true)
const enableTransition = ref(true)

const appTitle = computed(() => {
  return appStore.getProjectConfig?.siteName || '管理系统'
})

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

onMounted(() => {
  const savedSettings = localStorage.getItem('project_config')
  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings)
      showTags.value = settings.showTags ?? true
      showFooter.value = settings.showFooter ?? true
    } catch (e) {
      console.error('Parse settings failed:', e)
    }
  }
})
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
}

/* Logo */
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 24px;
  overflow: hidden;
  background: #001529;
}

.logo-icon {
  font-size: 28px;
  color: #1890ff;
}

.logo h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

/* Header */
.header {
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* Multi-tab */
.multi-tab {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

/* Content */
.content {
  margin: 0;
  padding: 12px;
  background: #f0f2f5;
  min-height: calc(100vh - 150px);
}

/* Footer */
.footer {
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
}

/* Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 侧边栏统一深色背景 */
:deep(.ant-layout-sider) {
  background: #001529;
}

:deep(.ant-menu-dark) {
  background: #001529;
}

/* 暗色模式 */
.dark .header {
  background: #141414;
  box-shadow: 0 1px 4px rgba(255, 255, 255, 0.08);
}

.dark .multi-tab {
  background: #141414;
  border-bottom-color: #303030;
}

.dark .content {
  background: #000000;
}

.dark .footer {
  color: rgba(255, 255, 255, 0.45);
}
</style>
