import NProgress from 'nprogress'
import { useSystemStore } from '@/store/layout/system.js'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'

const getComponentName = (route) => {
  return route.matched
    .map((item) => {
      if (!item.meta?.keepAlive || item.redirect) return
      return item.name
    })
    .filter(Boolean)
}

export const routerGuards = (router) => {
  router.beforeEach((to, from, next) => {
    const layoutThemeStore = useLayoutThemeStore()
    if (layoutThemeStore.layoutSetting.showProgress) {
      NProgress.start()
    }
    next()
  })

  router.afterEach((to) => {
    const layoutThemeStore = useLayoutThemeStore()
    if (layoutThemeStore.layoutSetting.showProgress) {
      NProgress.done()
    }

    const systemStore = useSystemStore()
    const toComponentName = getComponentName(to)
    // console.log(toComponentName, '========')
    if (to.meta?.keepAlive) {
      if (toComponentName) {
        systemStore.addKeepAliveList(toComponentName)
      } else {
        console.warn(
          `${to.fullPath}页面组件的keepAlive为true但未设置组件名，会导致缓存失效，请检查`,
        )
      }
    } else {
      if (toComponentName) {
        systemStore.removeKeepAliveList(toComponentName)
      }
    }
    // console.log('路由跳转', to, from, failure)
  })

  router.onError(() => {
    // console.error('路由错误', error)
  })
}
