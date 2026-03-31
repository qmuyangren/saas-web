import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './Login.vue';
import { AuthApi } from '@/api/auth';

// Mock AuthApi
vi.mock('@/api/auth', () => ({
  AuthApi: {
    login: vi.fn(),
  },
  TokenManager: {
    setToken: vi.fn(),
  },
}));

describe('Login.vue', () => {
  let wrapper: any;
  let pinia: any;
  let router: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
      ],
    });

    wrapper = mount(Login, {
      global: {
        plugins: [pinia, router],
        stubs: {
          'a-form': { template: '<form @submit.prevent="$emit(\'finish\')"><slot /></form>' },
          'a-form-item': { template: '<div><slot /></div>' },
          'a-input': { template: '<input />' },
          'a-input-password': { template: '<input type="password" />' },
          'a-checkbox': { template: '<input type="checkbox" />' },
          'a-button': { template: '<button type="submit"><slot /></button>' },
          'a-alert': { template: '<div class="alert"><slot /></div>' },
          'router-link': { template: '<a><slot /></a>' },
        },
      },
    });
  });

  it('should render login form', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('用户登录');
  });

  it('should have email input field', () => {
    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.exists()).toBe(true);
  });

  it('should have password input field', () => {
    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.exists()).toBe(true);
  });

  it('should have remember me checkbox', () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(checkbox.exists()).toBe(true);
  });

  it('should have submit button', () => {
    const button = wrapper.find('button[type="submit"]');
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('登录');
  });

  it('should have register link', () => {
    const links = wrapper.findAll('a');
    const registerLink = links.find((a: any) => a.text().includes('注册'));
    expect(registerLink.exists()).toBe(true);
  });

  describe('form validation', () => {
    it('should validate email format', async () => {
      const emailInput = wrapper.find('input[type="email"]');
      await emailInput.setValue('invalid-email');
      await emailInput.trigger('blur');
      
      // 应该有错误提示
      expect(wrapper.text()).toContain('邮箱格式不正确');
    });

    it('should validate password length', async () => {
      const passwordInput = wrapper.find('input[type="password"]');
      await passwordInput.setValue('123');
      await passwordInput.trigger('blur');
      
      // 应该有错误提示
      expect(wrapper.text()).toContain('密码长度');
    });
  });

  describe('login submission', () => {
    it('should call AuthApi.login on form submit', async () => {
      const mockLogin = vi.mocked(AuthApi.login);
      mockLogin.mockResolvedValue({
        code: 0,
        message: 'success',
        data: {
          token: 'mock-token',
          expiresIn: 7200,
          user: {
            id: 1,
            email: 'test@example.com',
            role: 'user',
            createdAt: new Date().toISOString(),
          },
        },
      });

      // 填写表单
      const emailInput = wrapper.find('input[type="email"]');
      const passwordInput = wrapper.find('input[type="password"]');
      
      await emailInput.setValue('test@example.com');
      await passwordInput.setValue('123456');
      
      // 提交表单
      await wrapper.find('form').trigger('submit.prevent');
      
      // 验证 API 被调用
      expect(AuthApi.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: '123456',
        rememberMe: false,
      });
    });

    it('should show error on login failure', async () => {
      const mockLogin = vi.mocked(AuthApi.login);
      mockLogin.mockRejectedValue(new Error('密码错误'));

      // 填写表单
      const emailInput = wrapper.find('input[type="email"]');
      const passwordInput = wrapper.find('input[type="password"]');
      
      await emailInput.setValue('test@example.com');
      await passwordInput.setValue('wrong-password');
      
      // 提交表单
      await wrapper.find('form').trigger('submit.prevent');
      
      // 应该显示错误提示
      expect(wrapper.text()).toContain('密码错误');
    });

    it('should redirect to home on success', async () => {
      const mockLogin = vi.mocked(AuthApi.login);
      mockLogin.mockResolvedValue({
        code: 0,
        message: 'success',
        data: {
          token: 'mock-token',
          expiresIn: 7200,
          user: {
            id: 1,
            email: 'test@example.com',
            role: 'user',
            createdAt: new Date().toISOString(),
          },
        },
      });

      const routerPushSpy = vi.spyOn(wrapper.vm.$router, 'push');

      // 填写表单
      const emailInput = wrapper.find('input[type="email"]');
      const passwordInput = wrapper.find('input[type="password"]');
      
      await emailInput.setValue('test@example.com');
      await passwordInput.setValue('123456');
      
      // 提交表单
      await wrapper.find('form').trigger('submit.prevent');
      
      // 等待异步操作
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 验证路由跳转
      expect(routerPushSpy).toHaveBeenCalledWith('/');
    });
  });

  describe('password strength', () => {
    it('should show weak password strength', async () => {
      const passwordInput = wrapper.find('input[type="password"]');
      await passwordInput.setValue('123');
      
      // 密码强度指示器应该显示
      expect(wrapper.text()).toContain('弱');
    });

    it('should show strong password strength', async () => {
      const passwordInput = wrapper.find('input[type="password"]');
      await passwordInput.setValue('Test123456!');
      
      // 密码强度指示器应该显示
      expect(wrapper.text()).toContain('强');
    });
  });
});
