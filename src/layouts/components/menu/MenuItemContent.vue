<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <template v-if="item?.meta?.icon">
    <Icon class="iconify anticon" :icon="item.meta.icon" />
  </template>
  <span class="ml10px text-14px" :title="item?.meta?.title">{{ item.meta.title }}</span>
</template>

<style lang="less" scoped></style>
