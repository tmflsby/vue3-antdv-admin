<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <AResult status="404" title="404" :sub-title="t('message.sorryPageNotFound')">
    <template #extra>
      <AButton type="primary" @click="() => router.push('/')">
        {{ t('setting.backToHome') }}
      </AButton>
    </template>
  </AResult>
</template>

<style lang="less" scoped></style>
