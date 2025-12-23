<script setup>
import { computed } from 'vue'
import { useSystemStore } from '@/store/layout/system.js'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'

const systemStore = useSystemStore()
const systemTime = computed(() => systemStore.systemTime)
const layoutThemeStore = useLayoutThemeStore()
const copyright = computed(() => layoutThemeStore.layoutSetting.copyright)
</script>

<template>
  <ALayoutFooter style="padding: 0 20px 20px 20px">
    <ACard class="text-center" :bodyStyle="{ padding: '10px' }">
      Copyright ©{{ systemTime.year }} {{ copyright }}
    </ACard>
  </ALayoutFooter>
</template>

<style lang="less" scoped></style>
