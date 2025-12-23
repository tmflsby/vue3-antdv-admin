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
const menuTheme = computed(() => layoutSetting.menuTheme)
const showTitle = computed(() => layoutSetting.showTitle)
const showHeader = computed(() => layoutSetting.showHeader)
const showFooter = computed(() => layoutSetting.showFooter)
const sidemenuWidth = computed(() => layoutSetting.sidemenuWidth)
const watermark = computed(() => layoutSetting.watermark)
const watermarkArea_content = computed(() => layoutSetting.watermarkArea === 'content')
const watermarkText = computed(() => layoutSetting.watermarkText)
const border = computed(() => layoutThemeStore.border)
</script>

<template>
  <ALayout class="h100vh overflow-hidden">
    <LayoutHeader v-if="showHeader" v-model:collapsed="collapsed">
      <template #title>
        <LayoutTitle v-if="showTitle" />
      </template>
    </LayoutHeader>
    <ALayout>
      <ALayoutSider
        v-model:collapsed="collapsed"
        :width="sidemenuWidth"
        :theme="menuTheme"
        :collapsedWidth="80"
        :collapsible="true"
        :trigger="null"
        :style="{ borderRight: border }"
      >
        <LayoutMenu :collapsed="collapsed" />
      </ALayoutSider>
      <ALayout>
        <ALayoutContent>
          <LayoutTabs />
          <AWatermark v-if="watermark && watermarkArea_content" :content="watermarkText">
            <LayoutPage />
          </AWatermark>
          <LayoutPage v-else />
        </ALayoutContent>
        <LayoutFooter v-if="showFooter" />
      </ALayout>
    </ALayout>
  </ALayout>
</template>

<style scoped lang="less"></style>
