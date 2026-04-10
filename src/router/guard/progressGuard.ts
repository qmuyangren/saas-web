import type { Router } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

nprogress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
})

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    if (to.path === from.path) {
      return true
    }

    if (to.meta.loaded) {
      return true
    }

    nprogress.start()
    return true
  })

  router.afterEach(async (to: any) => {
    to.meta.loaded = true
    nprogress.done()
    return true
  })
}
