<script lang="ts" setup>
import { computed, unref } from 'vue'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useFullscreen } from '@vueuse/core'

const { toggle, isFullscreen } = useFullscreen()
const { t } = useI18n()

const getTitle = computed(() =>
  unref(isFullscreen) ? t('setting.exitFullscreen') : t('setting.fullscreen'),
)
</script>

<template>
  <ATooltip :title="getTitle">
    <span @click="toggle" class="cursor-pointer">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </ATooltip>
</template>

<style lang="less" scoped></style>
