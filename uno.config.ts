// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // 预设配置
  presets: [
    presetUno(), // 基础工具类（兼容Tailwind）
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
  
  // 主题配置（与Ant Design对齐）
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
    'border-warning',
    'border-error',
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
        html {
          font-family: Inter, system-ui, sans-serif;
        }
      `,
    },
  ],
})