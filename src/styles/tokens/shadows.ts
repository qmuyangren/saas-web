/**
 * 阴影系统 - Shadow Tokens
 * 多层次阴影，符合 Material Design 规范
 */

export const shadows = {
  // 基础阴影 - 明色主题
  light: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // 基础阴影 - 暗色主题 (使用更柔和的阴影)
  dark: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
  },

  // 语义化阴影
  semantic: {
    // 卡片阴影
    card: {
      light: '0 2px 8px rgba(0, 0, 0, 0.08)',
      dark: '0 2px 8px rgba(0, 0, 0, 0.3)',
    },
    // 下拉菜单阴影
    dropdown: {
      light: '0 6px 16px rgba(0, 0, 0, 0.12)',
      dark: '0 6px 16px rgba(0, 0, 0, 0.5)',
    },
    // 模态框阴影
    modal: {
      light: '0 12px 48px rgba(0, 0, 0, 0.18)',
      dark: '0 12px 48px rgba(0, 0, 0, 0.6)',
    },
    // 悬浮按钮阴影
    fab: {
      light: '0 6px 20px rgba(0, 0, 0, 0.15)',
      dark: '0 6px 20px rgba(0, 0, 0, 0.5)',
    },
  },

  // 焦点环 - Focus Ring (无障碍访问)
  focusRing: {
    light: '0 0 0 2px #ffffff, 0 0 0 4px #1890ff',
    dark: '0 0 0 2px #141414, 0 0 0 4px #1890ff',
  },
} as const;

export type ShadowConfig = typeof shadows;
