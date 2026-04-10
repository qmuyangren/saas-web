import type { App } from 'vue'
import { vPermission } from './permission'
import { vDebounce } from './debounce'
import { vThrottle } from './throttle'
import { vCopy } from './copy'
import { vLoading } from './loading'
import { vClickOutside } from './clickOutside'

export function setupDirectives(app: App) {
  app.directive('permission', vPermission)
  app.directive('debounce', vDebounce)
  app.directive('throttle', vThrottle)
  app.directive('copy', vCopy)
  app.directive('loading', vLoading)
  app.directive('click-outside', vClickOutside)
}
