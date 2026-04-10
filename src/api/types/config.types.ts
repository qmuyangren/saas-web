export interface ConfigItem {
  id: string
  key: string
  value: string
  type: 'string' | 'number' | 'boolean' | 'json'
  description?: string
  scope: 'global' | 'module' | 'user'
  createdAt?: string
  updatedAt?: string
}

export interface ConfigFormData {
  key: string
  value: string
  type: string
  description?: string
  scope: string
}
