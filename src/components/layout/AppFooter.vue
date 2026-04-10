<template>
  <div class="footer-content">
    <div class="footer-left">
      <CopyrightCircleOutlined />
      <span>2024</span>
      <span class="mx-2">|</span>
      <span>管理系统</span>
    </div>
    <div class="footer-center">
      <a href="#" class="footer-link">
        <QuestionCircleOutlined />
        使用帮助
      </a>
      <span class="mx-2">|</span>
      <a href="#" class="footer-link">
        <CustomerServiceOutlined />
        技术支持
      </a>
    </div>
    <div class="footer-right">
      <TagOutlined />
      <span>{{ version }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CopyrightCircleOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  TagOutlined,
} from '@ant-design/icons-vue'

const version = 'v1.0.0'
</script>

<style scoped>
.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-left,
.footer-center,
.footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-link {
  color: #1890ff;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
  text-decoration: none;
}

.footer-link:hover {
  color: #40a9ff;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 8px;
  }
}

.dark .footer-content {
  color: rgba(255,255,255,0.65);
}

.dark .footer-link {
  color: #69b1ff;
}

.dark .footer-link:hover {
  color: #91caff;
}
</style>
