<template>
  <a-popover
    :open="visible"
    placement="bottomRight"
    trigger="click"
    overlayClassName="message-popover"
    @update:open="handleOpenChange"
  >
    <template #title>
      <div class="message-popover-header">
        <span>消息通知</span>
        <a-button type="link" size="small" @click="markAllAsRead">
          <CheckOutlined />
          全部已读
        </a-button>
      </div>
    </template>

    <template #content>
      <div class="message-list">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="message-item"
          :class="{ unread: !msg.read }"
          @click="markAsRead(msg.id)"
        >
          <div class="message-content">
            <a-badge :count="msg.read ? 0 : 1" :offset="[-6, -2]" :numberStyle="{ backgroundColor: '#ff4d4f' }" class="msg-badge">
              <div class="message-title">{{ msg.title }}</div>
            </a-badge>
            <div class="message-desc">{{ msg.content }}</div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>

        <div v-if="!messages.length" class="empty-message">
          <InboxOutlined class="empty-icon" />
          <p>暂无消息</p>
        </div>
      </div>

      <div class="message-footer">
        <a-button type="link" block size="small" @click="viewAll">
          查看全部消息
        </a-button>
      </div>
    </template>

    <!-- 触发按钮 -->
    <div class="message-trigger" @click="openMessage">
      <a-badge :count="unreadCount" :maxCount="99" :offset="[-6, 6]" :numberStyle="{ backgroundColor: '#ff4d4f' }">
        <BellOutlined style="font-size: 18px" />
      </a-badge>
    </div>
  </a-popover>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  BellOutlined,
  InboxOutlined,
  CheckOutlined,
} from '@ant-design/icons-vue'

const MESSAGES_KEY = 'messages'

interface Message {
  id: string
  title: string
  content: string
  time: string
  read: boolean
}

const visible = ref(false)
const messages = ref<Message[]>([
  { id: '1', title: '系统通知', content: '欢迎使用管理系统', time: '5 分钟前', read: false },
  { id: '2', title: '欢迎', content: '感谢您的使用', time: '10 分钟前', read: true },
])

const unreadCount = computed(() => messages.value.filter(m => !m.read).length)

const openMessage = () => {
  visible.value = true
}

const handleOpenChange = (open: boolean) => {
  visible.value = open
}

const markAsRead = (id: string) => {
  const msg = messages.value.find(m => m.id === id)
  if (msg) msg.read = true
  saveMessages()
}

const markAllAsRead = () => {
  messages.value.forEach(m => m.read = true)
  saveMessages()
}

const viewAll = () => {
  visible.value = false
}

const saveMessages = () => {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages.value))
}

onMounted(() => {
  const saved = localStorage.getItem(MESSAGES_KEY)
  if (saved) {
    messages.value = JSON.parse(saved)
  }
})
</script>

<style scoped>
.message-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.message-trigger:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1890ff;
}

.message-popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 320px;
  max-height: 400px;
  overflow-y: auto;
}

.message-item {
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.message-item:hover {
  background: #f5f5f5;
}

.message-item.unread:hover {
  background: #e6f7ff;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.msg-badge :deep(.ant-badge-count) {
  height: 16px;
  min-width: 16px;
  padding: 0 4px;
  font-size: 11px;
  line-height: 16px;
}

.message-title {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  margin-bottom: 4px;
}

.message-desc {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
}

.message-time {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.empty-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: rgba(0, 0, 0, 0.45);
}

.empty-icon {
  font-size: 36px;
  margin-bottom: 8px;
  opacity: 0.5;
}

.message-footer {
  border-top: 1px solid #f0f0f0;
  margin-top: 12px;
  padding-top: 12px;
}

:deep(.message-popover .ant-popover-inner-content) {
  padding: 12px;
}

.dark .message-trigger:hover {
  background: rgba(255, 255, 255, 0.1);
}
.dark .message-item:hover {
  background: #262626;
}
.dark .message-item.unread:hover {
  background: rgba(24, 144, 255, 0.15);
}
.dark .message-footer {
  border-top-color: #303030;
}
</style>
