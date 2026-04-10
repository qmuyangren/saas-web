<template>
  <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
    <div style="display: flex; align-items: center; gap: 16px">
      <span
        @click="$emit('toggle')"
        style="font-size: 18px; cursor: pointer; display: flex; align-items: center"
      >
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </span>
      <AppBreadcrumb />
    </div>
    
    <div style="display: flex; align-items: center; gap: 4px">
      <SearchBox />
      <BusinessSwitch />
      <Fullscreen />
      <MessageList />
      <LangSwitch />
      <SettingsDrawer />
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import {
  AppBreadcrumb,
  SearchBox,
  Fullscreen,
  LangSwitch,
  BusinessSwitch,
  SettingsDrawer,
  MessageList,
  UserInfo,
} from '@/components/layout'

defineProps<{
  collapsed: boolean
  isDark: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>
