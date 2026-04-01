/**
 * 主题 Hook - useTheme
 * 提供主题切换、持久化、系统检测功能
 */

import { ref, computed, watch, onMounted } from 'vue';

const THEME_STORAGE_KEY = 'app-theme-preference';
const THEME_DATA_ATTRIBUTE = 'data-theme';

type ThemeMode = 'light' | 'dark' | 'system';

export function useTheme() {
  // 当前主题模式
  const themeMode = ref<ThemeMode>('system');
  
  // 实际生效的主题（light 或 dark）
  const actualTheme = ref<'light' | 'dark'>('light');
  
  // 是否支持系统检测
  const supportsSystemDetection = ref(false);

  /**
   * 从 localStorage 读取用户偏好
   */
  function getStoredTheme(): ThemeMode | null {
    if (typeof localStorage === 'undefined') return null;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return null;
  }

  /**
   * 保存主题偏好到 localStorage
   */
  function saveThemePreference(mode: ThemeMode) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  /**
   * 检测系统暗色模式偏好
   */
  function getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * 更新实际生效的主题
   */
  function updateActualTheme() {
    if (themeMode.value === 'system') {
      actualTheme.value = getSystemTheme();
    } else {
      actualTheme.value = themeMode.value;
    }
  }

  /**
   * 应用主题到 DOM
   */
  function applyTheme(theme: 'light' | 'dark') {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute(THEME_DATA_ATTRIBUTE, theme);
  }

  /**
   * 切换主题模式
   */
  function setTheme(mode: ThemeMode) {
    themeMode.value = mode;
    saveThemePreference(mode);
    updateActualTheme();
  }

  /**
   * 切换明/暗主题
   */
  function toggleTheme() {
    const newMode: ThemeMode = actualTheme.value === 'light' ? 'dark' : 'light';
    setTheme(newMode);
  }

  /**
   * 设置为明色主题
   */
  function setLightTheme() {
    setTheme('light');
  }

  /**
   * 设置为暗色主题
   */
  function setDarkTheme() {
    setTheme('dark');
  }

  /**
   * 设置为系统主题
   */
  function setSystemTheme() {
    setTheme('system');
  }

  // 监听系统主题变化
  function setupSystemThemeListener() {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    supportsSystemDetection.value = true;

    const handleChange = (event: MediaQueryListEvent) => {
      if (themeMode.value === 'system') {
        actualTheme.value = event.matches ? 'dark' : 'light';
        applyTheme(actualTheme.value);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }

  // 初始化
  onMounted(() => {
    // 读取存储的偏好
    const stored = getStoredTheme();
    if (stored) {
      themeMode.value = stored;
    }
    
    // 检测系统支持
    supportsSystemDetection.value = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all';

    // 更新实际主题
    updateActualTheme();
    
    // 应用主题
    applyTheme(actualTheme.value);
    
    // 监听系统变化
    if (supportsSystemDetection.value) {
      setupSystemThemeListener();
    }
  });

  // 监听主题变化并应用
  watch(actualTheme, (newTheme) => {
    applyTheme(newTheme);
  });

  return {
    // 状态
    themeMode: computed(() => themeMode.value),
    actualTheme: computed(() => actualTheme.value),
    isDark: computed(() => actualTheme.value === 'dark'),
    isLight: computed(() => actualTheme.value === 'light'),
    isSystem: computed(() => themeMode.value === 'system'),
    supportsSystemDetection: computed(() => supportsSystemDetection.value),
    
    // 方法
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
  };
}

export type UseThemeReturn = ReturnType<typeof useTheme>;
