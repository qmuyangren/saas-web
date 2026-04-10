<template>
  <a-popover
    :open="visible"
    placement="bottomRight"
    trigger="click"
    overlayClassName="search-popover"
    @update:open="handleOpenChange"
  >
    <template #content>
      <div class="search-content">
        <!-- 搜索输入框 -->
        <div class="search-input-wrapper">
          <a-input
            ref="inputEl"
            v-model:value="searchValue"
            placeholder="输入关键词搜索..."
            size="large"
            @keydown.enter="handleEnter"
            @keydown.esc="visible = false"
          >
            <template #prefix>
              <SearchOutlined />
            </template>
            <template #suffix>
              <CloseOutlined @click="searchValue = ''" v-if="searchValue" />
            </template>
          </a-input>
        </div>

        <!-- 快捷操作提示 -->
        <div class="search-shortcuts" v-if="!searchValue">
          <div class="shortcuts-title">快捷操作</div>
          <div class="shortcut-item" @click="navigateTo('/dashboard')">
            <span class="shortcut-icon"><DashboardOutlined /></span>
            <span class="shortcut-label">仪表盘</span>
            <span class="shortcut-key"><kbd>1</kbd></span>
          </div>
          <div class="shortcut-item" @click="navigateTo('/system/user')">
            <span class="shortcut-icon"><UserOutlined /></span>
            <span class="shortcut-label">用户管理</span>
            <span class="shortcut-key"><kbd>2</kbd></span>
          </div>
          <div class="shortcut-item" @click="navigateTo('/system/config')">
            <span class="shortcut-icon"><SettingOutlined /></span>
            <span class="shortcut-label">系统配置</span>
            <span class="shortcut-key"><kbd>3</kbd></span>
          </div>
        </div>

        <!-- 搜索结果 -->
        <div class="search-results" v-else-if="hasResults">
          <div class="results-title">搜索结果</div>
          <div
            v-for="(item, index) in suggestions"
            :key="item.path"
            class="result-item"
            :class="{ active: selectedIndex === index }"
            @click="navigateTo(item)"
            @mouseenter="selectedIndex = index"
          >
            <span class="result-icon">
              <component :is="item.icon" />
            </span>
            <div class="result-info">
              <div class="result-title">{{ item.title }}</div>
              <div class="result-path">{{ item.path }}</div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div class="search-empty" v-else-if="searchValue">
          <InboxOutlined class="empty-icon" />
          <p>未找到相关结果</p>
        </div>
      </div>
    </template>

    <!-- 触发按钮 -->
    <div class="search-trigger" @click="openSearch">
      <SearchOutlined />
    </div>
  </a-popover>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  SearchOutlined,
  CloseOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  InboxOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()

const visible = ref(false)
const searchValue = ref('')
const selectedIndex = ref(0)
const inputEl = ref<any>(null)

const menuItems = [
  { path: '/dashboard', title: '仪表盘', icon: DashboardOutlined },
  { path: '/system/user', title: '用户管理', icon: UserOutlined },
  { path: '/system/role', title: '角色管理', icon: SettingOutlined },
  { path: '/system/menu', title: '菜单管理', icon: SettingOutlined },
  { path: '/system/config', title: '系统配置', icon: SettingOutlined },
]

const suggestions = computed(() => {
  if (!searchValue.value) return []
  const keyword = searchValue.value.toLowerCase()
  return menuItems.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.path.toLowerCase().includes(keyword)
  )
})

const hasResults = computed(() => suggestions.value.length > 0)

const openSearch = () => {
  visible.value = true
  nextTick(() => {
    setTimeout(() => {
      inputEl.value?.focus()
    }, 100)
  })
}

const handleOpenChange = (open: boolean) => {
  visible.value = open
  if (open) {
    searchValue.value = ''
    selectedIndex.value = 0
  }
}

const handleEnter = () => {
  if (hasResults.value && suggestions.value[selectedIndex.value]) {
    navigateTo(suggestions.value[selectedIndex.value])
  }
}

const navigateTo = (item: any) => {
  router.push(item.path)
  visible.value = false
}
</script>

<style scoped>
.search-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.search-trigger:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1890ff;
}

.search-content {
  width: 450px;
  max-height: 400px;
}

.search-input-wrapper {
  margin-bottom: 0;
}

.search-shortcuts {
  padding: 12px 0;
}

.shortcuts-title {
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.shortcut-item:hover {
  background: #f5f5f5;
}

.shortcut-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(135deg, #1890ff, #096dd9);
}

.shortcut-label {
  flex: 1;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}

.shortcut-key kbd {
  display: inline-block;
  padding: 2px 8px;
  font-size: 12px;
  font-family: inherit;
  color: rgba(0, 0, 0, 0.45);
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.search-results {
  padding: 12px 0;
  max-height: 280px;
  overflow-y: auto;
}

.results-title {
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 8px;
  text-transform: uppercase;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.result-item:hover {
  background: #f5f5f5;
}

.result-item.active {
  background: rgba(24, 144, 255, 0.1);
}

.result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 16px;
  color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 2px;
}

.result-path {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: rgba(0, 0, 0, 0.45);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

:deep(.search-popover .ant-popover-inner-content) {
  padding: 0;
}

.dark .search-trigger {
  color: rgba(255, 255, 255, 0.65);
}
.dark .search-trigger:hover {
  background: rgba(255, 255, 255, 0.1);
}
.dark .shortcut-item:hover {
  background: #262626;
}
.dark .result-item:hover {
  background: #262626;
}
.dark .result-item.active {
  background: rgba(24, 144, 255, 0.15);
}
</style>
