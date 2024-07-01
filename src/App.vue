<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import LockScreen from '@/layouts/components/lockscreen/LockScreen.vue'

const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = layoutThemeStore.layoutSetting
const theme = computed(() => layoutThemeStore.theme)
const watermark = computed(() => layoutSetting.watermark)
const watermarkArea_all = computed(() => layoutSetting.watermarkArea === 'all')
const watermarkText = computed(() => layoutSetting.watermarkText)
</script>

<template>
  <a-config-provider :theme="theme">
    <a-watermark v-if="watermark && watermarkArea_all" :content="watermarkText">
      <RouterView />
      <LockScreen />
    </a-watermark>
    <template v-else>
      <RouterView />
      <LockScreen />
    </template>
  </a-config-provider>
</template>

<style lang="less" scoped></style>
