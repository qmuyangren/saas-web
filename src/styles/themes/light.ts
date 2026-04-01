/**
 * 明色主题配置 - Light Theme
 */

import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';

export const lightTheme = {
  id: 'light',
  name: '明色模式',

  // CSS Variables 映射
  cssVariables: {
    // 主色调
    '--color-primary-50': colors.primary[50],
    '--color-primary-100': colors.primary[100],
    '--color-primary-200': colors.primary[200],
    '--color-primary-300': colors.primary[300],
    '--color-primary-400': colors.primary[400],
    '--color-primary-500': colors.primary[500],
    '--color-primary-600': colors.primary[600],
    '--color-primary-700': colors.primary[700],
    '--color-primary-800': colors.primary[800],
    '--color-primary-900': colors.primary[900],

    // 功能色
    '--color-success': colors.success.main,
    '--color-success-light': colors.success.light,
    '--color-success-dark': colors.success.dark,
    '--color-warning': colors.warning.main,
    '--color-warning-light': colors.warning.light,
    '--color-warning-dark': colors.warning.dark,
    '--color-error': colors.error.main,
    '--color-error-light': colors.error.light,
    '--color-error-dark': colors.error.dark,
    '--color-info': colors.info.main,

    // 背景色
    '--bg-primary': colors.background.light.primary,
    '--bg-secondary': colors.background.light.secondary,
    '--bg-tertiary': colors.background.light.tertiary,

    // 文本色
    '--text-primary': colors.text.light.primary,
    '--text-secondary': colors.text.light.secondary,
    '--text-tertiary': colors.text.light.tertiary,
    '--text-disabled': colors.text.light.disabled,

    // 边框色
    '--border-color': colors.border.light,

    // 中性色
    '--color-neutral-0': colors.neutral[0],
    '--color-neutral-50': colors.neutral[50],
    '--color-neutral-100': colors.neutral[100],
    '--color-neutral-200': colors.neutral[200],
    '--color-neutral-300': colors.neutral[300],
    '--color-neutral-400': colors.neutral[400],
    '--color-neutral-500': colors.neutral[500],
    '--color-neutral-600': colors.neutral[600],
    '--color-neutral-700': colors.neutral[700],
    '--color-neutral-800': colors.neutral[800],
    '--color-neutral-900': colors.neutral[900],
    '--color-neutral-1000': colors.neutral[1000],

    // 阴影
    '--shadow-sm': shadows.light.sm,
    '--shadow-md': shadows.light.md,
    '--shadow-lg': shadows.light.lg,
    '--shadow-xl': shadows.light.xl,
    '--shadow-2xl': shadows.light['2xl'],
    '--shadow-inner': shadows.light.inner,
    '--shadow-card': shadows.semantic.card.light,
    '--shadow-dropdown': shadows.semantic.dropdown.light,
    '--shadow-modal': shadows.semantic.modal.light,
    '--shadow-focus': shadows.focusRing.light,
  },
} as const;

export type LightTheme = typeof lightTheme;
