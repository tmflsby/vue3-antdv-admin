<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/business/user.js'

const { t } = useI18n()
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
        <a-menu-item @click="logout">{{ t('setting.logout') }}</a-menu-item>
      </a-menu>
    </template>
    <a-avatar :src="userInfo.avatar" :alt="userInfo.username">
      {{ userInfo.username }}
    </a-avatar>
  </a-dropdown>
</template>

<style scoped lang="less"></style>
