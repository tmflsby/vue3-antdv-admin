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
  <ADropdown>
    <template #overlay>
      <AMenu>
        <AMenuItem @click="logout">{{ t('setting.logout') }}</AMenuItem>
      </AMenu>
    </template>
    <AAvatar :src="userInfo.avatar" :alt="userInfo.username">
      {{ userInfo.username }}
    </AAvatar>
  </ADropdown>
</template>

<style scoped lang="less"></style>
