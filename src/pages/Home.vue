/**
 * 首页占位组件
 * 登录成功后跳转至此
 */

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { Button } from 'ant-design-vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.clearAuth()
  router.push('/login')
}
</script>

<template>
  <div class="home-page">
    <div class="home-container">
      <h1>欢迎回来！</h1>
      <p v-if="authStore.user">
        登录用户: {{ authStore.user.email }}
      </p>
      <Button type="primary" danger @click="handleLogout">
        退出登录
      </Button>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
}

.home-container {
  text-align: center;
  color: white;
}

h1 {
  margin-bottom: 16px;
  font-size: 32px;
}

p {
  margin-bottom: 24px;
  font-size: 18px;
}
</style>
