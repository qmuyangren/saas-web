import { ref } from 'vue'

export function useForm<T extends Record<string, any>>(initialData: T) {
  const formData = ref<T>({ ...initialData }) as any
  const errors = ref<Record<string, string>>({})

  const validate = () => {
    errors.value = {}
    let isValid = true
    for (const key in formData.value) {
      if (!formData.value[key]) {
        errors.value[key] = '此项为必填项'
        isValid = false
      }
    }
    return isValid
  }

  const reset = () => {
    formData.value = { ...initialData }
    errors.value = {}
  }

  const setField = (key: string, value: any) => {
    formData.value[key] = value
    delete errors.value[key]
  }

  return {
    formData,
    errors,
    validate,
    reset,
    setField,
  }
}
