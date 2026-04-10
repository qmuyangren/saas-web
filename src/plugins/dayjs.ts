import type { App } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export function setupDayjs(app: App) {
  app.config.globalProperties.$dayjs = dayjs
}
