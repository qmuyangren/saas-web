/**
 * 暗色主题 CSS 导出
 * 可直接导入使用
 * 符合 WCAG 2.1 AA 对比度标准
 */

export const darkCSS = `
[data-theme='dark'] {
  --color-primary-50: #002766;
  --color-primary-100: #003a8c;
  --color-primary-200: #0050b3;
  --color-primary-300: #096dd9;
  --color-primary-400: #1890ff;
  --color-primary-500: #40a9ff;
  --color-primary-600: #69c0ff;
  --color-primary-700: #91d5ff;
  --color-primary-800: #bae7ff;
  --color-primary-900: #e6f7ff;

  --color-success: #73d13d;
  --color-success-light: #95de64;
  --color-success-dark: #52c41a;
  --color-warning: #ffc53d;
  --color-warning-light: #ffe58f;
  --color-warning-dark: #faad14;
  --color-error: #ff7875;
  --color-error-light: #ffa39e;
  --color-error-dark: #f5222d;
  --color-info: #40a9ff;

  --bg-primary: #141414;
  --bg-secondary: #1f1f1f;
  --bg-tertiary: #262626;

  --text-primary: rgba(255, 255, 255, 0.85);
  --text-secondary: rgba(255, 255, 255, 0.65);
  --text-tertiary: rgba(255, 255, 255, 0.45);
  --text-disabled: rgba(255, 255, 255, 0.25);

  --border-color: #434343;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-dropdown: 0 6px 16px rgba(0, 0, 0, 0.5);
  --shadow-modal: 0 12px 48px rgba(0, 0, 0, 0.6);
  --shadow-focus: 0 0 0 2px #141414, 0 0 0 4px #1890ff;
}
`;

export default darkCSS;
