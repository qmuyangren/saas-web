<template>
  <div class="captcha-drag-container">
    <div class="captcha-text">请按住滑块拖动到最右侧</div>
    <div class="captcha-slider" ref="sliderRef" @mousedown="handleMouseDown">
      <div class="captcha-slider-track" :style="{ width: trackWidth + 'px' }">
        <div
          class="captcha-slider-thumb"
          :style="{
            left: thumbLeft + 'px',
            'background-color': isPassed ? '#52c41a' : ''
          }"
          ref="thumbRef"
        >
          <CheckOutlined v-if="isPassed" class="captcha-icon-checked" />
          <ArrowRightOutlined v-else class="captcha-icon-arrow" />
        </div>
      </div>
    </div>
    <div v-if="error" class="captcha-error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { CheckOutlined, ArrowRightOutlined } from '@ant-design/icons-vue'

interface Props {
  onSuccess?: () => void
  onError?: (msg: string) => void
}

const props = defineProps<Props>()

const sliderRef = ref<HTMLElement | null>(null)
const thumbRef = ref<HTMLElement | null>(null)

// 滑块状态
const isDragging = ref(false)
const isPassed = ref(false)
const thumbLeft = ref(0)
const trackWidth = ref(0)
const startX = ref(0)
const startLeft = ref(0)

// 错误信息
const error = ref('')

// 验证通过的阈值（滑块宽度的百分比）
const PASSED_THRESHOLD = 0.9

// 滑块容器点击处理
const handleMouseDown = (e: MouseEvent) => {
  if (isPassed.value) return

  isDragging.value = true
  startX.value = e.clientX
  startLeft.value = thumbRef.value?.offsetLeft || 0

  // 添加全局事件监听
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 全局鼠标移动处理
const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !sliderRef.value) return

  e.preventDefault()

  const delta = e.clientX - startX.value
  const maxLeft = sliderRef.value.offsetWidth - (thumbRef.value?.offsetWidth || 0)
  const newLeft = Math.max(0, Math.min(delta, maxLeft))

  thumbLeft.value = newLeft

  // 检查是否通过
  if (newLeft >= maxLeft * PASSED_THRESHOLD) {
    checkPassed(newLeft, maxLeft)
  }
}

// 全局鼠标抬起处理
const handleMouseUp = () => {
  if (!isDragging.value) return

  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)

  // 如果没有通过，重置滑块
  if (!isPassed.value) {
    error.value = '请按住滑块拖动到最右侧'
    thumbLeft.value = 0
  }
}

// 检查是否通过
const checkPassed = (currentLeft: number, maxLeft: number) => {
  if (currentLeft >= maxLeft * PASSED_THRESHOLD) {
    isPassed.value = true
    error.value = ''
    // 调整位置到最右侧
    thumbLeft.value = maxLeft
    // 延迟调用成功回调
    setTimeout(() => {
      props.onSuccess?.()
    }, 300)
  }
}

// 重置验证码
const reset = () => {
  isPassed.value = false
  error.value = ''
  thumbLeft.value = 0
}

// 暴露方法给父组件
defineExpose({
  verify: () => isPassed.value,
  reset,
})

// 初始化
onMounted(() => {
  // 计算滑块容器宽度
  if (sliderRef.value) {
    trackWidth.value = sliderRef.value.offsetWidth
  }
})

// 清理事件监听
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style scoped lang="scss">
.captcha-drag-container {
  margin-top: 16px;

  .captcha-text {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
    text-align: center;
  }

  .captcha-slider {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;
    border-radius: 20px;
    overflow: hidden;
    cursor: grab;
    user-select: none;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

    &:active {
      cursor: grabbing;
    }
  }

  .captcha-slider-track {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #1890ff;
    border-radius: 20px;
    pointer-events: none;
    transition: width 0.2s ease-out;
  }

  .captcha-slider-thumb {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: left 0.2s ease-out;
    cursor: grab;

    .captcha-icon-checked {
      color: #52c41a;
      font-size: 20px;
    }

    .captcha-icon-arrow {
      color: #1890ff;
      font-size: 18px;
    }
  }

  .captcha-error {
    color: #ff4d4f;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
