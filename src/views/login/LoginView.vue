<script setup>
import { computed } from 'vue'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import LayoutSetting from '@/layouts/components/setting/LayoutSetting.vue'
import LoginForm from '@/views/login/LoginForm.vue'

const layoutSetting = useLayoutThemeStore().layoutSetting
const showSetting = computed(() => layoutSetting.showSetting)
const algorithm = computed(() => layoutSetting.algorithm)
const title = computed(() => layoutSetting.title)

const bodyStyle = computed(() => ({
  width: '100%',
  height: '100%',
  backgroundColor: algorithm.value === 'darkAlgorithm' ? '#001529' : '#eee',
  position: 'relative',
}))
</script>

<template>
  <ACard class="w100vw h100vh" :bodyStyle="bodyStyle">
    <ACard
      class="pos-fixed right--1 top-100 z-999"
      :bodyStyle="{ padding: '10px' }"
      v-if="showSetting"
    >
      <LayoutSetting />
    </ACard>
    <ACard
      class="pos-absolute w400px h400px"
      :style="{
        top: 'calc(50% - 200px)',
        left: 'calc(50% - 200px)',
      }"
    >
      <template #title>
        <div class="text-center">{{ title }}</div>
      </template>
      <LoginForm />
    </ACard>
  </ACard>
</template>

<style lang="less" scoped></style>
