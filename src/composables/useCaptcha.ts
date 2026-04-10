import { ref, computed } from 'vue'

// 失败次数阈值
const FAIL_THRESHOLD = 3
// 失败次数存储键
const FAIL_COUNT_KEY = 'login_fail_count'

/**
 * 组合式函数：管理验证码状态
 * - 管理验证码状态
 * - 管理失败次数（localStorage）
 * - 验证码成功回调
 */
export function useCaptcha() {
  // 验证码是否验证通过
  const captchaVerified = ref(false)
  // 是否显示验证码
  const showCaptcha = ref(false)
  // 失败次数
  const failCount = ref(0)

  /**
   * 从 localStorage 读取失败次数
   */
  const loadFailCount = () => {
    const count = localStorage.getItem(FAIL_COUNT_KEY)
    if (count) {
      failCount.value = parseInt(count, 10)
      // 失败次数超过阈值，显示验证码
      showCaptcha.value = failCount.value >= FAIL_THRESHOLD
    }
  }

  /**
   * 增加失败次数
   */
  const incrementFailCount = () => {
    failCount.value++
    localStorage.setItem(FAIL_COUNT_KEY, failCount.value.toString())
  }

  /**
   * 重置失败次数
   */
  const resetFailCount = () => {
    failCount.value = 0
    localStorage.removeItem(FAIL_COUNT_KEY)
  }

  /**
   * 检查是否需要显示验证码
   */
  const checkShowCaptcha = computed(() => {
    return showCaptcha.value
  })

  /**
   * 验证码成功回调
   */
  const handleCaptchaSuccess = () => {
    captchaVerified.value = true
  }

  /**
   * 重置验证码状态
   */
  const resetCaptcha = () => {
    captchaVerified.value = false
    showCaptcha.value = false
  }

  return {
    // state
    captchaVerified,
    showCaptcha,
    failCount,
    // computed
    checkShowCaptcha,
    // actions
    loadFailCount,
    incrementFailCount,
    resetFailCount,
    handleCaptchaSuccess,
    resetCaptcha,
  }
}
