<script lang="ts" setup>
import { computed, unref } from 'vue'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()

const getTitle = computed(() => (unref(isFullscreen) ? '退出全屏' : '全屏'))
</script>

<template>
  <a-tooltip :title="getTitle">
    <span @click="toggle" class="cursor-pointer">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </a-tooltip>
</template>

<style lang="less" scoped></style>
