/**
 * 字体系统 - Typography Tokens
 */

export const typography = {
  // 字体系列 - Font Families
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    code: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },

  // 字号 - Font Sizes (基于 14px 基准)
  fontSize: {
    xs: '12px',   // 辅助文字
    sm: '13px',   // 次要文字
    base: '14px', // 正文
    md: '16px',   // 小标题
    lg: '20px',   // 三级标题
    xl: '24px',   // 二级标题
    '2xl': '30px', // 一级标题
    '3xl': '38px', // 展示标题
  },

  // 字重 - Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // 行高 - Line Heights
  lineHeight: {
    tight: '1.25',
    base: '1.5',
    relaxed: '1.75',
  },

  // 字母间距 - Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    base: '0',
    wide: '0.025em',
    wider: '0.05em',
  },

  // 标题样式预设
  headings: {
    h1: {
      fontSize: '38px',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '30px',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '1.25',
    },
    h4: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '1.35',
    },
    h5: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '1.5',
    },
    h6: {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '1.5',
    },
  },
} as const;

export type TypographyConfig = typeof typography;
