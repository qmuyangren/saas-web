/**
 * 颜色系统 - Color Tokens
 * 符合 WCAG 2.1 AA 对比度标准
 */

export const colors = {
  // 主色调 - Primary
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff',
    200: '#91d5ff',
    300: '#69c0ff',
    400: '#40a9ff',
    500: '#1890ff', // 品牌色
    600: '#096dd9',
    700: '#0050b3',
    800: '#003a8c',
    900: '#002766',
  },

  // 功能色 - Functional Colors
  success: {
    light: '#b7eb8f',
    main: '#52c41a',
    dark: '#389e0d',
  },

  warning: {
    light: '#ffe58f',
    main: '#faad14',
    dark: '#d48806',
  },

  error: {
    light: '#ffa39e',
    main: '#f5222d',
    dark: '#cf1322',
  },

  info: {
    light: '#bae7ff',
    main: '#1890ff',
    dark: '#096dd9',
  },

  // 中性色 - Neutral (用于明色主题)
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#f0f0f0',
    300: '#d9d9d9',
    400: '#bfbfbf',
    500: '#8c8c8c',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#1f1f1f',
    1000: '#000000',
  },

  // 暗色中性色 - Dark Neutral (用于暗色主题)
  darkNeutral: {
    0: '#000000',
    50: '#141414',
    100: '#1f1f1f',
    200: '#262626',
    300: '#434343',
    400: '#595959',
    500: '#8c8c8c',
    600: '#bfbfbf',
    700: '#d9d9d9',
    800: '#f0f0f0',
    900: '#f5f5f5',
    1000: '#fafafa',
  },

  // 背景色 - Background
  background: {
    light: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5',
    },
    dark: {
      primary: '#141414',
      secondary: '#1f1f1f',
      tertiary: '#262626',
    },
  },

  // 文本色 - Text
  text: {
    light: {
      primary: 'rgba(0, 0, 0, 0.85)', // #000000d9
      secondary: 'rgba(0, 0, 0, 0.65)', // #000000a6
      tertiary: 'rgba(0, 0, 0, 0.45)', // #00000073
      disabled: 'rgba(0, 0, 0, 0.25)', // #00000040
    },
    dark: {
      primary: 'rgba(255, 255, 255, 0.85)', // #ffffffd9
      secondary: 'rgba(255, 255, 255, 0.65)', // #ffffffa6
      tertiary: 'rgba(255, 255, 255, 0.45)', // #ffffff73
      disabled: 'rgba(255, 255, 255, 0.25)', // #ffffff40
    },
  },

  // 边框色 - Border
  border: {
    light: '#d9d9d9',
    dark: '#434343',
  },
} as const;

export type ColorPalette = typeof colors;
