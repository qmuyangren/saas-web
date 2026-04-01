/**
 * 样式系统导出 - Styles Index
 * 
 * 使用示例:
 * import { useTheme } from '@/styles';
 * import ThemeProvider from '@/styles/ThemeProvider.vue';
 * import ThemeToggle from '@/styles/ThemeToggle.vue';
 */

// Theme Hook
export { useTheme } from './useTheme';
export type { UseThemeReturn } from './useTheme';

// Theme Configs
export { lightTheme } from './themes/light';
export { darkTheme } from './themes/dark';
export type { LightTheme } from './themes/light';
export type { DarkTheme } from './themes/dark';

// Tokens
export { colors } from './tokens/colors';
export type { ColorPalette } from './tokens/colors';

export { typography } from './tokens/typography';
export type { TypographyConfig } from './tokens/typography';

export { spacing, spacingPresets } from './tokens/spacing';
export type { SpacingConfig } from './tokens/spacing';

export { shadows } from './tokens/shadows';
export type { ShadowConfig } from './tokens/shadows';

// CSS Exports
export { lightCSS } from './themes/light.css';
export { darkCSS } from './themes/dark.css';
