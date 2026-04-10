# Vue3 + Ant Design Vue + TypeScript + UnoCSS 完整前端框架设计方案

> 本文档定义了一套完整的企业级 SaaS 后台管理前端框架规范，AI 可根据此方案生成完整项目。

---

## 一、技术栈总览

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.4+ | 前端框架 |
| TypeScript | 5.3+ | 类型系统 |
| Vite | 5.0+ | 构建工具 |
| Ant Design Vue | 4.1+ | UI 组件库 |
| UnoCSS | 0.58+ | 原子化 CSS 引擎 |
| Pinia | 2.1+ | 状态管理 |
| Vue Router | 4.2+ | 路由管理 |
| Axios | 1.6+ | HTTP 请求 |
| VueUse | 10.7+ | 组合式工具集 |
| Vitest | 1.0+ | 单元测试 |

---

## 二、项目完整目录结构

```
project-frontend/
├── public/                        
│   ├── favicon.ico
│   └── robots.txt
│
├── src/                           
│   ├── main.ts                    
│   ├── App.vue                    
│   ├── env.d.ts                   
│   │
│   ├── api/                       
│   │   ├── index.ts               
│   │   ├── request.ts             
│   │   ├── modules/               
│   │   │   ├── user.ts            
│   │   │   ├── auth.ts            
│   │   │   ├── config.ts          
│   │   │   └── dashboard.ts       
│   │   ├── types/                 
│   │   │   ├── user.types.ts      
│   │   │   ├── auth.types.ts      
│   │   │   ├── config.types.ts    
│   │   │   └── common.types.ts    
│   │   └── interceptors/          
│   │       ├── auth.interceptor.ts
│   │       ├── error.interceptor.ts
│   │       └── log.interceptor.ts 
│   │
│   ├── assets/                    
│   │   ├── images/                
│   │   │   ├── logo.png
│   │   │   └── icons/
│   │   ├── styles/                
│   │   │   ├── index.scss         
│   │   │   ├── variables.scss     
│   │   │   ├── mixins.scss        
│   │   │   ├── reset.scss         
│   │   │   ├── antd-override.scss 
│   │   │   └── uno.config.ts      # UnoCSS配置文件
│   │   └── fonts/                 
│   │
│   ├── components/                
│   │   ├── index.ts               
│   │   ├── common/                
│   │   │   ├── AppButton/         
│   │   │   │   ├── index.vue      
│   │   │   │   ├── types.ts       
│   │   │   │   └── styles.module.scss
│   │   │   ├── AppInput/          
│   │   │   │   └── index.vue      
│   │   │   ├── AppModal/          
│   │   │   │   └── index.vue      
│   │   │   ├── AppTable/          
│   │   │   │   ├── index.vue      
│   │   │   │   ├── types.ts       
│   │   │   │   └── components/    
│   │   │   │       ├── TableAction.vue
│   │   │   │       └── TableFilter.vue
│   │   │   ├── AppCard/           
│   │   │   │   └── index.vue      
│   │   │   └── AppPagination/     
│   │   │       └── index.vue      
│   │   │
│   │   ├── business/              
│   │   │   ├── UserAvatar/        
│   │   │   │   └── index.vue      
│   │   │   ├── UserSelector/      
│   │   │   │   ├── index.vue      
│   │   │   │   └── types.ts       
│   │   │   ├── RoleTag/           
│   │   │   │   └── index.vue      
│   │   │   ├── StatusBadge/       
│   │   │   │   └── index.vue      
│   │   │   ├── SearchForm/        
│   │   │   │   ├── index.vue      
│   │   │   │   └── types.ts       
│   │   │   └── ConfirmModal/      
│   │   │       └── index.vue      
│   │   │
│   │   └── layout/                
│   │       ├── index.vue          
│   │       ├── DefaultLayout.vue  
│   │       ├── BlankLayout.vue    
│   │       ├── components/        
│   │       │   ├── AppHeader.vue  
│   │       │   ├── AppSidebar.vue 
│   │       │   ├── AppFooter.vue  
│   │       │   ├── AppTabs.vue    
│   │       │   └── Breadcrumb.vue 
│   │       └── hooks/             
│   │           └── useLayout.ts   
│   │
│   ├── views/                     
│   │   ├── index.ts               
│   │   ├── login/                 
│   │   │   ├── index.vue          
│   │   │   ├── components/        
│   │   │   │   ├── LoginForm.vue  
│   │   │   │   ├── RegisterForm.vue
│   │   │   │   └── ResetPassword.vue
│   │   │   ├── hooks/             
│   │   │   │   └── useLogin.ts    
│   │   │   └── types.ts           
│   │   │
│   │   ├── dashboard/             
│   │   │   ├── index.vue          
│   │   │   ├── components/        
│   │   │   │   ├── StatCard.vue   
│   │   │   │   ├── TrendChart.vue 
│   │   │   │   ├── RecentActivity.vue
│   │   │   │   └── QuickActions.vue
│   │   │   └── hooks/             
│   │   │       └── useDashboard.ts
│   │   │
│   │   ├── user/                  
│   │   │   ├── index.vue          
│   │   │   ├── detail.vue         
│   │   │   ├── profile.vue        
│   │   │   ├── components/        
│   │   │   │   ├── UserForm.vue   
│   │   │   │   ├── UserSearch.vue 
│   │   │   │   ├── UserTable.vue  
│   │   │   │   └── UserPermission.vue
│   │   │   ├── hooks/             
│   │   │   │   ├── useUserList.ts 
│   │   │   │   ├── useUserDetail.ts
│   │   │   │   └── useUserForm.ts 
│   │   │   └── types.ts           
│   │   │
│   │   ├── system/                
│   │   │   ├── config/            
│   │   │   │   ├── index.vue      
│   │   │   │   ├── components/    
│   │   │   │   │   ├── ConfigForm.vue
│   │   │   │   │   └── ConfigTable.vue
│   │   │   │   └── hooks/         
│   │   │   │       └── useConfig.ts
│   │   │   ├── role/              
│   │   │   │   ├── index.vue      
│   │   │   │   ├── components/    
│   │   │   │   │   ├── RoleForm.vue
│   │   │   │   │   └── PermissionTree.vue
│   │   │   │   └── hooks/         
│   │   │   │       └── useRole.ts 
│   │   │   └── menu/              
│   │   │       ├── index.vue      
│   │   │       └── components/    
│   │   │           └── MenuEditor.vue
│   │   │
│   │   ├── error/                 
│   │   │   ├── 401.vue            
│   │   │   ├── 403.vue            
│   │   │   ├── 404.vue            
│   │   │   └── 500.vue            
│   │   │
│   │   └── redirect/              
│   │       └── index.vue          
│   │
│   ├── router/                    
│   │   ├── index.ts               
│   │   ├── routes.ts              
│   │   ├── guards/                
│   │   │   ├── auth.guard.ts      
│   │   │   ├── permission.guard.ts
│   │   │   └── progress.guard.ts  
│   │   ├── modules/               
│   │   │   ├── user.routes.ts     
│   │   │   ├── system.routes.ts   
│   │   │   └── dashboard.routes.ts
│   │   └── types.ts               
│   │
│   ├── store/                     
│   │   ├── index.ts               
│   │   ├── modules/               
│   │   │   ├── user.ts            
│   │   │   ├── app.ts             
│   │   │   ├── permission.ts      
│   │   │   ├── config.ts          
│   │   │   └── tabs.ts            
│   │   ├── plugins/               
│   │   │   ├── persistence.ts     
│   │   │   └── logger.ts          
│   │   └── types.ts               
│   │
│   ├── composables/               
│   │   ├── index.ts               
│   │   ├── useRequest.ts          
│   │   ├── useTable.ts            
│   │   ├── usePagination.ts       
│   │   ├── useModal.ts            
│   │   ├── useDrawer.ts           
│   │   ├── useForm.ts             
│   │   ├── useAuth.ts             
│   │   ├── usePermission.ts       
│   │   ├── useCache.ts            
│   │   ├── useTheme.ts            # 主题切换（UnoCSS 暗色模式）
│   │   ├── useDebounce.ts         
│   │   ├── useThrottle.ts         
│   │   ├── useInterval.ts         
│   │   └── useEventListener.ts    
│   │
│   ├── utils/                     
│   │   ├── index.ts               
│   │   ├── storage.ts             
│   │   ├── auth.ts                
│   │   ├── format.ts              
│   │   │   ├── date.ts            
│   │   │   ├── number.ts          
│   │   │   └── currency.ts        
│   │   ├── validate.ts            
│   │   ├── download.ts            
│   │   ├── copy.ts                
│   │   ├── tree.ts                
│   │   ├── array.ts               
│   │   └── dom.ts                 
│   │
│   ├── directives/                
│   │   ├── index.ts               
│   │   ├── permission.ts          
│   │   ├── debounce.ts            
│   │   ├── throttle.ts            
│   │   ├── copy.ts                
│   │   ├── loading.ts             
│   │   └── clickOutside.ts        
│   │
│   ├── plugins/                   
│   │   ├── index.ts               
│   │   ├── antd.ts                
│   │   ├── unocss.ts              # UnoCSS 插件配置
│   │   ├── icon.ts                
│   │   ├── i18n.ts                
│   │   └── dayjs.ts               
│   │
│   ├── constants/                 
│   │   ├── index.ts               
│   │   ├── system.const.ts        
│   │   ├── menu.const.ts          
│   │   ├── role.const.ts          
│   │   ├── status.const.ts        
│   │   ├── regex.const.ts         
│   │   ├── theme.const.ts         # 主题常量
│   │   └── enums/                 
│   │       ├── user.enum.ts       
│   │       ├── config.enum.ts     
│   │       └── common.enum.ts     
│   │
│   ├── types/                     
│   │   ├── index.ts               
│   │   ├── global.d.ts            
│   │   ├── api.d.ts               
│   │   ├── route.d.ts             
│   │   ├── store.d.ts             
│   │   ├── components.d.ts        
│   │   ├── unocss.d.ts            # UnoCSS 类型声明
│   │   └── vite-env.d.ts          
│   │
│   ├── locales/                   
│   │   ├── index.ts               
│   │   ├── lang/                  
│   │   │   ├── zh-CN.ts           
│   │   │   ├── en-US.ts           
│   │   │   └── zh-TW.ts           
│   │   └── modules/               
│   │       ├── user.ts            
│   │       ├── common.ts          
│   │       └── system.ts          
│   │
│   └── mock/                      
│       ├── index.ts               
│       ├── modules/               
│       │   ├── user.mock.ts       
│       │   ├── auth.mock.ts       
│       │   └── config.mock.ts     
│       └── types.ts               
│
├── tests/                         
│   ├── unit/                      
│   │   ├── components/            
│   │   │   └── AppButton.spec.ts  
│   │   ├── composables/           
│   │   │   └── useRequest.spec.ts 
│   │   ├── utils/                 
│   │   │   └── format.spec.ts     
│   │   └── store/                 
│   │       └── user.spec.ts       
│   ├── integration/               
│   │   ├── api/                   
│   │   │   └── user.api.spec.ts   
│   │   └── router/                
│   │       └── auth.guard.spec.ts 
│   ├── e2e/                       
│   │   ├── login.spec.ts          
│   │   └── user.spec.ts           
│   ├── fixtures/                  
│   │   ├── user.fixture.ts        
│   │   └── config.fixture.ts      
│   └── setup.ts                   
│
├── scripts/                       
│   ├── build.ts                   
│   └── deploy.sh                  
│
├── .env.example                   
├── .env.development               
├── .env.production                
├── .env.staging                   
├── .eslintrc.js                   
├── .prettierrc                    
├── .gitignore                     
├── index.html                     
├── package.json                   
├── tsconfig.json                  
├── tsconfig.node.json             
├── vite.config.ts                 
├── uno.config.ts                  # UnoCSS 根配置
├── vitest.config.ts               
├── README.md                      
└── docker-compose.yml             
```

