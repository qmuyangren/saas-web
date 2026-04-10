import type { MockMethod } from 'vite-plugin-mock'

export default [
  // 登录
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }: { body: { username: string; password: string } }) => {
      const { username, password } = body

      // 模拟验证
      if (username === 'admin' && password === '123456') {
        return {
          code: 0,
          msg: 'success',
          data: {
            token: 'mock-token-' + Date.now(),
            expiresIn: 7200,
          },
        }
      }

      return {
        code: 401,
        msg: '用户名或密码错误',
        data: null,
      }
    },
  },
  // 登出
  {
    url: '/api/auth/logout',
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: null,
      }
    },
  },
  // 刷新 Token
  {
    url: '/api/auth/refresh',
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: {
          token: 'mock-token-refresh-' + Date.now(),
          expiresIn: 7200,
        },
      }
    },
  },
] as MockMethod[]
