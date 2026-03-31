/**
 * 注册页面占位组件
 */

<script setup lang="ts">
import { Card } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <Card class="register-card">
        <template #title>
          <h2 class="register-title">注册</h2>
        </template>
        <p class="coming-soon">注册功能即将上线</p>
        <a @click="router.push('/login')">返回登录</a>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
}

.register-container {
  width: 100%;
  max-width: 400px;
}

.register-card {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.register-title {
  text-align: center;
  margin: 0;
}

.coming-soon {
  text-align: center;
  color: var(--text);
  margin-bottom: 16px;
}

a {
  display: block;
  text-align: center;
  color: var(--accent);
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
</style>
