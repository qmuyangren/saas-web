import type { MockMethod } from 'vite-plugin-mock'

export default [
  // 获取统计概览
  {
    url: '/api/dashboard/overview',
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: {
          totalUsers: 1234,
          totalOrders: 5678,
          totalRevenue: 99999.99,
          growthRate: 12.5,
        },
      }
    },
  },
  // 获取趋势数据
  {
    url: '/api/dashboard/trend',
    method: 'get',
    response: () => {
      const months = ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']
      const generateData = () => months.map(month => ({
        name: month,
        value: Math.floor(Math.random() * 1000) + 500,
      }))

      return {
        code: 0,
        msg: 'success',
        data: {
          userTrend: generateData(),
          orderTrend: generateData(),
          revenueTrend: generateData(),
        },
      }
    },
  },
  // 获取活动记录
  {
    url: '/api/dashboard/activity',
    method: 'get',
    response: () => {
      const activities = [
        { id: '1', type: 'user', title: '新用户注册', time: '5 分钟前' },
        { id: '2', type: 'order', title: '新订单产生', time: '10 分钟前' },
        { id: '3', type: 'system', title: '系统更新完成', time: '1 小时前' },
        { id: '4', type: 'user', title: '用户信息更新', time: '2 小时前' },
        { id: '5', type: 'order', title: '订单已完成', time: '3 小时前' },
      ]

      return {
        code: 0,
        msg: 'success',
        data: {
          list: activities,
        },
      }
    },
  },
] as MockMethod[]
