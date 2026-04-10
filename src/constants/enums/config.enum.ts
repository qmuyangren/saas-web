export const ConfigType = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  JSON: 'json',
} as const

export type ConfigType = (typeof ConfigType)[keyof typeof ConfigType]

export const ConfigScope = {
  GLOBAL: 'global',
  MODULE: 'module',
  USER: 'user',
} as const

export type ConfigScope = (typeof ConfigScope)[keyof typeof ConfigScope]

export const CONFIG_TYPE_LABELS: Record<string, string> = {
  string: '字符串',
  number: '数字',
  boolean: '布尔值',
  json: 'JSON',
}
