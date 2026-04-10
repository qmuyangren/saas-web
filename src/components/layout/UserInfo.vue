<template>
  <a-dropdown :trigger="['hover']">
    <div class="user-avatar-wrapper">
      <a-avatar :size="36" class="user-avatar">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <span class="user-name-text">{{ userStore.userInfo?.username || 'Admin' }}</span>
      <DownOutlined class="user-arrow" />
    </div>
    <template #overlay>
      <div class="user-popover-card">
        <div class="user-header">
          <a-avatar :size="48" class="user-avatar-lg">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <div class="user-details">
            <div class="user-name">{{ userStore.userInfo?.username || 'Admin' }}</div>
            <div class="user-email">{{ userStore.userInfo?.email || 'admin@example.com' }}</div>
            <a-tag color="blue" v-if="userStore.userInfo?.role">
              {{ userStore.userInfo.role }}
            </a-tag>
          </div>
        </div>
        <a-divider style="margin: 12px 0" />
        <a-menu class="user-action-menu">
          <a-menu-item @click="$router.push('/user/profile')">
            <template #icon><UserOutlined /></template>
            个人资料
          </a-menu-item>
          <a-menu-item @click="$router.push('/system/config')">
            <template #icon><SettingOutlined /></template>
            系统设置
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="handleLogout" class="logout-item">
            <template #icon><LogoutOutlined /></template>
            退出登录
          </a-menu-item>
        </a-menu>
      </div>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = async () => {
  await userStore.logout()
  router.replace('/login')
}
</script>

<style scoped>
.user-avatar-wrapper { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.user-avatar-wrapper:hover { background: rgba(0,0,0,0.05); }
.user-name-text { font-size: 14px; color: rgba(0,0,0,0.85); max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.user-arrow { font-size: 12px; color: rgba(0,0,0,0.45); }
.user-popover-card { min-width: 280px; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.15); padding: 16px; }
.user-header { display: flex; gap: 12px; }
.user-details { flex: 1; }
.user-name { font-weight: 500; color: rgba(0,0,0,0.85); font-size: 16px; margin-bottom: 4px; }
.user-email { color: rgba(0,0,0,0.45); font-size: 13px; margin-bottom: 8px; }
.user-action-menu { border: none; box-shadow: none; }
.user-action-menu :deep(.ant-menu-item) { padding: 8px 12px; }
.logout-item { color: #ff4d4f; }
.dark .user-popover-card { background: #1f1f1f; box-shadow: 0 2px 12px rgba(0,0,0,0.5); }
.dark .user-name { color: rgba(255,255,255,0.85); }
.dark .user-email { color: rgba(255,255,255,0.45); }
</style>
