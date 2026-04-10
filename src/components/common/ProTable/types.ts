/**
 * ProTable 类型定义
 */

/**
 * 列配置
 */
export interface ProTableColumn {
  /** 列 key */
  key: string
  /** 列标题 */
  title: string
  /** 数据字段 */
  dataIndex?: string
  /** 是否可排序 */
  sortable?: boolean
  /** 是否可筛选 */
  filterable?: boolean
  /** 列宽 */
  width?: number | string
  /** 固定列 */
  fixed?: 'left' | 'right'
  /** 自定义渲染 */
  customRender?: (record: any, index: number) => any
  /** 插槽名称 */
  slot?: string
}

/**
 * 分页配置
 */
export interface ProTablePagination {
  /** 当前页 */
  current: number
  /** 每页条数 */
  pageSize: number
  /** 总条数 */
  total: number
  /** 显示条数切换 */
  showSizeChanger?: boolean
  /** 显示快速跳转 */
  showQuickJumper?: boolean
  /** 每页条数选项 */
  pageSizeOptions?: string[]
  /** 分页位置 */
  position?: 'top' | 'bottom' | 'both'
}

/**
 * 排序配置
 */
export interface ProTableSorter {
  /** 排序字段 */
  field?: string
  /** 排序方向 */
  order?: 'ascend' | 'descend'
}

/**
 * 筛选配置
 */
export interface ProTableFilters {
  [key: string]: any[]
}

/**
 * ProTable 请求参数
 */
export interface ProTableRequestParams {
  /** 当前页 */
  current: number
  /** 每页条数 */
  pageSize: number
  /** 排序字段 */
  sortField?: string
  /** 排序方向 */
  sortOrder?: 'ascend' | 'descend'
  /** 筛选条件 */
  filters?: ProTableFilters
  /** 搜索关键词 */
  keyword?: string
}

/**
 * ProTable 响应数据
 */
export interface ProTableResponse<T = any> {
  /** 数据列表 */
  list: T[]
  /** 总条数 */
  total: number
  /** 当前页 */
  current: number
  /** 每页条数 */
  pageSize: number
}

/**
 * ProTable 实例方法
 */
export interface ProTableInstance {
  /** 刷新表格 */
  refresh: () => void
  /** 导出表格 */
  export: () => void
  /** 重置分页 */
  resetPagination: () => void
  /** 设置分页 */
  setPagination: (pagination: Partial<ProTablePagination>) => void
}
