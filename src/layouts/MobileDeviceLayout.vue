<script setup>
import LayoutHeader from '@/layouts/components/header/LayoutHeader.vue'
import { ref, computed } from 'vue'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import LayoutTabs from '@/layouts/components/tabs/LayoutTabs.vue'
import LayoutFooter from '@/layouts/components/footer/LayoutFooter.vue'
import LayoutPage from '@/layouts/components/page/LayoutPage.vue'
import LayoutTitle from '@/layouts/components/title/LayoutTitle.vue'
import LayoutMenu from '@/layouts/components/menu/LayoutMenu.vue'

const collapsed = ref(false)
const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = layoutThemeStore.layoutSetting
const sidemenuWidth = computed(() => layoutSetting.sidemenuWidth)
const showTitle = computed(() => layoutSetting.showTitle)
const showHeader = computed(() => layoutSetting.showHeader)
const showFooter = computed(() => layoutSetting.showFooter)
const watermark = computed(() => layoutSetting.watermark)
const watermarkArea_content = computed(() => layoutSetting.watermarkArea === 'content')
const watermarkText = computed(() => layoutSetting.watermarkText)
</script>

<template>
  <ALayout>
    <ADrawer
      v-model:open="collapsed"
      :placement="'left'"
      :bodyStyle="{ padding: 0 }"
      :width="sidemenuWidth"
      :closable="false"
    >
      <LayoutTitle v-if="showTitle" :collapsed="false" />
      <LayoutMenu :collapsed="collapsed" />
    </ADrawer>
    <LayoutHeader v-if="showHeader" v-model:collapsed="collapsed" />
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
