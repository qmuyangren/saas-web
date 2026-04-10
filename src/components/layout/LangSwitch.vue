<template>
  <a-popover
    :open="visible"
    placement="bottom"
    trigger="click"
    overlayClassName="lang-popover"
    @openChange="handleOpenChange"
  >
    <template #content>
      <div class="lang-list">
        <div
          v-for="lang in languages"
          :key="lang.key"
          class="lang-item"
          :class="{ active: currentLang === lang.key }"
          @click="switchLang(lang)"
        >
          <span class="lang-flag">{{ lang.flag }}</span>
          <span class="lang-label">{{ lang.label }}</span>
          <CheckOutlined v-if="currentLang === lang.key" class="lang-check" />
        </div>
      </div>
    </template>

    <div class="lang-trigger" @click="togglePopover">
      <img
        :src="`https://flagcdn.com/24x18/${currentFlagCode}.png`"
        :alt="currentLang"
        class="lang-flag-img"
      />
    </div>
  </a-popover>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'

const LANG_KEY = 'lang'

const languages = [
  { key: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { key: 'en-US', label: 'English', flag: '🇺🇸' },
]

const visible = ref(false)
const currentLang = ref('zh-CN')

const currentFlagCode = computed(() => {
  const map: Record<string, string> = {
    'zh-CN': 'cn',
    'en-US': 'us',
  }
  return map[currentLang.value] || 'cn'
})

const switchLang = (lang: any) => {
  currentLang.value = lang.key
  localStorage.setItem(LANG_KEY, lang.key)
  visible.value = false
}

const togglePopover = () => {
  visible.value = !visible.value
}

const handleOpenChange = (open: boolean) => {
  visible.value = open
}

onMounted(() => {
  const saved = localStorage.getItem(LANG_KEY)
  if (saved) {
    currentLang.value = saved
  }
})
</script>

<style scoped>
.lang-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 160px;
}

.lang-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.lang-item:hover {
  background: #f5f5f5;
}

.lang-item.active {
  background: rgba(24, 144, 255, 0.1);
  color: #1890ff;
}

.lang-flag {
  font-size: 18px;
}

.lang-label {
  flex: 1;
  font-size: 14px;
}

.lang-check {
  font-size: 14px;
  color: #1890ff;
}

.lang-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.lang-trigger:hover {
  background: rgba(0, 0, 0, 0.05);
}

.lang-flag-img {
  width: 24px;
  height: 18px;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

:deep(.lang-popover .ant-popover-inner-content) {
  padding: 8px;
}

.dark .lang-item:hover {
  background: #262626;
}
.dark .lang-item.active {
  background: rgba(24, 144, 255, 0.15);
}
.dark .lang-trigger:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