---

## 三、UnoCSS 完整配置方案

### 3.1 UnoCSS 根配置文件（`uno.config.ts`）

```typescript
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // 预设配置
  presets: [
    presetUno(), // 基础工具类（兼容 Tailwind）
    presetAttributify(), // 属性化模式
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(), // 排版样式
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'Fira Code',
      },
    }),
  ],
  
  // 自定义规则
  rules: [
    // 自定义动画
    ['animate-fade-in', { animation: 'fade-in 0.3s ease-in-out' }],
    ['animate-slide-up', { animation: 'slide-up 0.3s ease-out' }],
    
    // 自定义间距（扩展）
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${parseInt(d) * 0.25}rem` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${parseInt(d) * 0.25}rem` })],
    
    // 自定义字体大小
    [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${parseInt(d)}px` })],
  ],
  
  // 快捷方式（组合常用类）
  shortcuts: {
    // 按钮样式
    'btn': 'px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    'btn-primary': 'btn bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    'btn-secondary': 'btn bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    'btn-danger': 'btn bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    
    // 卡片样式
    'card': 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
    'card-hover': 'card hover:shadow-md transition-shadow duration-200',
    
    // 布局辅助
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',
    
    // 文本样式
    'text-ellipsis': 'overflow-hidden text-ellipsis whitespace-nowrap',
    'text-ellipsis-2': 'overflow-hidden text-ellipsis line-clamp-2',
    
    // 页面容器
    'page-container': 'p-6 max-w-[1400px] mx-auto',
    'page-header': 'mb-6',
    'page-title': 'text-2xl font-bold text-gray-800',
    'page-subtitle': 'text-sm text-gray-500 mt-1',
  },
  
  // 主题配置（与 Ant Design 对齐）
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1890ff',
        light: '#40a9ff',
        dark: '#096dd9',
        lighter: '#e6f7ff',
      },
      success: '#52c41a',
      warning: '#faad14',
      error: '#ff4d4f',
      info: '#1890ff',
    },
    spacing: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    borderRadius: {
      sm: '0.25rem',
      DEFAULT: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  
  // 变体
  variants: [
    // 自定义变体
    (matcher) => {
      if (matcher.startsWith('hover:')) {
        return {
          matcher: matcher.slice(6),
          selector: s => `${s}:hover`,
        }
      }
      return matcher
    },
  ],
  
  // 转换器
  transformers: [
    transformerDirectives(), // 支持 @apply 指令
    transformerVariantGroup(), // 支持分组变体
  ],
  
  // 安全列表（确保动态类名生效）
  safelist: [
    'bg-primary',
    'bg-success',
    'bg-warning',
    'bg-error',
    'text-primary',
    'text-success',
    'text-warning',
    'text-error',
    'border-primary',
    'border-success',
    /^bg-(red|blue|green|yellow|gray)-(100|200|300|400|500|600|700)$/,
    /^text-(red|blue|green|yellow|gray)-(100|200|300|400|500|600|700)$/,
  ],
  
  // 预检（可选）
  preflights: [
    {
      layer: 'base',
      getCSS: () => `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `,
    },
  ],
})
```

### 3.2 样式入口文件（`assets/styles/index.scss`）

```scss
// assets/styles/index.scss

