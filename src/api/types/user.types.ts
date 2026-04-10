export interface UserListParams {
  page: number
  pageSize: number
  keyword?: string
  status?: string
  role?: string
  sortField?: string
  sortOrder?: 'asc' | 'desc'
}

export interface UserFormData {
  username: string
  email: string
  phone?: string
  role: string
  status: 'active' | 'inactive'
  password?: string
}
