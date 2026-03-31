/**
 * Vue Router 配置
 */

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// 懒加载页面组件
const Login = () => import('@/pages/Login.vue')
const Home = () => import('@/pages/Home.vue')
const Register = () => import('@/pages/Register.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, hideForAuth: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false, hideForAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  // 初始化认证状态（仅首次）
  if (!authStore.token) {
    authStore.initAuth()
  }

  // 需要登录
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录用户访问登录/注册页，重定向到首页
  if (to.meta.hideForAuth && authStore.isLoggedIn) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router
