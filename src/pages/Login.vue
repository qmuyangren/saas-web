<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">用户登录</h2>
      
      <a-form
        :model="formState"
        :rules="rules"
        @finish="handleLogin"
        @finishFailed="handleLoginFailed"
        layout="vertical"
      >
        <a-form-item name="email" label="邮箱">
          <a-input
            v-model:value="formState.email"
            placeholder="请输入邮箱"
            size="large"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" label="密码">
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
            size="large"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-checkbox v-model:checked="formState.rememberMe">
            记住我（7 天免登录）
          </a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :loading="loading"
            block
          >
            登录
          </a-button>
        </a-form-item>

        <div class="login-footer">
          <span>还没有账号？</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { message } from 'ant-design-vue';

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const formState = reactive<FormState>({
  email: '',
  password: '',
  rememberMe: false,
});

const loading = ref(false);

const rules: Record<string, Rule[]> = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少 6 位', trigger: 'blur' },
    { max: 20, message: '密码长度最多 20 位', trigger: 'blur' },
  ],
};

const handleLogin = async () => {
  loading.value = true;
  
  try {
    // TODO: 调用后端登录 API
    // const response = await fetch('/api/v1/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formState),
    // });
    // const result = await response.json();
    // if (result.code === 0) {
    //   localStorage.setItem('token', result.data.token);
    //   message.success('登录成功');
    //   router.push('/');
    // }

    // 模拟登录
    setTimeout(() => {
      message.success('登录成功');
      loading.value = false;
    }, 1000);
  } catch (error) {
    message.error('登录失败');
    loading.value = false;
  }
};

const handleLoginFailed = ({ errorFields }: any) => {
  message.error('表单验证失败');
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.login-footer a {
  color: #667eea;
  margin-left: 5px;
}
</style>