// 1. UnoCSS 样式（必须在最前面）
@import 'uno.css';

// 2. 变量定义
@import './variables.scss';

// 3. 样式重置
@import './reset.scss';

// 4. Mixins
@import './mixins.scss';

// 5. Ant Design 样式覆盖
@import './antd-override.scss';

// 6. 全局自定义样式
@import './global.scss';
```

### 3.3 主题变量（`assets/styles/variables.scss`）

```scss
// assets/styles/variables.scss

:root {
  // 主题色（与 UnoCSS theme 对齐）
  --primary-color: #1890ff;
  --primary-color-light: #40a9ff;
  --primary-color-dark: #096dd9;
  --primary-color-lighter: #e6f7ff;
  
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #ff4d4f;
  --info-color: #1890ff;
  
  // 中性色
  --text-color: rgba(0, 0, 0, 0.85);
  --text-color-secondary: rgba(0, 0, 0, 0.45);
  --text-color-disabled: rgba(0, 0, 0, 0.25);
  
  --border-color: #d9d9d9;
  --border-color-light: #f0f0f0;
  
  --bg-color: #f0f2f5;
  --bg-color-container: #ffffff;
  
  // 间距
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  // 圆角
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
  
  // 阴影
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  --shadow-md: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 16px 0 rgba(0, 0, 0, 0.12);
  
  // 动画
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
}

