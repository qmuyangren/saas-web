import type { Directive } from 'vue'

export const vDebounce: Directive<HTMLElement, number> = {
  mounted(el, binding) {
    let timer: ReturnType<typeof setTimeout> | null = null
    const delay = binding.value || 500
    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        el.dispatchEvent(new Event('debounce-click'))
      }, delay)
    })
  },
}
