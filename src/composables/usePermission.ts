import { useUserStore } from '@/store/modules/user'

export function usePermission() {
  const userStore = useUserStore()

  const hasPermission = (permission: string) => {
    return userStore.getUserInfo?.permissions?.includes(permission) ||
           userStore.getUserInfo?.permissions?.includes('*')
  }

  const hasAnyPermission = (permissions: string[]) => {
    return permissions.some(p => hasPermission(p))
  }

  const hasAllPermissions = (permissions: string[]) => {
    return permissions.every(p => hasPermission(p))
  }

  const hasRole = (role: string) => {
    return userStore.getUserInfo?.role === role ||
           userStore.getUserInfo?.role === 'super_admin'
  }

  return { hasPermission, hasAnyPermission, hasAllPermissions, hasRole }
}
