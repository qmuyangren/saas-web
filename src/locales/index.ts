import { zhCN } from './lang/zh-CN'
import { enUS } from './lang/en-US'

const messages: Record<string, typeof zhCN> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export function t(key: string, locale = 'zh-CN') {
  const msg = messages[locale] || messages['zh-CN']
  const keys = key.split('.')
  let result: unknown = msg
  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = (result as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  return result as string
}
