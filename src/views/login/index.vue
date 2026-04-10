<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <a-card class="login-card" :bordered="false">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">管理系统</h1>
        <p class="text-gray-500">欢迎登录</p>
      </div>

      <a-form
        ref="formRef"
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

        <!-- 拖拽验证码：失败超过 3 次时显示 -->
        <a-form-item
          v-if="showCaptcha"
          label="验证安全"
          name="captcha"
          :rules="[{ required: true, message: '请完成验证' }]"
        >
          <CaptchaDrag :on-success="handleCaptchaSuccess" />
        </a-form-item>

        <a-form-item>
          <a-checkbox v-model:checked="rememberMe">记住我（7 天内自动登录）</a-checkbox>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/store/modules/user'
import CaptchaDrag from '@/components/common/CaptchaDrag/index.vue'
import { useCaptcha } from '@/composables/useCaptcha'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const formRef = ref()

const {
  captchaVerified,
  showCaptcha,
  failCount,
  loadFailCount,
  incrementFailCount,
  resetFailCount,
  handleCaptchaSuccess: handleCaptchaSuccessCore,
  resetCaptcha,
} = useCaptcha()

const loading = ref(false)
const rememberMe = ref(false)

const form = reactive({
  username: 'admin',
  password: '123456',
})

const REMEMBER_ME_KEY = 'remember_me_user'
const FAIL_COUNT_KEY = 'login_fail_count'

// 页面加载时检查是否有记住我的用户和失败次数
onMounted(() => {
  // 检查记住的用户
  const rememberedUser = localStorage.getItem(REMEMBER_ME_KEY)
  if (rememberedUser) {
    try {
      const user = JSON.parse(rememberedUser)
      form.username = user.username
      rememberMe.value = true
      // 自动登录
      autoLogin(user.refreshToken)
    } catch (e) {
      localStorage.removeItem(REMEMBER_ME_KEY)
    }
  }

  // 从 localStorage 读取失败次数
  loadFailCount()
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
}

// 自动登录
const autoLogin = async (refreshToken: string) => {
  loading.value = true
  try {
    const userInfo = await userStore.refreshToken(refreshToken)
    if (userInfo) {
      message.success('自动登录成功')
      router.push('/')
    }
  } catch (e: any) {
    localStorage.removeItem(REMEMBER_ME_KEY)
    message.error('自动登录失败，请重新登录')
  } finally {
    loading.value = false
  }
}

const handleLogin = async () => {
  // 如果需要验证码但还没验证
  if (showCaptcha.value && !captchaVerified.value) {
    message.warning('请先完成验证码')
    return
  }

  loading.value = true
  try {
    const userInfo = await userStore.login(form)
    if (userInfo) {
      message.success('登录成功')
      // 登录成功，重置失败次数
      resetFailCount()
      resetCaptcha()

      // 处理记住我
      if (rememberMe.value && userInfo.refreshToken) {
        localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify({
          username: form.username,
          refreshToken: userInfo.refreshToken,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 天
        }))
      } else {
        localStorage.removeItem(REMEMBER_ME_KEY)
      }

      const redirect = route.query.redirect as string
      router.push(redirect || '/')
    } else {
      handleLoginFailure()
    }
  } catch (e: any) {
    handleLoginFailure()
  } finally {
    loading.value = false
  }
}

const handleLoginFailure = () => {
  // 增加失败次数
  incrementFailCount()

  // 超过 3 次显示验证码
  if (failCount.value >= 3) {
    showCaptcha.value = true
    message.warning('登录失败次数过多，请完成拖拽验证')
  } else {
    message.error('登录失败')
  }
}

const handleCaptchaSuccess = () => {
  handleCaptchaSuccessCore()
  message.success('验证成功，请登录')
}

const handleFinishFailed = ({ errorFields }: any) => {
  if (errorFields && errorFields.length > 0) {
    message.error('请填写完整的登录信息')
  }
}
</script>

<style scoped lang="scss">
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

  :deep(.ant-card-body) {
    padding: 32px 24px;
  }
}

// 拖拽验证码样式覆盖
.captcha-drag-container {
  :deep(.captcha-slider) {
    width: 100%;
  }
}
</style>
