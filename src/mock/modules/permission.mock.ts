import type { MockMethod } from 'vite-plugin-mock'

/**
 * JNPF 风格的路由权限配置
 * 模拟后端返回的完整导航菜单和路由配置
 */
export const permissionRoutes = [
  // ========== 仪表盘 ==========
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'dashboard/index',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
      affix: true,
      iconBg: '#1890ff',
      orderNo: 1,
    },
  },
  
  // ========== 系统管理 ==========
  {
    path: '/system',
    name: 'System',
    redirect: '/system/config',
    meta: {
      title: '系统管理',
      icon: 'SettingOutlined',
      iconBg: '#722ed1',
      orderNo: 10,
    },
    children: [
      {
        path: '/system/config',
        name: 'SystemConfig',
        component: 'system/config/index',
        meta: {
          title: '系统配置',
          icon: 'ToolOutlined',
          affix: false,
          iconBg: '#1890ff',
          orderNo: 101,
          permission: ['system:config:view'],
        },
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          icon: 'TeamOutlined',
          iconBg: '#52c41a',
          orderNo: 102,
          permission: ['system:role:view'],
        },
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          icon: 'AppstoreOutlined',
          iconBg: '#faad14',
          orderNo: 103,
          permission: ['system:menu:view'],
        },
      },
    ],
  },
  
  // ========== 用户管理 ==========
  {
    path: '/user',
    name: 'User',
    redirect: '/user/list',
    meta: {
      title: '用户管理',
      icon: 'UserOutlined',
      iconBg: '#13c2c2',
      orderNo: 20,
    },
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: 'user/list',
        meta: {
          title: '用户列表',
          icon: 'TableOutlined',
          iconBg: '#1890ff',
          orderNo: 201,
          permission: ['user:list:view'],
        },
      },
      {
        path: '/user/role',
        name: 'UserRole',
        component: 'user/role',
        meta: {
          title: '用户角色',
          icon: 'UsergroupAddOutlined',
          iconBg: '#722ed1',
          orderNo: 202,
          permission: ['user:role:view'],
        },
      },
      {
        path: '/user/department',
        name: 'UserDepartment',
        component: 'user/department',
        meta: {
          title: '部门管理',
          icon: 'ClusterOutlined',
          iconBg: '#52c41a',
          orderNo: 203,
          permission: ['user:dept:view'],
        },
      },
    ],
  },
  
  // ========== 认证管理 ==========
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/token',
    meta: {
      title: '认证管理',
      icon: 'SafetyCertificateOutlined',
      iconBg: '#eb2f96',
      orderNo: 30,
    },
    children: [
      {
        path: '/auth/token',
        name: 'AuthToken',
        component: 'auth/token',
        meta: {
          title: 'Token 管理',
          icon: 'KeyOutlined',
          iconBg: '#1890ff',
          orderNo: 301,
          permission: ['auth:token:view'],
        },
      },
      {
        path: '/auth/log',
        name: 'AuthLog',
        component: 'auth/log',
        meta: {
          title: '登录日志',
          icon: 'FileTextOutlined',
          iconBg: '#13c2c2',
          orderNo: 302,
          permission: ['auth:log:view'],
        },
      },
      {
        path: '/auth/online',
        name: 'AuthOnline',
        component: 'auth/online',
        meta: {
          title: '在线用户',
          icon: 'WifiOutlined',
          iconBg: '#52c41a',
          orderNo: 303,
          permission: ['auth:online:view'],
        },
      },
    ],
  },
  
  // ========== 日志管理 ==========
  {
    path: '/log',
    name: 'Log',
    redirect: '/log/operation',
    meta: {
      title: '日志管理',
      icon: 'ContainerOutlined',
      iconBg: '#fa8c16',
      orderNo: 40,
    },
    children: [
      {
        path: '/log/operation',
        name: 'LogOperation',
        component: 'log/operation',
        meta: {
          title: '操作日志',
          icon: 'EditOutlined',
          iconBg: '#1890ff',
          orderNo: 401,
          permission: ['log:operation:view'],
        },
      },
      {
        path: '/log/system',
        name: 'LogSystem',
        component: 'log/system',
        meta: {
          title: '系统日志',
          icon: 'BugOutlined',
          iconBg: '#f5222d',
          orderNo: 402,
          permission: ['log:system:view'],
        },
      },
    ],
  },
]

/**
 * 模拟用户信息
 */
export const userInfo = {
  id: '1',
  username: 'admin',
  realname: '管理员',
  email: 'admin@example.com',
  avatar: 'https://gw.alipayobjects.com/zos/antfcdn.cn/BIAgWdSA/jpg/2f2c9b7d6753f13c0d30f1f6c1c0f7e1.jpg',
  phone: '13800138000',
  department: '技术部',
  roles: ['super_admin'],
  permissions: ['*'],
  roleCodes: ['super_admin'],
}

export default [
  // 获取用户路由权限
  {
    url: '/api/permission/routes',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: permissionRoutes,
        message: 'success',
      }
    },
  },
  
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: userInfo,
        message: 'success',
      }
    },
  },
] as MockMethod[]