// 暗色模式（配合 UnoCSS dark: 变体）
.dark {
  --primary-color: #177ddc;
  --primary-color-light: #3c9ae8;
  --primary-color-dark: #0050b3;
  
  --text-color: rgba(255, 255, 255, 0.85);
  --text-color-secondary: rgba(255, 255, 255, 0.45);
  --text-color-disabled: rgba(255, 255, 255, 0.25);
  
  --border-color: #434343;
  --border-color-light: #303030;
  
  --bg-color: #000000;
  --bg-color-container: #141414;
}
```

### 3.4 Ant Design 样式覆盖（`assets/styles/antd-override.scss`）

```scss
// assets/styles/antd-override.scss

// 覆盖 Ant Design 的默认样式，使其与 UnoCSS 主题统一
.ant-btn {
  &.ant-btn-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    
    &:hover,
    &:focus {
      background-color: var(--primary-color-light);
      border-color: var(--primary-color-light);
    }
  }
}

.ant-table {
  border-radius: var(--border-radius-md);
  overflow: hidden;
  
  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: 500;
    
    .dark & {
      background-color: #1f1f1f;
    }
  }
}

.ant-card {
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  
  .ant-card-head {
    border-bottom-color: var(--border-color-light);
  }
}

.ant-modal {
  .ant-modal-content {
    border-radius: var(--border-radius-lg);
  }
}

.ant-pagination {
  .ant-pagination-item {
    border-radius: var(--border-radius-sm);
    
    &.ant-pagination-item-active {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      
      a {
        color: white;
      }
    }
  }
}
```

---

## 四、核心配置文件

### 4.1 Vite 配置（`vite.config.ts`）

```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  return {
    plugins: [
      vue(),
      UnoCSS(), // UnoCSS 插件
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less', // 或 'css'
          }),
        ],
        dts: 'src/types/components.d.ts',
      }),
    ],
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/variables.scss";`,
        },
        less: {
          modifyVars: {
            'primary-color': '#1890ff',
            'border-radius-base': '6px',
          },
          javascriptEnabled: true,
        },
      },
    },
    
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            antd: ['ant-design-vue', '@ant-design/icons-vue'],
            utils: ['axios', 'dayjs', 'lodash-es'],
          },
        },
      },
    },
  }
})
```

### 4.2 TypeScript 配置（`tsconfig.json`）

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    
    "types": ["vite/client", "unplugin-vue-components/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}
```

