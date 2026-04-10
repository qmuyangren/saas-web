import type { MockMethod } from 'vite-plugin-mock'

// 模拟用户信息
function createUserInfo(id: string) {
  const usernames = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十']
  const positions = ['工程师', '产品经理', '设计师', '运营专员', '管理员']
  const organizes = ['技术部', '产品部', '设计部', '运营部', '管理部']

  const randomIndex = Math.floor(Math.random() * usernames.length)
  return {
    id,
    username: usernames[randomIndex] + id,
    realName: usernames[randomIndex],
    email: `user${id}@example.com`,
    phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
    role: ['admin', 'manager', 'user'][Math.floor(Math.random() * 3)],
    status: ['active', 'inactive', 'suspended'][Math.floor(Math.random() * 3)],
    organizeId: String(Math.floor(Math.random() * 10)),
    organizeName: organizes[Math.floor(Math.random() * organizes.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    gender: Math.random() > 0.5 ? '1' : '2',
    birthday: '1990-01-01',
    createTime: '2024-01-01 00:00:00',
  }
}

// 模拟菜单数据
function createMenuData() {
  return [
    {
      id: '1',
      parentId: '0',
      name: '仪表盘',
      path: '/dashboard',
      component: 'layout',
      sort: 1,
      enable: true,
      icon: 'DashboardOutlined',
      type: '1',
      children: [
        {
          id: '1-1',
          parentId: '1',
          name: '工作台',
          path: '/dashboard/index',
          component: 'dashboard/index',
          sort: 1,
          enable: true,
          icon: 'DashboardOutlined',
          type: '2',
          permission: 'dashboard:view',
        },
      ],
    },
    {
      id: '2',
      parentId: '0',
      name: '系统管理',
      path: '/system',
      component: 'layout',
      sort: 2,
      enable: true,
      icon: 'SettingOutlined',
      type: '1',
      children: [
        {
          id: '2-1',
          parentId: '2',
          name: '用户管理',
          path: '/system/user',
          component: 'system/user/index',
          sort: 1,
          enable: true,
          icon: 'UserOutlined',
          type: '2',
          permission: 'system:user:list',
        },
        {
          id: '2-2',
          parentId: '2',
          name: '角色管理',
          path: '/system/role',
          component: 'system/role/index',
          sort: 2,
          enable: true,
          icon: 'TeamOutlined',
          type: '2',
          permission: 'system:role:list',
        },
        {
          id: '2-3',
          parentId: '2',
          name: '菜单管理',
          path: '/system/menu',
          component: 'system/menu/index',
          sort: 3,
          enable: true,
          icon: 'MenuOutlined',
          type: '2',
          permission: 'system:menu:list',
        },
        {
          id: '2-4',
          parentId: '2',
          name: '系统配置',
          path: '/system/config',
          component: 'system/config/index',
          sort: 4,
          enable: true,
          icon: 'ToolOutlined',
          type: '2',
          permission: 'system:config:list',
        },
      ],
    },
  ]
}

export default [
  // 获取用户信息
  {
    url: '/api/users/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: {
          userInfo: createUserInfo('1'),
          sysConfigInfo: {
            siteName: '管理系统',
            siteLogo: '/logo.png',
            loginIcon: '/login-bg.png',
          },
          menuList: createMenuData(),
          permissionList: ['*'],
        },
      }
    },
  },
  // 用户列表
  {
    url: '/api/users',
    method: 'get',
    response: ({ query }: { query: { page: number; pageSize: number; keyword?: string } }) => {
      const { page = 1, pageSize = 10, keyword = '' } = query
      const list = Array.from({ length: pageSize }, (_, i) => createUserInfo(String((page - 1) * pageSize + i + 1)))

      // 简单关键词过滤
      const filteredList = keyword
        ? list.filter(item => item.username.includes(keyword) || item.realName.includes(keyword))
        : list

      return {
        code: 0,
        msg: 'success',
        data: {
          list: filteredList,
          pagination: {
            page,
            pageSize,
            total: keyword ? filteredList.length : 100,
            totalPages: Math.ceil((keyword ? filteredList.length : 100) / pageSize),
          },
        },
      }
    },
  },
  // 获取用户详情
  {
    url: '/api/users/:id',
    method: 'get',
    response: (options: any) => {
      const params = options.params || {}
      return {
        code: 0,
        msg: 'success',
        data: createUserInfo(params.id),
      }
    },
  },
  // 创建用户
  {
    url: '/api/users',
    method: 'post',
    response: (options: any) => {
      const body = options.body || {}
      return {
        code: 0,
        msg: '创建成功',
        data: {
          id: String(Date.now()),
          ...body,
        },
      }
    },
  },
  // 更新用户
  {
    url: '/api/users/:id',
    method: 'put',
    response: (options: any) => {
      const params = options.params || {}
      const body = options.body || {}
      return {
        code: 0,
        msg: '更新成功',
        data: {
          id: params.id,
          ...body,
        },
      }
    },
  },
  // 删除用户
  {
    url: '/api/users/:id',
    method: 'delete',
    response: (options: any) => {
      const params = options.params || {}
      return {
        code: 0,
        msg: '删除成功',
        data: { ids: [params.id] },
      }
    },
  },
] as MockMethod[]
