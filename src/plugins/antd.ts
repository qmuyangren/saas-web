import type { App } from 'vue'
import Antd from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue'

export function setupAntd(app: App) {
  app.use(Antd)
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
  })
}