### 4.3 环境变量配置（`.env.example`）

```bash
# .env.example

# 应用配置
VITE_APP_TITLE=管理系统
VITE_APP_VERSION=1.0.0

# API 配置
VITE_APP_API_BASE_URL=/api
VITE_APP_API_TIMEOUT=30000

# 开发配置
VITE_APP_USE_MOCK=true
VITE_APP_OPEN_DEVTOOLS=true

# 主题配置
VITE_APP_THEME_COLOR=#1890ff
VITE_APP_DARK_MODE=false
```

---

## 五、核心模块代码示例

### 5.1 主入口文件（`main.ts`）

```typescript
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import App from './App.vue'
import router from './router'
import { setupUnoCSS } from './plugins/unocss'

// 样式
import '@/assets/styles/index.scss'

const app = createApp(App)

// Pinia 状态管理
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// 路由
app.use(router)

// Ant Design Vue
app.use(Antd)

// UnoCSS 配置（全局指令等）
setupUnoCSS(app)

// 挂载
app.mount('#app')
```

### 5.2 UnoCSS 插件配置（`plugins/unocss.ts`）

```typescript
// plugins/unocss.ts
import type { App } from 'vue'

export function setupUnoCSS(app: App) {
  // 注册全局指令（如需要）
  app.directive('unocss', {
    mounted(el) {
      // 处理动态类名
      const classes = el.getAttribute('unocss')
      if (classes) {
        el.classList.add(...classes.split(' '))
      }
    },
  })
}
```

### 5.3 主题组合式函数（`composables/useTheme.ts`）

```typescript
// composables/useTheme.ts
import { ref, watchEffect } from 'vue'
import { useAppStore } from '@/store/modules/app'

export function useTheme() {
  const appStore = useAppStore()
  const isDark = ref(appStore.theme === 'dark')
  
  // 切换暗色模式
  const toggleDark = () => {
    isDark.value = !isDark.value
    appStore.setTheme(isDark.value ? 'dark' : 'light')
    updateDOMTheme()
  }
  
  // 设置暗色模式
  const setDark = (dark: boolean) => {
    isDark.value = dark
    appStore.setTheme(dark ? 'dark' : 'light')
    updateDOMTheme()
  }
  
  // 更新 DOM 主题类
  const updateDOMTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  // 初始化主题
  const initTheme = () => {
    const savedTheme = appStore.theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (savedTheme === 'auto' && prefersDark)) {
      setDark(true)
    } else {
      setDark(false)
    }
  }
  
  // 监听系统主题变化
  const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (appStore.theme === 'auto') {
        setDark(e.matches)
      }
    })
  }
  
  return {
    isDark,
    toggleDark,
    setDark,
    initTheme,
    watchSystemTheme,
  }
}
```

### 5.4 布局组件示例（`components/layout/components/AppHeader.vue`）

```vue
<!-- components/layout/components/AppHeader.vue -->
<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between h-16 px-6">
      <!-- Logo 区域 -->
      <div class="flex items-center gap-4">
        <button 
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          @click="toggleSidebar"
        >
          <i class="i-carbon-menu text-xl" />
        </button>
        <div class="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" class="w-8 h-8" />
          <span class="text-lg font-bold text-gray-800 dark:text-white hidden sm:inline">
            {{ appTitle }}
          </span>
        </div>
      </div>
      
      <!-- 右侧操作区 -->
      <div class="flex items-center gap-2">
        <!-- 搜索 -->
        <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <i class="i-carbon-search text-xl" />
        </button>
        
        <!-- 通知 -->
        <a-badge :count="unreadCount" :overflow-count="99">
          <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <i class="i-carbon-notification text-xl" />
          </button>
        </a-badge>
        
        <!-- 主题切换 -->
        <button 
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="toggleTheme"
        >
          <i v-if="isDark" class="i-carbon-sun text-xl" />
          <i v-else class="i-carbon-moon text-xl" />
        </button>
        
        <!-- 用户下拉 -->
        <a-dropdown :trigger="['click']">
          <div class="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <a-avatar :src="userAvatar" :size="32">
              {{ userInitial }}
            </a-avatar>
            <span class="hidden md:inline text-gray-700 dark:text-gray-300">
              {{ userName }}
            </span>
            <i class="i-carbon-chevron-down text-sm" />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="goToProfile">
                <i class="i-carbon-user mr-2" />
                个人资料
              </a-menu-item>
              <a-menu-item @click="goToSettings">
                <i class="i-carbon-settings mr-2" />
                系统设置
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="logout">
                <i class="i-carbon-logout mr-2" />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const { isDark, toggleDark } = useTheme()

const appTitle = import.meta.env.VITE_APP_TITLE
const userName = computed(() => userStore.userInfo?.username || '用户')
const userAvatar = computed(() => userStore.userInfo?.avatar)
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())
const unreadCount = ref(0) // 从接口获取

const toggleSidebar = () => {
  appStore.toggleSidebar()
}

const toggleTheme = () => {
  toggleDark()
}

const goToProfile = () => {
  router.push('/user/profile')
}

const goToSettings = () => {
  router.push('/system/config')
}

const logout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>
```

