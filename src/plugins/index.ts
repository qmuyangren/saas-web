import type { App } from 'vue'
import { setupDirectives } from '@/directives'

export function setupPlugins(app: App) {
  setupDirectives(app)
}
