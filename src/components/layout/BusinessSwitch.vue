<template>
  <div class="business-trigger" @click="toggleDrawer">
    <AppstoreOutlined />
  </div>

  <a-drawer
    :open="drawerOpen"
    title="业务切换"
    placement="right"
    :mask-closable="true"
    @close="closeDrawer"
    width="400px"
  >
    <div class="business-list">
      <div
        v-for="biz in businesses"
        :key="biz.id"
        class="business-card"
        :class="{ active: currentBusiness?.id === biz.id }"
        @click="switchBusiness(biz)"
      >
        <div class="business-icon">
          <component :is="biz.icon" />
        </div>
        <div class="business-info">
          <div class="business-name">{{ biz.name }}</div>
          <div class="business-desc">{{ biz.description }}</div>
        </div>
        <CheckCircleOutlined v-if="currentBusiness?.id === biz.id" class="business-check" />
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'

const BUSINESSES_KEY = 'business_list'

const businesses = [
  { id: '1', name: '管理系统', description: '企业后台管理系统', icon: DashboardOutlined, url: '/' },
  { id: '2', name: '用户中心', description: '用户信息与权限', icon: TeamOutlined, url: '/system/user' },
  { id: '3', name: '系统设置', description: '系统配置管理', icon: SettingOutlined, url: '/system/config' },
]

const drawerOpen = ref(false)
const currentBusinessId = ref('1')

const currentBusiness = computed(() =>
  businesses.find(b => b.id === currentBusinessId.value)
)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const switchBusiness = (biz: any) => {
  currentBusinessId.value = biz.id
  localStorage.setItem(BUSINESSES_KEY, biz.id)
  closeDrawer()
}

onMounted(() => {
  const saved = localStorage.getItem(BUSINESSES_KEY)
  if (saved) {
    currentBusinessId.value = saved
  }
})
</script>

<style scoped>
.business-trigger {
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

.business-trigger:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1890ff;
}

.business-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.business-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.business-card:hover {
  border-color: #1890ff;
  background: rgba(24, 144, 255, 0.05);
}

.business-card.active {
  border-color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
}

.business-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 24px;
  color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
  border-radius: 8px;
}

.business-info {
  flex: 1;
}

.business-name {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 4px;
}

.business-desc {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.business-check {
  font-size: 20px;
  color: #1890ff;
}

.dark .business-trigger {
  color: rgba(255, 255, 255, 0.65);
}
.dark .business-trigger:hover {
  background: rgba(255, 255, 255, 0.1);
}
.dark .business-card {
  border-color: #303030;
}
.dark .business-card:hover {
  border-color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
}
.dark .business-card.active {
  background: rgba(24, 144, 255, 0.15);
}
</style>
