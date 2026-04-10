import { ref } from 'vue'

export function useModal(options: { defaultVisible?: boolean } = {}) {
  const visible = ref(options.defaultVisible || false)
  const loading = ref(false)

  const open = () => {
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  const toggle = () => {
    visible.value = !visible.value
  }

  return {
    visible,
    loading,
    open,
    close,
    toggle,
  }
}
