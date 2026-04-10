import type { Directive } from 'vue'

interface ClickOutsideEl extends HTMLElement {
  _clickOutsideHandler?: (e: MouseEvent) => void
}

export const vClickOutside: Directive<ClickOutsideEl, (e: MouseEvent) => void> = {
  mounted(el, binding) {
    const handler = (e: MouseEvent) => {
      if (!(el === e.target || el.contains(e.target as Node))) {
        binding.value(e)
      }
    }
    el._clickOutsideHandler = handler
    document.addEventListener('click', handler)
  },
  unmounted(el) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler)
    }
  },
}
