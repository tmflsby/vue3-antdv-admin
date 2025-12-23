<script setup>
import { computed } from 'vue'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import LayoutSetting from '@/layouts/components/setting/LayoutSetting.vue'
import LayoutPage from '@/layouts/components/page/LayoutPage.vue'

const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = layoutThemeStore.layoutSetting
const watermark = computed(() => layoutSetting.watermark)
const watermarkArea_content = computed(() => layoutSetting.watermarkArea === 'content')
const watermarkText = computed(() => layoutSetting.watermarkText)
const showSetting = computed(() => layoutSetting.showSetting)
</script>

<template>
  <ALayout class="h100vh overflow-hidden">
    <AWatermark v-if="watermark && watermarkArea_content" :content="watermarkText">
      <LayoutPage />
    </AWatermark>
    <LayoutPage v-else />
    <ACard
      class="pos-fixed right--1 top-100 z-999"
      v-if="showSetting"
      :bodyStyle="{ padding: '10px' }"
    >
      <LayoutSetting />
    </ACard>
  </ALayout>
</template>

<style lang="less" scoped></style>
