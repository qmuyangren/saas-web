<template>
  <div class="settings-trigger" @click="toggleDrawer">
    <SettingOutlined />
  </div>

  <a-drawer
    :open="drawerOpen"
    title="系统设置"
    placement="right"
    :mask-closable="true"
    @close="closeDrawer"
    :width="360"
    :bodyStyle="{ paddingBottom: '80px' }"
  >
    <!-- 整体风格设置 -->
    <div class="settings-section">
      <h3 class="section-title">整体风格设置</h3>

      <div class="setting-grid">
        <div
          v-for="theme in themes"
          :key="theme.value"
          class="theme-card"
          :class="{ active: currentTheme === theme.value }"
          @click="changeTheme(theme)"
        >
          <div class="theme-preview" :class="theme.value">
            <div class="theme-sider" />
            <div class="theme-header" />
          </div>
          <div class="theme-label">{{ theme.name }}</div>
          <CheckOutlined v-if="currentTheme === theme.value" class="theme-check" />
        </div>
      </div>
    </div>

    <a-divider style="margin: 24px 0" />

    <!-- 主题色 -->
    <div class="settings-section">
      <h3 class="section-title">主题色</h3>
      <div class="color-grid">
        <div
          v-for="color in themeColors"
          :key="color.value"
          class="color-option"
          :class="{ active: currentColor === color.value }"
          @click="changeColor(color)"
        >
          <div class="color-circle" :style="{ background: color.value }" />
          <CheckOutlined v-if="currentColor === color.value" class="color-check" />
        </div>
      </div>
    </div>

    <a-divider style="margin: 24px 0" />

    <!-- 显示设置 -->
    <div class="settings-section">
      <h3 class="section-title">显示设置</h3>

      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-label">显示标签页</div>
        </div>
        <a-switch v-model:checked="showTags" @change="saveSettings" />
      </div>

      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-label">显示页脚</div>
        </div>
        <a-switch v-model:checked="showFooter" @change="saveSettings" />
      </div>

      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-label">紧凑模式</div>
        </div>
        <a-switch v-model:checked="compactMode" @change="saveSettings" />
      </div>

      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-label">暗色模式</div>
        </div>
        <a-switch v-model:checked="darkMode" @change="saveSettings" />
      </div>
    </div>

    <!-- 底部操作 -->
    <div class="settings-actions">
      <a-button @click="resetSettings" block>重置设置</a-button>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/store/modules/app'
import {
  SettingOutlined,
  CheckOutlined,
} from '@ant-design/icons-vue'

const appStore = useAppStore()

const drawerOpen = ref(false)
const currentTheme = ref('light')
const currentColor = ref('#1890ff')
const showTags = ref(true)
const showFooter = ref(true)
const compactMode = ref(false)
const darkMode = ref(false)

const themes = [
  { name: '浅色', value: 'light' },
  { name: '暗色', value: 'dark' },
]

const themeColors = [
  { name: '拂晓蓝', value: '#1890ff' },
  { name: '极光绿', value: '#52c41a' },
  { name: '日暮橙', value: '#faad14' },
  { name: '火山红', value: '#ff4d4f' },
  { name: '酱紫', value: '#722ed1' },
  { name: '青绿', value: '#13c2c2' },
]

const SETTINGS_KEY = 'project_config'

// 加载设置
const loadSettings = () => {
  const saved = localStorage.getItem(SETTINGS_KEY)
  if (saved) {
    const settings = JSON.parse(saved)
    currentTheme.value = settings.darkMode ? 'dark' : 'light'
    currentColor.value = settings.color || '#1890ff'
    showTags.value = settings.showTags ?? true
    showFooter.value = settings.showFooter ?? true
    compactMode.value = settings.compactMode ?? false
    darkMode.value = settings.darkMode ?? false
  }

  applySettings()
}

// 保存设置
const saveSettings = () => {
  const settings = {
    darkMode: darkMode.value,
    color: currentColor.value,
    showTags: showTags.value,
    showFooter: showFooter.value,
    compactMode: compactMode.value,
  }
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  appStore.setProjectConfig(settings)
  applySettings()
}

// 切换主题
const changeTheme = (theme: any) => {
  currentTheme.value = theme.value
  darkMode.value = theme.value === 'dark'
  appStore.setDarkMode(darkMode.value)
  saveSettings()
}

// 切换颜色
const changeColor = (color: any) => {
  currentColor.value = color.value
  document.documentElement.style.setProperty('--primary-color', color.value)
  saveSettings()
}

// 应用设置
const applySettings = () => {
  const app = document.documentElement

  // 主题色
  app.style.setProperty('--primary-color', currentColor.value)

  // 紧凑模式
  app.classList.toggle('compact-mode', compactMode.value)

  // 暗色模式
  if (darkMode.value) {
    app.classList.add('dark')
  }
}

// 重置设置
const resetSettings = () => {
  currentTheme.value = 'light'
  currentColor.value = '#1890ff'
  darkMode.value = false
  showTags.value = true
  showFooter.value = true
  compactMode.value = false
  appStore.setDarkMode(false)
  localStorage.removeItem(SETTINGS_KEY)
  applySettings()
}

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const closeDrawer = () => {
  drawerOpen.value = false
  saveSettings()
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settings-trigger {
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

.settings-trigger:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1890ff;
}

.settings-section .section-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16px;
}

.setting-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.theme-card {
  position: relative;
  cursor: pointer;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
}

.theme-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.theme-card.active {
  border-color: #1890ff;
}

.theme-preview {
  height: 60px;
  display: flex;
}

.theme-preview.light {
  background: #fff;
}

.theme-preview.dark {
  background: #141414;
}

.theme-sider {
  width: 20px;
  background: #001529;
}

.theme-header {
  flex: 1;
  background: #f0f2f5;
}

.theme-preview.dark .theme-header {
  background: #1f1f1f;
}

.theme-label {
  padding: 8px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
}

.theme-check {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #1890ff;
  font-size: 18px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.color-option {
  position: relative;
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-circle {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.color-check {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 16px;
  height: 16px;
  color: #fff;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.setting-info {
  flex: 1;
  padding-right: 16px;
}

.setting-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 4px;
}

.settings-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

.dark .settings-trigger {
  color: rgba(255, 255, 255, 0.65);
}
.dark .settings-trigger:hover {
  background: rgba(255, 255, 255, 0.1);
}
.dark .section-title {
  color: rgba(255, 255, 255, 0.85);
}
.dark .setting-label {
  color: rgba(255, 255, 255, 0.85);
}
.dark .theme-card {
  border-color: #303030;
}
.dark .theme-label {
  color: rgba(255, 255, 255, 0.65);
}
.dark .settings-actions {
  background: #141414;
  border-top-color: #303030;
}
</style>
