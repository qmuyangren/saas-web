import { defineStore } from 'pinia'
import { TOKEN_KEY, USER_INFO_KEY, MENU_LIST_KEY } from '@/constants'
import { Persistent } from '@/utils/cache'
import { loginApi, getUserInfoApi, logoutApi, refreshTokenApi } from '@/api'
import type { UserInfo, LoginParams } from '@/types'

export interface UserState {
  userInfo: UserInfo | null
  token: string
  menuList: any[]
  permissionList: string[]
  lastUpdateTime: number
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: Persistent.getLocal(TOKEN_KEY) || '',
    menuList: [],
    permissionList: [],
    lastUpdateTime: 0,
  }),

  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || (Persistent.getLocal(USER_INFO_KEY) as UserInfo) || {}
    },

    getToken(): string {
      return this.token || Persistent.getLocal(TOKEN_KEY) || ''
    },

    getMenuList(): any[] {
      return this.menuList
    },

    getPermissionList(): string[] {
      return this.permissionList
    },

    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },

    isLoggedIn(): boolean {
      return !!this.token
    },
  },

  actions: {
    setToken(token: string | undefined) {
      this.token = token || ''
      Persistent.setLocal(TOKEN_KEY, token)
    },

    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = Date.now()
      Persistent.setLocal(USER_INFO_KEY, info)
    },

    setMenuList(menuList: any[]) {
      this.menuList = menuList
      Persistent.setLocal(MENU_LIST_KEY, menuList)
    },

    setPermissionList(list: string[]) {
      this.permissionList = list
    },

    resetState() {
      this.userInfo = null
      this.token = ''
      this.menuList = []
      this.permissionList = []
      this.lastUpdateTime = 0
      Persistent.clearLocal(TOKEN_KEY)
      Persistent.clearLocal(USER_INFO_KEY)
      Persistent.clearLocal(MENU_LIST_KEY)
    },

    async login(params: LoginParams): Promise<UserInfo | null> {
      try {
        const res = await loginApi(params)
        const { token } = res.data
        this.setToken(token)
        return await this.afterLoginAction()
      } catch (error) {
        console.error('Login failed:', error)
        return null
      }
    },

    async afterLoginAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userInfo = await this.getUserInfoAction()
      return userInfo
    },

    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      try {
        const res = await getUserInfoApi()
        const data = res.data as any
        const userInfo = data.userInfo
        const menuList = data.menuList || []
        const permissionList = data.permissionList || []
        this.setUserInfo(userInfo)
        this.setMenuList(menuList)
        this.setPermissionList(permissionList)
        return userInfo
      } catch (error) {
        console.error('Get user info failed:', error)
        return null
      }
    },

    async logout() {
      try {
        await logoutApi()
      } catch (error) {
        console.error('Logout failed:', error)
      }
      this.resetState()
    },

    async refreshToken(refreshToken: string): Promise<UserInfo | null> {
      try {
        const res = await refreshTokenApi(refreshToken)
        const { token } = res.data
        this.setToken(token)
        return await this.afterLoginAction()
      } catch (error) {
        console.error('Refresh token failed:', error)
        return null
      }
    },

    init() {
      const savedToken = Persistent.getLocal(TOKEN_KEY) as string | null
      if (savedToken) {
        this.token = savedToken
      }
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore()
}
