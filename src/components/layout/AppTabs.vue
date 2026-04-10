<template>
  <div class="app-tabs">
    <div class="tabs-wrapper" @contextmenu.prevent>
      <div v-for="tab in tabs" :key="tab.path" class="tab-item"
        :class="{ active: activeTab === tab.path, affix: tab.affix }"
        @click="switchTab(tab.path)" @contextmenu.prevent="(e) => showContextMenu(e, tab)" @wheel.prevent="handleWheel">
        <span class="tab-icon" :class="{ 'single-icon': tab.affix }">
          <component :is="tab.icon" />
        </span>
        <span class="tab-title" v-if="!tab.affix">{{ tab.title }}</span>
        <span v-if="!tab.affix" class="close-icon" @click.stop="closeTab(tab.path)"><CloseOutlined /></span>
      </div>
    </div>
    <div class="tabs-reload" @click="reloadCurrent" title="重新加载"><ReloadOutlined /></div>
    <a-dropdown v-model:open="dropdownVisible" :trigger="['click']">
      <div class="tabs-dropdown" title="更多操作"><DownOutlined /></div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="reload" @click="reloadCurrent"><template #icon><ReloadOutlined /></template>重新加载</a-menu-item>
          <a-menu-divider />
          <a-menu-item key="close" @click="closeCurrent" :disabled="currentTab?.affix"><template #icon><CloseOutlined /></template>关闭标签</a-menu-item>
          <a-menu-item key="left" @click="closeLeft" :disabled="isFirstTab"><template #icon><ArrowLeftOutlined /></template>关闭左侧</a-menu-item>
          <a-menu-item key="right" @click="closeRight" :disabled="isLastTab"><template #icon><ArrowRightOutlined /></template>关闭右侧</a-menu-item>
          <a-menu-item key="other" @click="closeOther" :disabled="tabs.length <= 2"><template #icon><ColumnWidthOutlined /></template>关闭其它</a-menu-item>
          <a-menu-item key="all" @click="closeAll"><template #icon><CloseOutlined /></template>关闭所有</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <div v-if="contextMenu.visible" class="context-menu" :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }">
      <a-menu>
        <a-menu-item key="reload" @click="handleMenuAction('reload')"><template #icon><ReloadOutlined /></template>重新加载</a-menu-item>
        <a-menu-divider />
        <a-menu-item key="close" @click="handleMenuAction('close')" :disabled="contextMenuTab?.affix"><template #icon><CloseOutlined /></template>关闭标签</a-menu-item>
        <a-menu-item key="left" @click="handleMenuAction('left')" :disabled="isFirstTab"><template #icon><ArrowLeftOutlined /></template>关闭左侧</a-menu-item>
        <a-menu-item key="right" @click="handleMenuAction('right')" :disabled="isLastTab"><template #icon><ArrowRightOutlined /></template>关闭右侧</a-menu-item>
        <a-menu-item key="other" @click="handleMenuAction('other')" :disabled="tabs.length <= 2"><template #icon><ColumnWidthOutlined /></template>关闭其它</a-menu-item>
        <a-menu-item key="all" @click="handleMenuAction('all')"><template #icon><CloseOutlined /></template>关闭所有</a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import * as Icons from '@ant-design/icons-vue'
import {
  CloseOutlined, ReloadOutlined, DownOutlined, ArrowLeftOutlined, ArrowRightOutlined,
  ColumnWidthOutlined, HomeOutlined,
} from '@ant-design/icons-vue'

interface Tab {
  path: string
  title: string
  icon: any
  affix: boolean
}

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const tabs = ref<Tab[]>([])
const activeTab = ref<string>('')
const dropdownVisible = ref(false)
const currentTab = ref<Tab | null>(null)
const contextMenu = ref({ visible: false, x: 0, y: 0, path: '' })

const getIconComponent = (iconName: string) => {
  if (!iconName) return HomeOutlined
  return Icons[iconName as keyof typeof Icons] || HomeOutlined
}

const contextMenuTab = computed(() => tabs.value.find(t => t.path === contextMenu.value.path))
const currentIndex = computed(() => tabs.value.findIndex(t => t.path === (currentTab.value?.path || activeTab.value)))
const isFirstTab = computed(() => currentIndex.value <= 1)
const isLastTab = computed(() => currentIndex.value >= tabs.value.length - 1)

const switchTab = (path: string) => { router.push(path) }

const closeTab = (path: string) => {
  const index = tabs.value.findIndex(t => t.path === path)
  if (index > -1 && !tabs.value[index].affix) {
    tabs.value.splice(index, 1)
    if (activeTab.value === path && tabs.value.length > 0) {
      const newIndex = Math.min(index, tabs.value.length - 1)
      activeTab.value = tabs.value[newIndex].path
      router.push(activeTab.value)
    }
  }
}

const closeCurrent = () => { if (currentTab.value && !currentTab.value.affix) closeTab(currentTab.value.path) }

const closeLeft = () => {
  if (currentIndex.value > 1) {
    tabs.value = tabs.value.filter((t, i) => i >= currentIndex.value || t.affix)
  }
}

const closeRight = () => {
  if (currentIndex.value < tabs.value.length - 1) {
    tabs.value = tabs.value.filter((t, i) => i <= currentIndex.value || t.affix)
  }
}

