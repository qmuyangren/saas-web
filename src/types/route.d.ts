export interface RouteMeta {
  title?: string
  icon?: string
  requiresAuth?: boolean
  roles?: string[]
  permissions?: string[]
  hidden?: boolean
  keepAlive?: boolean
  affix?: boolean
  breadcrumb?: string
}
