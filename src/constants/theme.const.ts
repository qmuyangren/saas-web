export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode]

export const DEFAULT_THEME_COLOR = '#1890ff'
export const THEME_STORAGE_KEY = 'app-theme'

export const THEME_PRESETS = [
  { name: '默认蓝', color: '#1890ff' },
  { name: '极光绿', color: '#52c41a' },
  { name: '日落橙', color: '#faad14' },
  { name: '玫瑰红', color: '#ff4d4f' },
  { name: '极光紫', color: '#722ed1' },
]
