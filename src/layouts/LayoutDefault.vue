<script setup>
import { ref, computed } from 'vue'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import LayoutTitle from '@/layouts/components/title/LayoutTitle.vue'
import LayoutMenu from '@/layouts/components/menu/LayoutMenu.vue'
import LayoutHeader from '@/layouts/components/header/LayoutHeader.vue'
import LayoutFooter from '@/layouts/components/footer/LayoutFooter.vue'
import LayoutTabs from '@/layouts/components/tabs/LayoutTabs.vue'
import LayoutPage from '@/layouts/components/page/LayoutPage.vue'
import LayoutSetting from '@/layouts/components/setting/LayoutSetting.vue'

const collapsed = ref(false)
const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = layoutThemeStore.layoutSetting
const menuTheme = computed(() => layoutSetting.menuTheme)
const layout_sidemenu = computed(() => layoutSetting.layout === 'sidemenu')
const layout_topmenu = computed(() => layoutSetting.layout === 'topmenu')
const layout_mixinmenu = computed(() => layoutSetting.layout === 'mixinmenu')
const onlyShowContent = computed(() => layoutSetting.onlyShowContent)
const showTitle = computed(() => layoutSetting.showTitle)
const showHeader = computed(() => layoutSetting.showHeader)
const showFooter = computed(() => layoutSetting.showFooter)
const showSetting = computed(() => layoutSetting.showSetting)
const sidemenuWidth = computed(() => layoutSetting.sidemenuWidth)
const watermark = computed(() => layoutSetting.watermark)
const watermarkArea_content = computed(() => layoutSetting.watermarkArea === 'content')
const watermarkText = computed(() => layoutSetting.watermarkText)
const border = computed(() => layoutThemeStore.border)
</script>

<template>
  <a-layout v-if="!onlyShowContent" class="h100vh overflow-hidden">
    <a-layout-sider
      v-if="layout_sidemenu"
      v-model:collapsed="collapsed"
      :width="sidemenuWidth"
      :collapsedWidth="80"
      :collapsible="true"
      :trigger="null"
      :theme="menuTheme"
      :style="{ borderRight: border }"
    >
      <LayoutTitle v-if="showTitle" :collapsed="collapsed" />
      <LayoutMenu :collapsed="collapsed" />
    </a-layout-sider>
    <LayoutHeader v-if="showHeader && layout_mixinmenu" v-model:collapsed="collapsed">
      <template #title>
        <LayoutTitle v-if="showTitle" />
      </template>
    </LayoutHeader>
    <a-layout>
      <LayoutHeader v-if="showHeader && !layout_mixinmenu" v-model:collapsed="collapsed">
        <template #title v-if="layout_topmenu">
          <LayoutTitle v-if="showTitle" :collapsed="collapsed" />
        </template>
        <template #menu v-if="layout_topmenu">
          <LayoutMenu :collapsed="collapsed" />
        </template>
      </LayoutHeader>
      <a-layout-sider
        v-if="layout_mixinmenu"
        v-model:collapsed="collapsed"
        :width="sidemenuWidth"
        :theme="menuTheme"
        :collapsedWidth="80"
        :collapsible="true"
        :trigger="null"
        :style="{ borderRight: border }"
      >
        <LayoutMenu :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout v-if="layout_mixinmenu">
        <a-layout-content>
          <LayoutTabs />
          <a-watermark v-if="watermark && watermarkArea_content" :content="watermarkText">
            <LayoutPage />
          </a-watermark>
          <LayoutPage v-else />
        </a-layout-content>
        <LayoutFooter v-if="showFooter" />
      </a-layout>
      <template v-else>
        <a-layout-content>
          <LayoutTabs />
          <a-watermark v-if="watermark && watermarkArea_content" :content="watermarkText">
            <LayoutPage />
          </a-watermark>
          <LayoutPage v-else />
        </a-layout-content>
        <LayoutFooter v-if="showFooter" />
      </template>
    </a-layout>
  </a-layout>
  <a-layout v-else class="h100vh overflow-hidden">
    <a-watermark v-if="watermark && watermarkArea_content" :content="watermarkText">
      <LayoutPage />
    </a-watermark>
    <LayoutPage v-else />
    <a-card
      class="pos-fixed right--1 top-100 z-999"
      :bodyStyle="{ padding: '10px' }"
      v-if="showSetting"
    >
      <LayoutSetting />
    </a-card>
  </a-layout>
</template>

<style lang="less" scoped></style>
