<template>
  <div class="dashboard-container">
    <!-- 统计卡片 -->
    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :sm="12" :md="12" :lg="6">
        <a-card :bordered="false" class="stat-card">
          <a-statistic
            title="总销售额"
            :value="stats.totalRevenue"
            :precision="2"
            prefix="¥"
          >
            <template #suffix>
              <span class="trend up">
                <CaretUpOutlined /> 12%
              </span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="12" :lg="6">
        <a-card :bordered="false" class="stat-card">
          <a-statistic
            title="访问量"
            :value="stats.totalVisits"
          >
            <template #suffix>
              <span class="trend up">
                <CaretUpOutlined /> 11%
              </span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="12" :lg="6">
        <a-card :bordered="false" class="stat-card">
          <a-statistic
            title="订单数"
            :value="stats.totalOrders"
          >
            <template #suffix>
              <span class="trend down">
                <CaretDownOutlined /> 5%
              </span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="12" :lg="6">
        <a-card :bordered="false" class="stat-card">
          <a-statistic
            title="增长率"
            :value="stats.growthRate"
            suffix="%"
            :precision="1"
          >
            <template #suffix>
              <span class="trend up">
                <CaretUpOutlined /> 8%
              </span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <!-- 活动记录 -->
    <a-card
      title="活动记录"
      :bordered="false"
      style="margin-top: 24px"
    >
      <a-timeline>
        <a-timeline-item
          v-for="item in activities"
          :key="item.id"
          :color="getActivityColor(item.type)"
        >
          <template #dot>
            <CheckCircleOutlined v-if="item.type === 'order'" style="color: #52c41a" />
            <UserOutlined v-else-if="item.type === 'user'" style="color: #1890ff" />
            <SettingOutlined v-else style="color: #faad14" />
          </template>
          <div class="activity-item">
            <span class="activity-title">{{ item.title }}</span>
            <span class="activity-time">{{ item.time }}</span>
          </div>
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CheckCircleOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { getOverviewApi, getActivityApi } from '@/api'

const stats = reactive({
  totalRevenue: 0,
  totalVisits: 0,
  totalOrders: 0,
  growthRate: 0,
})

const activities = ref<any[]>([])

const getActivityColor = (type: string) => {
  const colors: Record<string, string> = {
    order: 'green',
    user: 'blue',
    system: 'orange',
  }
  return colors[type] || 'gray'
}

const loadOverview = async () => {
  try {
    const res = await getOverviewApi()
    if (res.data) {
      stats.totalRevenue = res.data.totalRevenue
      stats.totalVisits = res.data.totalUsers
      stats.totalOrders = res.data.totalOrders
      stats.growthRate = res.data.growthRate
    }
  } catch (error) {
    console.error('Load overview failed:', error)
    // 使用 Mock 数据
    stats.totalRevenue = 99999.99
    stats.totalVisits = 1234
    stats.totalOrders = 5678
    stats.growthRate = 12.5
  }
}

const loadActivities = async () => {
  try {
    const res = await getActivityApi()
    if (res.data?.list) {
      activities.value = res.data.list
    }
  } catch (error) {
    console.error('Load activities failed:', error)
    // 使用 Mock 数据
    activities.value = [
      { id: '1', type: 'user', title: '新用户注册', time: '5 分钟前' },
      { id: '2', type: 'order', title: '新订单产生', time: '10 分钟前' },
      { id: '3', type: 'system', title: '系统更新完成', time: '1 小时前' },
      { id: '4', type: 'user', title: '用户信息更新', time: '2 小时前' },
      { id: '5', type: 'order', title: '订单已完成', time: '3 小时前' },
    ]
  }
}

onMounted(() => {
  loadOverview()
  loadActivities()
})
</script>

<style scoped>
.dashboard-container {
  padding: 0;
}

.stat-card {
  cursor: pointer;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.trend {
  margin-left: 8px;
  font-size: 14px;
}

.trend.up {
  color: #f5222d;
}

.trend.down {
  color: #52c41a;
}

:deep(.ant-statistic-title) {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}

:deep(.ant-statistic-content) {
  font-size: 24px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}

.activity-time {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

/* 暗色模式适配 */
.dark :deep(.ant-card) {
  background: #1f1f1f;
}

.dark :deep(.ant-statistic-title) {
  color: rgba(255, 255, 255, 0.45);
}

.dark :deep(.ant-statistic-content) {
  color: rgba(255, 255, 255, 0.85);
}

.dark :deep(.ant-timeline-item-content) {
  color: rgba(255, 255, 255, 0.85);
}
</style>
