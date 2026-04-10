<template>
  <div class="redirect-page">
    <a-spin tip="加载中..." size="large" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const query = router.currentRoute.value.query
  const redirect = query.redirect as string

  if (redirect) {
    // 使用 replace 避免历史记录堆积
    setTimeout(() => {
      router.replace(redirect)
    }, 300)
  } else {
    router.replace('/')
  }
})
</script>

<style scoped>
.redirect-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 48px;
}
</style>
