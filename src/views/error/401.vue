<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-6xl font-bold text-gray-800">401</h1>
    <p class="text-xl text-gray-500 mt-4">未授权访问</p>
    <a-button type="primary" class="mt-6" @click="$router.push('/login')">返回登录</a-button>
  </div>
</template>
