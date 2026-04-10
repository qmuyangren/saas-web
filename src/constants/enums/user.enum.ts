export const Gender = {
  MALE: 'male',
  FEMALE: 'female',
  UNKNOWN: 'unknown',
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]

export const UserLevel = {
  VIP: 'vip',
  REGULAR: 'regular',
  TRIAL: 'trial',
} as const

export type UserLevel = (typeof UserLevel)[keyof typeof UserLevel]

export const GENDER_LABELS: Record<string, string> = {
  male: '男',
  female: '女',
  unknown: '未知',
}

export const USER_LEVEL_LABELS: Record<string, string> = {
  vip: 'VIP 用户',
  regular: '普通用户',
  trial: '试用用户',
}