### 5.5 页面示例（`views/user/index.vue`）

```vue
<!-- views/user/index.vue -->
<template>
  <div class="page-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">用户管理</h1>
      <p class="page-subtitle">管理平台所有用户账号信息</p>
    </div>
    
    <!-- 操作栏 -->
    <div class="flex-between mb-6">
      <div class="flex gap-2">
        <a-button type="primary" @click="handleCreate">
          <i class="i-carbon-add mr-1" />
          新建用户
        </a-button>
        <a-button @click="handleExport">
          <i class="i-carbon-download mr-1" />
          导出
        </a-button>
      </div>
      <div class="flex gap-2">
        <a-input-search
          v-model:value="searchKeyword"
          placeholder="搜索用户名/邮箱"
          style="width: 260px"
          @search="handleSearch"
        />
        <a-button @click="handleReset">
          <i class="i-carbon-reset" />
        </a-button>
      </div>
    </div>
    
    <!-- 用户表格 -->
    <div class="card">
      <a-table
        :columns="columns"
        :data-source="userList"
        :loading="loading"
        :pagination="false"
        row-key="id"
        @change="handleTableChange"
      >
        <!-- 头像列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <a-avatar :src="record.avatar" :size="32">
              {{ record.username?.charAt(0).toUpperCase() }}
            </a-avatar>
          </template>
          
          <!-- 状态列 -->
          <template v-else-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ getStatusText(record.status) }}
            </a-tag>
          </template>
          
          <!-- 角色列 -->
          <template v-else-if="column.key === 'role'">
            <a-tag :color="getRoleColor(record.role)">
              {{ getRoleText(record.role) }}
            </a-tag>
          </template>
          
          <!-- 操作列 -->
          <template v-else-if="column.key === 'action'">
            <div class="flex gap-2">
              <a-button type="link" size="small" @click="handleEdit(record)">
                编辑
              </a-button>
              <a-button 
                type="link" 
                size="small" 
                danger 
                @click="handleDelete(record)"
              >
                删除
              </a-button>
              <a-dropdown>
                <a-button type="link" size="small">
                  更多 <i class="i-carbon-chevron-down" />
                </a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="handleResetPassword(record)">
                      重置密码
                    </a-menu-item>
                    <a-menu-item @click="handleViewPermissions(record)">
                      查看权限
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item v-if="record.status === 'active'" danger @click="handleDisable(record)">
                      禁用账号
                    </a-menu-item>
                    <a-menu-item v-else @click="handleEnable(record)">
                      启用账号
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </template>
        </template>
      </a-table>
      
      <!-- 分页 -->
      <div class="flex justify-end mt-4">
        <a-pagination
          v-model:current="pagination.current"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :show-size-changer="true"
          :show-quick-jumper="true"
          :show-total="(total) => `共 ${total} 条`"
          @change="handlePageChange"
          @show-size-change="handleSizeChange"
        />
      </div>
    </div>
    
    <!-- 用户表单弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      :width="600"
      @ok="handleSubmit"
      @cancel="modalVisible = false"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        layout="vertical"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formData.username" placeholder="请输入用户名" />
        </a-form-item>
        
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </a-form-item>
        
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="formData.phone" placeholder="请输入手机号" />
        </a-form-item>
        
        <a-form-item label="角色" name="role">
          <a-select v-model:value="formData.role" placeholder="请选择角色">
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="manager">经理</a-select-option>
            <a-select-option value="user">普通用户</a-select-option>
          </a-select>
        </a-form-item>
        
        <a-form-item v-if="isCreate" label="密码" name="password">
          <a-input-password v-model:value="formData.password" placeholder="请输入密码" />
        </a-form-item>
        
        <a-form-item label="状态" name="status">
          <a-radio-group v-model:value="formData.status">
            <a-radio value="active">活跃</a-radio>
            <a-radio value="inactive">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { useUserList } from './hooks/useUserList'
import { useUserForm } from './hooks/useUserForm'
import type { User } from './types'

// 表格列定义
const columns = [
  { title: '头像', key: 'avatar', width: 60 },
  { title: '用户名', dataIndex: 'username', key: 'username', width: 120 },
  { title: '邮箱', dataIndex: 'email', key: 'email', width: 200 },
  { title: '手机号', dataIndex: 'phone', key: 'phone', width: 140 },
  { title: '角色', key: 'role', width: 100 },
  { title: '状态', key: 'status', width: 80 },
  { title: '最后登录', dataIndex: 'lastLoginAt', key: 'lastLoginAt', width: 160 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
]

// 用户列表逻辑
const {
  userList,
  loading,
  pagination,
  searchKeyword,
  fetchUserList,
  handlePageChange,
  handleSizeChange,
  handleSearch,
  handleReset,
  deleteUser,
} = useUserList()

// 表单逻辑
const {
  modalVisible,
  modalTitle,
  formData,
  formRules,
  isCreate,
  openCreateModal,
  openEditModal,
  submitForm,
} = useUserForm()

// 辅助函数
const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    active: 'green',
    inactive: 'red',
    suspended: 'orange',
  }
  return map[status] || 'default'
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    active: '活跃',
    inactive: '禁用',
    suspended: '已冻结',
  }
  return map[status] || status
}

const getRoleColor = (role: string) => {
  const map: Record<string, string> = {
    admin: 'red',
    manager: 'blue',
    user: 'green',
  }
  return map[role] || 'default'
}

const getRoleText = (role: string) => {
  const map: Record<string, string> = {
    admin: '管理员',
    manager: '经理',
    user: '普通用户',
  }
  return map[role] || role
}

// 表格变化处理
const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  fetchUserList({
    page: pagination.current,
    pageSize: pagination.pageSize,
    sortField: sorter.field,
    sortOrder: sorter.order,
  })
}

// 新建用户
const handleCreate = () => {
  openCreateModal()
}

// 编辑用户
const handleEdit = (record: User) => {
  openEditModal(record)
}

// 删除用户
const handleDelete = (record: User) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除用户 "${record.username}" 吗？`,
    okType: 'danger',
    onOk: async () => {
      await deleteUser(record.id)
      message.success('删除成功')
      fetchUserList()
    },
  })
}

