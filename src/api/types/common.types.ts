export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

export interface PaginatedResponse<T> {
  list: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface PaginatedParams {
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
}
