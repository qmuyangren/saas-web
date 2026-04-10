export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

export const ROLE_LABELS: Record<string, string> = {
  super_admin: '超级管理员',
  admin: '管理员',
  manager: '经理',
  user: '普通用户',
}

export const ROLE_COLORS: Record<string, string> = {
  super_admin: 'red',
  admin: 'orange',
  manager: 'blue',
  user: 'green',
}
