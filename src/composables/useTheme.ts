import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  const toggleDark = () => {
    isDark.value = !isDark.value
    updateDOM()
  }

  const setDark = (dark: boolean) => {
    isDark.value = dark
    updateDOM()
  }

  const updateDOM = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const initTheme = () => {
    const saved = localStorage.getItem('app-theme')
    if (saved === 'dark') {
      setDark(true)
    } else if (saved === 'auto') {
      setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }

  onMounted(() => {
    initTheme()
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', (e) => {
      if (localStorage.getItem('app-theme') === 'auto') {
        setDark(e.matches)
      }
    })
  })

  return {
    isDark,
    toggleDark,
    setDark,
    initTheme,
  }
}
