/**
 * 间距系统 - Spacing Tokens
 * 基于 8px 基准网格
 */

export const spacing = {
  // 基础间距单位 (8px 基准)
  0: '0',
  1: '4px',    // 0.5x
  2: '8px',    // 1x
  3: '12px',   // 1.5x
  4: '16px',   // 2x
  5: '20px',   // 2.5x
  6: '24px',   // 3x
  7: '28px',   // 3.5x
  8: '32px',   // 4x
  9: '36px',   // 4.5x
  10: '40px',  // 5x
  11: '44px',  // 5.5x
  12: '48px',  // 6x
  14: '56px',  // 7x
  16: '64px',  // 8x
  20: '80px',  // 10x
  24: '96px',  // 12x
  28: '112px', // 14x
  32: '128px', // 16x

  // 语义化间距
  px: '1px',
  0.5: '2px',
} as const;

export type SpacingConfig = typeof spacing;

// 常用间距组合
export const spacingPresets = {
  // 内边距预设
  padding: {
    xs: '4px 8px',
    sm: '8px 12px',
    md: '12px 16px',
    lg: '16px 24px',
    xl: '24px 32px',
  },

  // 外边距预设
  margin: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // 组件间距
  component: {
    button: '8px 16px',
    input: '8px 12px',
    card: '24px',
    modal: '32px',
  },
} as const;
