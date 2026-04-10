import type { Directive } from 'vue'
import { message } from 'ant-design-vue'

export const vCopy: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    el.style.cursor = 'pointer'
    el.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(binding.value)
        message.success('已复制到剪贴板')
      } catch {
        message.error('复制失败')
      }
    })
  },
}
