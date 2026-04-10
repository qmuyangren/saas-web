import type { Directive } from 'vue'

export const vThrottle: Directive<HTMLElement, number> = {
  mounted(el, binding) {
    let lastTime = 0
    const delay = binding.value || 1000
    el.addEventListener('click', () => {
      const now = Date.now()
      if (now - lastTime < delay) return
      lastTime = now
      el.dispatchEvent(new Event('throttle-click'))
    })
  },
}
