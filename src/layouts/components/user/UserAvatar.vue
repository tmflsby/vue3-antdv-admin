<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/business/user.js'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const logout = () => {
  userStore.logout()
}
</script>

<template>
  <a-dropdown>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="logout">退出登录</a-menu-item>
      </a-menu>
    </template>
    <a-avatar :src="userInfo.avatar" :alt="userInfo.username">
      {{ userInfo.username }}
    </a-avatar>
  </a-dropdown>
</template>

<style scoped lang="less"></style>
