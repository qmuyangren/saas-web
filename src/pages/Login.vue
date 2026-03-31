<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Input, Button, Checkbox, Alert, Card } from 'ant-design-vue'
import { login } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import type { LoginForm, ErrorResponse } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()

const formState = ref<LoginForm>({
  email: '',
  password: '',
  rememberMe: false,
})

const errorMessage = ref<string>('')
const lockedUntil = ref<string | null>(null)
const isLocked = ref(false)
const loading = ref(false)

const passwordStrength = computed(() => {
  const password = formState.value.password
  if (!password) return { level: 0, text: '', color: '' }
  
  let strength = 0
  if (password.length >= 6) strength++
  if (password.length >= 10) strength++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  const levels = [
    { level: 0, text: '', color: '' },
    { level: 1, text: '弱', color: '#ff4d4f' },
    { level: 2, text: '中等', color: '#faad14' },
    { level: 3, text: '强', color: '#52c41a' },
    { level: 4, text: '很强', color: '#52c41a' },
    { level: 5, text: '非常强', color: '#52c41a' },
  ]

  return levels[Math.min(strength, 5)]
})

const errorMessages: Record<number, string> = {
  1001: '参数错误',
  1002: '密码错误',
  1003: '账户已锁定',
  2001: '服务器内部错误',
}

const handleSubmit = async () => {
  errorMessage.value = ''
  lockedUntil.value = null
  isLocked.value = false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formState.value.email)) {
    errorMessage.value = '邮箱格式不正确'
    return
  }

  if (formState.value.password.length < 6) {
    errorMessage.value = '密码至少 6 个字符'
    return
  }

  loading.value = true

  try {
    const response = await login({
      email: formState.value.email,
      password: formState.value.password,
      rememberMe: formState.value.rememberMe,
    })

    if (response.code === 0 && response.data && 'token' in response.data) {
      authStore.setToken(response.data.token, response.data.expiresIn)
      authStore.setUser(response.data.user)
      authStore.setRememberMe(formState.value.rememberMe)
      router.push('/')
    } else {
      const errResp = response as unknown as ErrorResponse
      if (errResp.code === 1003 && errResp.data?.lockedUntil) {
        isLocked.value = true
        lockedUntil.value = formatLockedTime(errResp.data.lockedUntil)
        errorMessage.value = `账户已锁定，请 ${lockedUntil.value} 后再试`
      } else {
        errorMessage.value = errorMessages[errResp.code || 0] || errResp.message || '登录失败'
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = `网络错误: ${error.message}`
    } else {
      errorMessage.value = '网络连接失败，请检查网络'
    }
  } finally {
    loading.value = false
  }
}

const formatLockedTime = (isoString: string): string => {
  const date = new Date(isoString)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <Card class="login-card">
        <template #title>
          <h2 class="login-title">登录</h2>
        </template>

        <!-- 错误提示 -->
        <Alert
          v-if="errorMessage"
          :message="errorMessage"
          :type="isLocked ? 'warning' : 'error'"
          show-icon
          closable
          class="login-alert"
          @close="errorMessage = ''"
        />

        <Form
          :model="formState"
          layout="vertical"
          @finish="handleSubmit"
        >
          <Form.Item
            name="email"
            label="邮箱"
            :validate-status="errorMessage.includes('邮箱') ? 'error' : undefined"
          >
            <Input
              v-model:value="formState.email"
              placeholder="请输入邮箱地址"
              size="large"
              type="email"
              :disabled="loading || isLocked"
              @pressEnter="handleSubmit"
            >
              <template #prefix>
                <span class="input-prefix">📧</span>
              </template>
            </Input>
          </Form.Item>

          <!-- 密码 -->
          <Form.Item
            name="password"
            label="密码"
            :validate-status="errorMessage.includes('密码') ? 'error' : ''"
          >
            <Input.Password
              v-model:value="formState.password"
              placeholder="请输入密码"
              size="large"
              :disabled="loading || isLocked"
              @pressEnter="handleSubmit"
            >
              <template #prefix>
                <span class="input-prefix">🔒</span>
              </template>
            </Input.Password>
            
            <!-- 密码强度指示器 -->
            <div v-if="formState.password" class="password-strength">
              <div class="strength-bar">
                <div
                  class="strength-fill"
                  :style="{
                    width: `${(passwordStrength.level / 5) * 100}%`,
                    backgroundColor: passwordStrength.color,
                  }"
                />
              </div>
              <span
                class="strength-text"
                :style="{ color: passwordStrength.color }"
              >
                {{ passwordStrength.text }}
              </span>
            </div>
          </Form.Item>

          <!-- 记住我 & 忘记密码 -->
          <div class="form-options">
            <Checkbox
              v-model:checked="formState.rememberMe"
              :disabled="loading || isLocked"
            >
              记住我
            </Checkbox>
            <a href="/forgot-password" class="forgot-link">
              忘记密码？
            </a>
          </div>

          <!-- 提交按钮 -->
          <Form.Item>
            <Button
              type="primary"
              html-type="submit"
              size="large"
              block
              :loading="loading"
              :disabled="isLocked"
            >
              {{ loading ? '登录中...' : '登录' }}
            </Button>
          </Form.Item>
        </Form>

        <!-- 注册链接 -->
        <div class="register-link">
          还没有账号？
          <router-link to="/register">立即注册</router-link>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.login-card :deep(.ant-card-head) {
  border-bottom: none;
  padding-bottom: 0;
}

.login-card :deep(.ant-card-body) {
  padding-top: 16px;
}

.login-title {
  text-align: center;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-h);
}

.login-alert {
  margin-bottom: 24px;
}

.input-prefix {
  font-size: 16px;
  opacity: 0.7;
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: 2px;
}

.strength-text {
  font-size: 12px;
  font-weight: 500;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.forgot-link {
  font-size: 14px;
  color: var(--accent);
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: var(--text);
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.register-link a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

/* 响应式 */
@media (max-width: 480px) {
  .login-page {
    padding: 16px;
    align-items: flex-start;
    padding-top: 60px;
  }

  .login-container {
    max-width: 100%;
  }
}
</style>
