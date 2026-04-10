import type { Router } from 'vue-router'
import { useAppStore } from '@/store/modules/app'

export function createStateGuard(router: Router) {
  const appStore = useAppStore()

  router.afterEach(async (to: any) => {
    // 路由跳转后关闭页面加载状态
    if (appStore.getPageLoading) {
      appStore.setPageLoading(false)
    }

    // 设置 document title
    const title = to.meta.title as string
    if (title) {
      document.title = `${title} - 管理系统`
    }

    return true
  })
}
