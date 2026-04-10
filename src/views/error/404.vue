<template>
  <div class="error-container">
    <h1>404</h1>
    <p>页面未找到</p>
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.error-container {
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 48px;
  color: #f5222d;
}
</style>