const closeOther = () => {
  tabs.value = tabs.value.filter(t => t.affix || t.path === activeTab.value)
}

const closeAll = () => {
  tabs.value = tabs.value.filter(t => t.affix)
  const affixTab = tabs.value.find(t => t.affix)
  if (affixTab) {
    activeTab.value = affixTab.path
    router.push(affixTab.path)
  }
}

const reloadCurrent = () => {
  // 只刷新当前路由，不关闭其他标签
  const currentPath = currentTab.value?.path || activeTab.value || route.path
  // 使用 router.replace 重新导航到当前路由，触发路由刷新
  router.replace({ path: currentPath, query: route.query, hash: route.hash })
}

// 添加一个刷新标志，用于 DashboardLayout 中显示加载动画

const handleWheel = (e: WheelEvent) => {
  const c = document.querySelector('.tabs-wrapper') as HTMLElement
  if (c) c.scrollLeft += e.deltaY
}

const showContextMenu = (e: MouseEvent, tab: Tab) => {
  currentTab.value = tab
  contextMenu.value = { visible: true, x: e.clientX, y: e.clientY, path: tab.path }
}

const hideContextMenu = () => {
  contextMenu.value.visible = false
  currentTab.value = null
}

const handleMenuAction = (action: string) => {
  currentTab.value = contextMenuTab.value || null
  const actions: Record<string, () => void> = {
    reload: reloadCurrent,
    close: closeCurrent,
    left: closeLeft,
    right: closeRight,
    other: closeOther,
    all: closeAll,
  }
  actions[action]?.()
  hideContextMenu()
}

const closeContextMenuOnClick = (e: MouseEvent) => {
  const m = document.querySelector('.context-menu')
  if (m && !m.contains(e.target as Node)) hideContextMenu()
}

const getMenuList = computed(() => {
  return userStore.getMenuList || []
})

const findMenuItem = (path: string): any => {
  const findInList = (list: any[]): any => {
    for (const item of list) {
      if (item.path === path) return item
      if (item.children) {
        const found = findInList(item.children)
        if (found) return found
      }
    }
    return null
  }
  return findInList(getMenuList.value)
}

watch(() => route.path, (newPath: string) => {
  activeTab.value = newPath
  const existing = tabs.value.find(t => t.path === newPath)
  if (!existing) {
    const menuItem = findMenuItem(newPath)
    const title = menuItem?.name || newPath.split('/').pop() || '未命名'
    const icon = menuItem ? getIconComponent(menuItem.icon || '') : HomeOutlined
    const affix = newPath === '/dashboard'
    tabs.value.push({ path: newPath, title, icon, affix })
  }
}, { immediate: true })

onMounted(() => { document.addEventListener('click', closeContextMenuOnClick) })
onUnmounted(() => { document.removeEventListener('click', closeContextMenuOnClick) })
</script>

<style scoped>
.app-tabs { display: flex; align-items: center; height: 36px; background: #fff; border-bottom: 1px solid #f0f0f0; padding: 0 8px; }
.tabs-wrapper { display: flex; gap: 4px; flex: 1; overflow-x: auto; padding: 4px 0; scrollbar-width: none; }
.tabs-wrapper::-webkit-scrollbar { display: none; }
.tab-item { display: flex; align-items: center; gap: 6px; height: 28px; padding: 0 12px; background: #fafafa; border: 1px solid #f0f0f0; border-radius: 4px 4px 0 0; cursor: pointer; font-size: 13px; white-space: nowrap; }
.tab-item:hover { background: #f5f5f5; }
.tab-item.active { background: #fff; border-bottom-color: #fff; color: #1890ff; }
.tab-item.affix { padding: 0 8px; }
.tab-icon { display: flex; align-items: center; justify-content: center; color: #1890ff; }
.tab-icon.single-icon { margin-right: 0; }
.tab-title { max-width: 120px; overflow: hidden; text-overflow: ellipsis; }
.close-icon { display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; font-size: 12px; border-radius: 4px; opacity: 0.6; }
.close-icon:hover { opacity: 1; background: rgba(0,0,0,0.1); color: #ff4d4f; }
.tabs-reload, .tabs-dropdown { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; font-size: 14px; color: rgba(0,0,0,0.65); cursor: pointer; border-radius: 4px; }
.tabs-reload { margin-left: 8px; border-right: 1px solid #f0f0f0; }
.tabs-reload:hover, .tabs-dropdown:hover { background: #f5f5f5; color: #1890ff; }
.context-menu { position: fixed; z-index: 1000; min-width: 150px; background: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); padding: 4px 0; }
:deep(.ant-menu-item) { padding: 4px 16px; }
:deep(.ant-menu-item:disabled) { opacity: 0.5; cursor: not-allowed; }
.dark .app-tabs { background: #141414; border-bottom-color: #303030; }
.dark .tab-item { background: #1f1f1f; border-color: #303030; }
.dark .tab-item:hover { background: #262626; }
.dark .tab-item.active { background: #141414; border-bottom-color: #141414; color: #1890ff; }
.dark .tabs-reload, .dark .tabs-dropdown { color: rgba(255,255,255,0.65); }
.dark .tabs-reload:hover, .dark .tabs-dropdown:hover { background: rgba(255,255,255,0.1); }
.dark .context-menu { background: #1f1f1f; box-shadow: 0 2px 8px rgba(0,0,0,0.5); }
</style>