// 重置密码
const handleResetPassword = (record: User) => {
  Modal.confirm({
    title: '重置密码',
    content: `确定要重置用户 "${record.username}" 的密码吗？`,
    onOk: async () => {
      message.success('密码已重置，新密码已发送至用户邮箱')
    },
  })
}

// 禁用用户
const handleDisable = (record: User) => {
  Modal.confirm({
    title: '确认禁用',
    content: `确定要禁用用户 "${record.username}" 吗？`,
    onOk: async () => {
      message.success('用户已禁用')
      fetchUserList()
    },
  })
}

// 启用用户
const handleEnable = (record: User) => {
  Modal.confirm({
    title: '确认启用',
    content: `确定要启用用户 "${record.username}" 吗？`,
    onOk: async () => {
      message.success('用户已启用')
      fetchUserList()
    },
  })
}

// 导出用户
const handleExport = () => {
  message.info('正在导出，请稍候...')
}

// 查看权限
const handleViewPermissions = (record: User) => {
  // 打开权限查看弹窗
}

// 表单提交
const handleSubmit = async () => {
  await submitForm()
  modalVisible.value = false
  fetchUserList()
}

// 初始化
onMounted(() => {
  fetchUserList()
})
</script>
```

### 5.6 组合式函数示例（`composables/useTable.ts`）

```typescript
// composables/useTable.ts
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'

export interface UseTableOptions<T = any> {
  fetchApi: (params: any) => Promise<{ items: T[]; total: number }>
  immediate?: boolean
  defaultPageSize?: number
  defaultPage?: number
}

