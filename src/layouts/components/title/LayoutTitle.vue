<script setup>
import { computed } from 'vue'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'

defineProps({
  collapsed: {
    type: Boolean
  }
})

const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = layoutThemeStore.layoutSetting
const title = computed(() => layoutSetting.title)
const titleColor = computed(() => layoutThemeStore.titleColor)

const style = computed(() => {
  return {
    paddingLeft: '10px',
    height: `var(--app-header-height)`,
    color: titleColor.value
  }
})
</script>

<template>
  <div class="flex-cc overflow-hidden whitespace-nowrap font-500 text-20px" :style="style">
    <img class="h32px mr10px" src="~@/assets/images/logo.png" alt="" />
    <div v-show="!collapsed">
      {{ title }}
    </div>
  </div>
</template>

<style lang="less" scoped></style>
