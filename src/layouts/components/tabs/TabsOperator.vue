<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSystemStore } from '@/store/layout/system.js'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import { message } from 'ant-design-vue'
import { isFunction } from 'lodash-es'
import {
  DownOutlined,
  ReloadOutlined,
  CloseOutlined,
  VerticalRightOutlined,
  VerticalLeftOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
} from '@ant-design/icons-vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  tabItem: {
    type: Object,
    required: true,
  },
  isExtra: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()
const router = useRouter()
const systemStore = useSystemStore()
const isDevMode = import.meta.env.DEV

const activeKey = computed(() => systemStore.getCurrentTab?.fullPath)
const tabsList = computed(() => systemStore.getTabsList)

const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = layoutThemeStore.layoutSetting
const tabsIcon = computed(() => layoutSetting.tabsIcon)

// 目标路由是否与当前路由相同
const isCurrentRoute = (route) =>
  router.currentRoute.value.matched.some((item) => item.name === route.name)

const reloadPage = () => {
  // router.replace({
  //   name: 'Refresh',
  //   path: unref(route).fullPath,
  // })

  // 通过改变页面key来实现重新加载当前页面
  systemStore.setPageKey()
}
const removeTab = () => {
  if (tabsList.value.length === 1) return message.warning(t('message.lastPageCannotBeClosed'))
  systemStore.closeCurrentTab(props.tabItem)
}
defineExpose({
  removeTab,
})
const closeLeft = () => {
  systemStore.closeLeftTabs(props.tabItem)
  if (!isCurrentRoute(props.tabItem)) router.replace(props.tabItem.fullPath)
}
const closeRight = () => {
  systemStore.closeRightTabs(props.tabItem)
  if (!isCurrentRoute(props.tabItem)) router.replace(props.tabItem.fullPath)
}
const closeOther = () => {
  systemStore.closeOtherTabs(props.tabItem)
  if (!isCurrentRoute(props.tabItem)) router.replace(props.tabItem.fullPath)
}
const closeAll = () => {
  systemStore.closeAllTabs()
  router.replace('/')
}
/** 打开页面所在的文件(仅在开发环境有效) */
const openPageFile = async () => {
  if (!isDevMode) {
    console.warn('仅在开发环境有效')
    return
  }

  const routes = router.getRoutes()
  const target = routes.find((n) => n.name === props.tabItem.name)
  if (target) {
    const comp = target.components?.default
    let __file = comp?.__file
    if (isFunction(comp)) {
      try {
        const res = await comp()
        __file = res?.default?.__file
      } catch (error) {
        console.log(error)
      }
    }
    if (__file) {
      const filePath = `/__open-in-editor?file=${__file}`
      console.log(filePath)
      await fetch(filePath)
    }
  }
}
</script>

<template>
  <ADropdown :trigger="[isExtra ? 'click' : 'contextmenu']">
    <span v-if="isExtra" class="cursor-pointer" @click.prevent>
      <DownOutlined />
    </span>
    <div v-else style="display: inline-block">
      <template v-if="tabsIcon">
        <Icon class="iconify anticon" :icon="tabItem.meta.icon" />
      </template>
      <span>{{ t(tabItem.meta?.title) }}</span>
    </div>
    <template #overlay>
      <AMenu style="user-select: none">
        <AMenuItem key="1" :disabled="activeKey !== tabItem.fullPath" @click="reloadPage">
          <ReloadOutlined />
          重新加载
        </AMenuItem>
        <AMenuItem key="2" @click="removeTab">
          <CloseOutlined />
          关闭标签页
        </AMenuItem>
        <ADivider class="m0" />
        <AMenuItem key="3" @click="closeLeft">
          <VerticalRightOutlined />
          关闭左侧标签页
        </AMenuItem>
        <AMenuItem key="4" @click="closeRight">
          <VerticalLeftOutlined />
          关闭右侧标签页
        </AMenuItem>
        <ADivider class="m0" />
        <AMenuItem key="5" @click="closeOther">
          <ColumnWidthOutlined />
          关闭其他标签页
        </AMenuItem>
        <AMenuItem key="6" @click="closeAll">
          <MinusOutlined />
          关闭全部标签页
        </AMenuItem>
        <template v-if="isDevMode">
          <ADivider class="m0" />
          <AMenuItem key="7" @click="openPageFile">
            <ColumnWidthOutlined />
            打开页面文件
          </AMenuItem>
        </template>
      </AMenu>
    </template>
  </ADropdown>
</template>

<style lang="less" scoped></style>