export function useTable<T = any>(options: UseTableOptions<T>) {
  const { fetchApi, immediate = true, defaultPageSize = 10, defaultPage = 1 } = options
  
  const data = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)
  const pagination = reactive({
    current: defaultPage,
    pageSize: defaultPageSize,
    total: 0,
  })
  
  const searchParams = ref<Record<string, any>>({})
  const sortParams = ref<Record<string, any>>({})
  
  const fetchData = async () => {
    loading.value = true
    try {
      const params = {
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...searchParams.value,
        ...sortParams.value,
      }
      const result = await fetchApi(params)
      data.value = result.items
      pagination.total = result.total
    } catch (error) {
      console.error('Fetch table data error:', error)
    } finally {
      loading.value = false
    }
  }
  
  const handlePageChange = (page: number) => {
    pagination.current = page
    fetchData()
  }
  
  const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    pagination.current = 1
    fetchData()
  }
  
  const handleSearch = (params: Record<string, any>) => {
    searchParams.value = params
    pagination.current = 1
    fetchData()
  }
  
  const handleSort = (field: string, order: 'asc' | 'desc') => {
    sortParams.value = { sortField: field, sortOrder: order }
    fetchData()
  }
  
  const reset = () => {
    searchParams.value = {}
    sortParams.value = {}
    pagination.current = defaultPage
    pagination.pageSize = defaultPageSize
    fetchData()
  }
  
  const refresh = () => {
    fetchData()
  }
  
  if (immediate) {
    fetchData()
  }
  
  return {
    data,
    loading,
    pagination,
    fetchData,
    handlePageChange,
    handleSizeChange,
    handleSearch,
    handleSort,
    reset,
    refresh,
  }
}
```

---

## 六、UnoCSS 使用规范

### 6.1 类名使用规范

| 场景 | 推荐写法 | 说明 |
|------|----------|------|
| 布局 | `flex flex-col items-center justify-between` | 使用 Flex 布局类 |
| 间距 | `p-4 m-2 gap-4 space-y-2` | 使用间距工具类 |
| 尺寸 | `w-full h-16 min-w-0 max-w-screen-lg` | 使用尺寸工具类 |
| 颜色 | `bg-primary text-white border-gray-200` | 使用颜色工具类 |
| 文字 | `text-sm font-bold text-center truncate` | 使用文字工具类 |
| 响应式 | `sm:text-base lg:p-8 dark:bg-gray-800` | 使用响应式前缀 |
| 状态 | `hover:bg-blue-600 focus:ring-2 active:scale-95` | 使用状态变体 |
| 自定义 | `[--my-var:10px]` | 任意值语法 |

### 6.2 属性化模式使用

```vue
<!-- 传统类名写法 -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">

<!-- 属性化模式写法（更简洁） -->
<div flex items-center justify-between p-4 bg-white rounded-lg shadow>

<!-- 混合使用 -->
<div 
  flex 
  items-center 
  justify-between 
  class="p-4 bg-white rounded-lg shadow"
>
```

### 6.3 动态类名处理

```vue
<template>
  <!-- 动态类名使用计算属性 -->
  <div :class="statusClass">状态</div>
  
  <!-- 数组形式 -->
  <div :class="['btn', isActive ? 'btn-active' : 'btn-inactive']">
    按钮
  </div>
  
  <!-- 对象形式 -->
  <div :class="{ 'bg-red-500': isError, 'bg-green-500': isSuccess }">
    提示
  </div>
</template>

<script setup>
// 确保动态类名在 safelist 中配置，否则会被 Purge
const statusClass = computed(() => {
  if (status.value === 'active') return 'text-green-500'
  if (status.value === 'inactive') return 'text-red-500'
  return 'text-gray-500'
})
</script>
```

### 6.4 快捷方式定义

```typescript
// uno.config.ts 中定义快捷方式
shortcuts: {
  'btn': 'px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none',
  'btn-primary': 'btn bg-primary text-white hover:bg-primary-dark',
  'card': 'bg-white rounded-lg shadow-sm p-6',
  'page-container': 'p-6 max-w-7xl mx-auto',
}
```

---

## 七、打包优化配置

### 7.1 Vite 构建优化

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-vue': ['vue', 'vue-router', 'pinia'],
        'vendor-antd': ['ant-design-vue', '@ant-design/icons-vue'],
        'vendor-utils': ['axios', 'dayjs', 'lodash-es'],
        'vendor-uno': ['unocss'],
      },
    },
  },
  chunkSizeWarningLimit: 1000,
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
}
```

---

## 八、AI 执行指令

将以上规范作为输入，AI 需要：

1. **创建完整目录结构**：按照规范创建所有目录和文件
2. **配置 UnoCSS**：生成 `uno.config.ts` 和样式入口文件
3. **配置 Vite**：生成 `vite.config.ts`，集成 UnoCSS 插件
4. **编写核心模块**：主题系统、布局组件、通用组件
5. **编写组合式函数**：`useTable`、`useRequest`、`useTheme` 等
6. **编写页面示例**：用户管理完整示例
7. **配置类型定义**：生成全局类型声明文件
8. **编写构建脚本**：多环境打包配置

> 这套方案完整集成了 Vue3 + Ant Design Vue + TypeScript + UnoCSS，AI 可根据此规范生成一个完整、规范、高性能的前端项目框架。

---

_文档版本：v1.0_
_创建时间：2026-04-02_
