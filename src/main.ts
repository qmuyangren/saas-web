import { createApp } from 'vue'

// Ant Design Vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 图标
import * as Icons from '@ant-design/icons-vue'

// 进度条
import 'nprogress/nprogress.css'

// 样式
import '@/assets/styles/index.scss'

import App from './App.vue'
import pinia from './store'
import router from './router'

const app = createApp(App)

// 注册所有图标为全局组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(pinia)
app.use(router)
app.use(Antd)

// 在 Pinia 和 Router 都初始化后，创建路由守卫
import { createRouterGuard } from './router/guard'
createRouterGuard(router)

app.mount('#app')
