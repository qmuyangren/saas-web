<template>
  <div class="message-list">
    <div
      v-for="msg in messages"
      :key="msg.id"
      class="message-item"
      :class="{ unread: !msg.read }"
      @click="markRead(msg.id)"
    >
      <div class="message-icon" :class="msg.type">
        <AlertFilled v-if="msg.type === 'system'" />
        <NotificationFilled v-else-if="msg.type === 'notice'" />
        <MessageFilled v-else />
      </div>
      <div class="message-content">
        <div class="message-title">{{ msg.title }}</div>
        <div class="message-desc">{{ msg.content }}</div>
        <div class="message-meta">
          <span class="message-time">{{ msg.time }}</span>
        </div>
      </div>
    </div>
    
    <a-empty v-if="!messages || messages.length === 0" description="暂无消息" />
  </div>
</template>

<script setup lang="ts">
import {
  AlertFilled,
  NotificationFilled,
  MessageFilled,
} from '@ant-design/icons-vue'

defineProps<{
  messages: any[]
}>()

const emit = defineEmits<{
  read: [id: string]
}>()

const markRead = (id: string) => {
  emit('read', id)
}
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.message-item:hover {
  background: #f5f5f5;
}

.message-item.unread {
  background: rgba(24, 144, 255, 0.05);
}

.message-item.unread:hover {
  background: rgba(24, 144, 255, 0.1);
}

.message-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  font-size: 18px;
  flex-shrink: 0;
}

.message-icon.system {
  color: #722ed1;
  background: rgba(114, 46, 209, 0.1);
}

.message-icon.notice {
  color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
}

.message-icon.message {
  color: #52c41a;
  background: rgba(82, 196, 26, 0.1);
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-title {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 4px;
}

.message-desc {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.message-meta {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.dark .message-item:hover {
  background: #1f1f1f;
}
.dark .message-item.unread {
  background: rgba(24, 144, 255, 0.1);
}
.dark .message-title {
  color: rgba(255, 255, 255, 0.85);
}
.dark .message-desc {
  color: rgba(255, 255, 255, 0.65);
}
</style>
