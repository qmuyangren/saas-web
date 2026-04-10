import type { Directive } from 'vue'
import { useUserStore } from '@/store/modules/user'

interface PermissionEl extends HTMLElement {
  _permissionValue?: string
}

export const vPermission: Directive<PermissionEl, string> = {
  mounted(el, binding) {
    el._permissionValue = binding.value
    const userStore = useUserStore()
    const hasPerm = userStore.getUserInfo?.permissions?.includes(binding.value)
    if (!hasPerm) {
      el.style.display = 'none'
    }
  },
}
