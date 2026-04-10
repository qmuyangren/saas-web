import type { RouteRecordRaw } from 'vue-router'

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'PageNotFound',
  redirect: '/404',
  meta: { title: '404', hidden: true },
}

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  name: 'Redirect',
  component: {
    render() {
      const { params, query } = this.$route
      const { path } = params
      return this.$router.replace({
        path: '/' + (Array.isArray(path) ? path.join('/') : path),
        query,
      })
    },
  },
  meta: { hidden: true },
}

export const ERROR_LOG_ROUTE: RouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: {
    render() {
      return 'Error Log Page'
    },
  },
  meta: { title: '错误日志', hidden: true },
}
