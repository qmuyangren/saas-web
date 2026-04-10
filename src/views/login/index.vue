<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <a-card class="login-card" :bordered="false">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">管理系统</h1>
        <p class="text-gray-500">欢迎登录</p>
      </div>

      <a-form
        :model="form"
        :rules="rules"
        @finish="handleLogin"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="form.username"
            placeholder="请输入用户名"
            size="large"
            allow-clear
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="form.password"
            placeholder="请输入密码"
            size="large"
            allow-clear
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="loading"
          >
            {{ loading ? '登录中...' : '登录' }}
          </a-button>
        </a-form-item>
      </a-form>

      <div class="mt-4 text-center text-sm text-gray-400">
        <p>测试账号：admin / 123456</p>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const loading = ref(false)

const form = reactive({
  username: 'admin',
  password: '123456',
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
}

const handleLogin = async () => {
  loading.value = true
  try {
    const userInfo = await userStore.login(form)
    if (userInfo) {
      message.success('登录成功')
      const redirect = route.query.redirect as string
      router.push(redirect || '/')
    } else {
      message.error('登录失败')
    }
  } catch (e: any) {
    message.error(e.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const handleFinishFailed = ({ errorFields }: any) => {
  if (errorFields && errorFields.length > 0) {
    message.error('请填写完整的登录信息')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="30" cy="50" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="70" cy="30" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="80" r="2.5" fill="rgba(255,255,255,0.1)"/></svg>');
  opacity: 0.3;
}

.login-card {
  width: 100%;
  max-width: 420px;
  z-index: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.login-card :deep(.ant-card-body) {
  padding: 32px 24px;
}
</style>
