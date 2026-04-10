<template>
  <div class="captcha-container">
    <div class="captcha-question">
      {{ question }}
    </div>
    <a-input
      v-model:value="captchaValue"
      placeholder="请输入计算结果"
      size="large"
      @pressEnter="handleVerify"
    >
      <template #addonAfter>
        <a-button @click="refreshCaptcha">
          <template #icon><RedoOutlined /></template>
        </a-button>
      </template>
    </a-input>
    <div v-if="error" class="captcha-error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RedoOutlined } from '@ant-design/icons-vue';

interface Props {
  onSuccess?: () => void;
}

const props = defineProps<Props>();

const captchaValue = ref('');
const error = ref('');

// 数学题数据
const num1 = ref(Math.floor(Math.random() * 10) + 1);
const num2 = ref(Math.floor(Math.random() * 10) + 1);
const operator = ref('+');

// 计算问题
const question = computed(() => {
  return `${num1.value} ${operator.value} ${num2.value} = ?`;
});

// 正确答案
const correctAnswer = computed(() => {
  if (operator.value === '+') {
    return num1.value + num2.value;
  } else if (operator.value === '-') {
    return num1.value - num2.value;
  } else {
    return num1.value * num2.value;
  }
});

// 刷新验证码
const refreshCaptcha = () => {
  num1.value = Math.floor(Math.random() * 10) + 1;
  num2.value = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*'];
  operator.value = operators[Math.floor(Math.random() * operators.length)];
  captchaValue.value = '';
  error.value = '';
};

// 验证验证码
const handleVerify = () => {
  const answer = parseInt(captchaValue.value);
  if (isNaN(answer)) {
    error.value = '请输入数字';
    return false;
  }
  
  if (answer !== correctAnswer.value) {
    error.value = '答案错误，请重新计算';
    refreshCaptcha();
    return false;
  }
  
  error.value = '';
  props.onSuccess?.();
  return true;
};

// 重置验证码
const reset = () => {
  captchaValue.value = '';
  error.value = '';
};

// 暴露方法给父组件
defineExpose({
  verify: handleVerify,
  reset,
  refresh: refreshCaptcha
});

onMounted(() => {
  refreshCaptcha();
});
</script>

<style scoped lang="scss">
.captcha-container {
  margin-top: 16px;
  
  .captcha-question {
    font-size: 18px;
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 12px;
    text-align: center;
  }
  
  .captcha-error {
    color: #ff4d4f;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
  }
  
  :deep(.ant-input-group-addon) {
    padding: 0;
    
    .ant-btn {
      border: none;
      border-radius: 0;
    }
  }
}
</style>
