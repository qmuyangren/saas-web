import type { Directive } from 'vue'
import { createVNode, render } from 'vue'
import { Spin } from 'ant-design-vue'

export const vLoading: Directive<HTMLElement, boolean> = {
  mounted(el, binding) {
    if (binding.value) {
      const spin = createVNode(Spin, { size: 'large' })
      const container = document.createElement('div')
      container.className = 'absolute inset-0 flex items-center justify-center bg-white/50'
      render(spin, container)
      el.style.position = 'relative'
      el.appendChild(container)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        el.style.position = 'relative'
      } else {
        const overlay = el.querySelector('.absolute')
        if (overlay) el.removeChild(overlay)
        el.style.position = ''
      }
    }
  },
}
