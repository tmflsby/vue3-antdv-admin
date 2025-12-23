<script setup>
import { ref, computed } from 'vue'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import LayoutTitle from '@/layouts/components/title/LayoutTitle.vue'
import LayoutMenu from '@/layouts/components/menu/LayoutMenu.vue'
import LayoutHeader from '@/layouts/components/header/LayoutHeader.vue'
import LayoutFooter from '@/layouts/components/footer/LayoutFooter.vue'
import LayoutTabs from '@/layouts/components/tabs/LayoutTabs.vue'
import LayoutPage from '@/layouts/components/page/LayoutPage.vue'

const collapsed = ref(false)
const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = layoutThemeStore.layoutSetting
const showTitle = computed(() => layoutSetting.showTitle)
const showHeader = computed(() => layoutSetting.showHeader)
const showFooter = computed(() => layoutSetting.showFooter)
const watermark = computed(() => layoutSetting.watermark)
const watermarkArea_content = computed(() => layoutSetting.watermarkArea === 'content')
const watermarkText = computed(() => layoutSetting.watermarkText)
</script>

<template>
  <ALayout class="h100vh overflow-hidden">
    <LayoutHeader v-if="showHeader" v-model:collapsed="collapsed">
      <template #title>
        <LayoutTitle v-if="showTitle" :collapsed="collapsed" />
      </template>
      <template #menu>
        <LayoutMenu :collapsed="collapsed" />
      </template>
    </LayoutHeader>
    <ALayoutContent>
      <LayoutTabs />
      <AWatermark v-if="watermark && watermarkArea_content" :content="watermarkText">
        <LayoutPage />
      </AWatermark>
      <LayoutPage v-else />
    </ALayoutContent>
    <LayoutFooter v-if="showFooter" />
  </ALayout>
</template>

<style scoped lang="less"></style>
