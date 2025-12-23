<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useSystemStore } from '@/store/layout/system.js'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import { hexToRgba } from '@/utils/color.js'
import { Icon } from '@iconify/vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const systemStore = useSystemStore()

const layoutThemeStore = useLayoutThemeStore()
const layoutSetting = layoutThemeStore.layoutSetting
const showBreadcrumbIcon = computed(() => layoutSetting.showBreadcrumbIcon)
const headerColor = computed(() => layoutThemeStore.headerColor)
const theme = computed(() => (headerColor.value === '#fff' ? 'dark' : 'light'))

const menus = computed(() => {
  if (route.meta?.namePath) {
    let children = systemStore.menus
    const paths = route.meta?.namePath?.map((item) => {
      const a = children.find((n) => n.name === item)
      children = a?.children || []
      return a
    })
    return [
      {
        name: '__index',
        meta: {
          title: 'route.home',
          icon: 'material-symbols:home',
        },
        children: systemStore.menus,
      },
      ...paths,
    ]
  }
  return route.matched
})

// 点击菜单
const clickMenuItem = (menuItem) => {
  const { outsideLink } = menuItem?.meta || {}
  if (outsideLink) {
    window.open(menuItem.path)
  } else {
    const to = typeof menuItem.redirect === 'string' ? menuItem.redirect : menuItem
    router.push(to)
  }
}

const getSelectKeys = (routeIndex) => {
  return [menus.value[routeIndex + 1]?.name]
}

const style = computed(() => {
  return {
    '--breadcrumb-overlay-color': hexToRgba(headerColor.value, 0.5),
    '--breadcrumb-color': headerColor.value,
  }
})
</script>

<template>
  <div class="layout-breadcrumb">
    <ABreadcrumb :style="style">
      <template v-for="(routeItem, routeIndex) in menus" :key="routeItem?.name">
        <ABreadcrumbItem>
          <Icon class="iconify anticon" v-if="showBreadcrumbIcon" :icon="routeItem?.meta.icon" />
          <span class="cursor-pointer ml10px">{{ t(routeItem?.meta?.title) }}</span>
          <template v-if="routeItem?.children?.length" #overlay>
            <AMenu :selected-keys="getSelectKeys(routeIndex)" :theme="theme">
              <template v-for="childItem in routeItem?.children" :key="childItem.name">
                <AMenuItem @click="clickMenuItem(childItem)">
                  <Icon
                    class="iconify anticon"
                    v-if="showBreadcrumbIcon"
                    :icon="childItem.meta.icon"
                  />
                  <span class="ml10px">{{ t(childItem.meta?.title) }}</span>
                </AMenuItem>
              </template>
            </AMenu>
          </template>
        </ABreadcrumbItem>
      </template>
    </ABreadcrumb>
  </div>
</template>

<style lang="less" scoped>
.layout-breadcrumb {
  :deep(.ant-breadcrumb) {
    .ant-breadcrumb-link {
      color: var(--breadcrumb-color);
    }
    .ant-dropdown-trigger {
      .ant-breadcrumb-link {
        color: var(--breadcrumb-overlay-color);
      }
    }
    .ant-breadcrumb-separator,
    .anticon {
      color: var(--breadcrumb-overlay-color);
    }
  }
}
</style>
