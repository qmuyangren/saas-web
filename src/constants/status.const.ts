export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum CommonStatus {
  ENABLED = 1,
  DISABLED = 0,
}

export const STATUS_LABELS: Record<string, string> = {
  active: '活跃',
  inactive: '禁用',
  suspended: '已冻结',
  enabled: '启用',
  disabled: '停用',
}

export const STATUS_COLORS: Record<string, string> = {
  active: 'green',
  inactive: 'red',
  suspended: 'orange',
  enabled: 'green',
  disabled: 'red',
}
