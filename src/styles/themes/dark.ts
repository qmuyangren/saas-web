/**
 * 暗色主题配置 - Dark Theme
 * 符合 WCAG 2.1 AA 对比度标准
 */

import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';

export const darkTheme = {
  id: 'dark',
  name: '暗色模式',

  // CSS Variables 映射
  cssVariables: {
    // 主色调 (暗色模式下适当降低饱和度)
    '--color-primary-50': colors.primary[900],
    '--color-primary-100': colors.primary[800],
    '--color-primary-200': colors.primary[700],
    '--color-primary-300': colors.primary[600],
    '--color-primary-400': colors.primary[500],
    '--color-primary-500': colors.primary[400], // 提高亮度
    '--color-primary-600': colors.primary[300],
    '--color-primary-700': colors.primary[200],
    '--color-primary-800': colors.primary[100],
    '--color-primary-900': colors.primary[50],

    // 功能色 (暗色模式下调整)
    '--color-success': '#73d13d', // 提高亮度
    '--color-success-light': '#95de64',
    '--color-success-dark': '#52c41a',
    '--color-warning': '#ffc53d', // 提高亮度
    '--color-warning-light': '#ffe58f',
    '--color-warning-dark': '#faad14',
    '--color-error': '#ff7875', // 提高亮度
    '--color-error-light': '#ffa39e',
    '--color-error-dark': '#f5222d',
    '--color-info': '#40a9ff',

    // 背景色
    '--bg-primary': colors.background.dark.primary,
    '--bg-secondary': colors.background.dark.secondary,
    '--bg-tertiary': colors.background.dark.tertiary,

    // 文本色
    '--text-primary': colors.text.dark.primary,
    '--text-secondary': colors.text.dark.secondary,
    '--text-tertiary': colors.text.dark.tertiary,
    '--text-disabled': colors.text.dark.disabled,

    // 边框色
    '--border-color': colors.border.dark,

    // 中性色 (暗色)
    '--color-neutral-0': colors.darkNeutral[0],
    '--color-neutral-50': colors.darkNeutral[50],
    '--color-neutral-100': colors.darkNeutral[100],
    '--color-neutral-200': colors.darkNeutral[200],
    '--color-neutral-300': colors.darkNeutral[300],
    '--color-neutral-400': colors.darkNeutral[400],
    '--color-neutral-500': colors.darkNeutral[500],
    '--color-neutral-600': colors.darkNeutral[600],
    '--color-neutral-700': colors.darkNeutral[700],
    '--color-neutral-800': colors.darkNeutral[800],
    '--color-neutral-900': colors.darkNeutral[900],
    '--color-neutral-1000': colors.darkNeutral[1000],

    // 阴影
    '--shadow-sm': shadows.dark.sm,
    '--shadow-md': shadows.dark.md,
    '--shadow-lg': shadows.dark.lg,
    '--shadow-xl': shadows.dark.xl,
    '--shadow-2xl': shadows.dark['2xl'],
    '--shadow-inner': shadows.dark.inner,
    '--shadow-card': shadows.semantic.card.dark,
    '--shadow-dropdown': shadows.semantic.dropdown.dark,
    '--shadow-modal': shadows.semantic.modal.dark,
    '--shadow-focus': shadows.focusRing.dark,
  },
} as const;

export type DarkTheme = typeof darkTheme;
