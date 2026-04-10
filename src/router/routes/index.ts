// 路由基础配置
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404', hidden: true },
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/error/403.vue'),
    meta: { title: '403', hidden: true },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/views/error/500.vue'),
    meta: { title: '500', hidden: true },
  },
  // 重定向页面
  {
    path: '/redirect',
    component: () => import('@/views/redirect/index.vue'),
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/redirect/index.vue'),
        meta: { hidden: true },
      },
    ],
  },
  // 根路径重定向到 dashboard
  {
    path: '/',
    redirect: '/dashboard/index',
    meta: { hidden: true },
  },
]
