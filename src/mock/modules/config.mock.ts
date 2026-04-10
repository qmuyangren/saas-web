import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/system/configs',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        list: [
          { id: '1', key: 'SITE_NAME', value: '管理系统', type: 'string', description: '网站名称' },
          { id: '2', key: 'MAX_UPLOAD_SIZE', value: '10', type: 'number', description: '最大上传大小 (MB)' },
          { id: '3', key: 'ENABLE_REGISTER', value: 'true', type: 'boolean', description: '允许注册' },
          { id: '4', key: 'ADMIN_EMAILS', value: '["admin@example.com"]', type: 'json', description: '管理员邮箱列表' },
        ],
      },
      message: 'success',
    }),
  },
  {
    url: '/api/system/configs',
    method: 'post',
    response: () => ({ code: 0, data: { id: String(Date.now()) }, message: '创建成功' }),
  },
  {
    url: '/api/system/configs/:id',
    method: 'put',
    response: () => ({ code: 0, data: null, message: '更新成功' }),
  },
  {
    url: '/api/system/configs/:id',
    method: 'delete',
    response: () => ({ code: 0, data: null, message: '删除成功' }),
  },
] as MockMethod[]
