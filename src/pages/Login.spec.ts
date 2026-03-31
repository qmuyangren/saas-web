import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Login from './Login.vue';

describe('Login.vue', () => {
  it('should render login title', () => {
    const wrapper = mount(Login);
    expect(wrapper.text()).toContain('用户登录');
  });

  it('should have email input', () => {
    const wrapper = mount(Login);
    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.exists()).toBe(true);
  });

  it('should have password input', () => {
    const wrapper = mount(Login);
    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.exists()).toBe(true);
  });

  it('should have submit button', () => {
    const wrapper = mount(Login);
    const button = wrapper.find('button[type="submit"]');
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('登录');
  });

  it('should have register link', () => {
    const wrapper = mount(Login);
    expect(wrapper.text()).toContain('立即注册');
  });
});
