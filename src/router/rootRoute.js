import { RouterView } from 'vue-router'
import router from '@/router/index.js'

// 刷新
const RefreshRoute = {
  path: '/refresh',
  name: 'Refresh',
  component: RouterView,
  meta: {
    title: 'route.refresh',
  },
  beforeEnter: (to, from) => {
    // 刷新
    setTimeout(() => {
      router.replace(from.fullPath)
    })
    return true
  },
}

// 跟路由 静态路由
/**
 * meta 属性
 * title: 路由标题
 * icon: 路由图标
 * namePath： 路由名称路径（当前路由namePath 祖先name集合）
 * outsideLink：是否外链 (window.open) 起一个新标签页
 * iframe：iframe内嵌
 * */
const RootRoute = {
  path: '/',
  redirect: '/dashboard',
  name: 'Layout',
  component: () => import('@/layouts/LayoutDefault.vue'),
  meta: {
    title: 'route.rootRoute',
    icon: 'material-symbols:account-tree-outline-rounded',
  },
  children: [
    {
      path: '/dashboard',
      redirect: '/dashboard/workbench',
      name: 'Dashboard',
      meta: {
        title: 'route.dashboard',
        icon: 'material-symbols:dashboard-outline',
        namePath: ['Dashboard'],
      },
      children: [
        {
          path: 'workbench',
          name: 'Workbench',
          component: () => import('@/views/example/workbench/WorkbenchView.vue'),
          meta: {
            title: 'route.workbench',
            icon: 'icon-park-outline:workbench',
            namePath: ['Dashboard', 'Workbench'],
          },
        },
      ],
    },
    {
      path: '/outside',
      redirect: '/outside/iframe',
      name: 'OutSide',
      meta: {
        title: 'route.outsidePage',
        icon: 'material-symbols:link',
        namePath: ['OutSide'],
      },
      children: [
        {
          path: 'iframe',
          name: 'Iframe',
          component: () => import('@/views/iframe/IframeView.vue'),
          meta: {
            title: 'route.bilibili',
            icon: 'simple-icons:bilibili',
            namePath: ['OutSide', 'Iframe'],
            iframe: 'https://www.bilibili.com/',
          },
        },
        {
          path: 'https://www.zhihu.com/',
          name: 'OutsideLink',
          meta: {
            title: 'route.zhihu',
            icon: 'simple-icons:zhihu',
            namePath: ['OutSide', 'OutsideLink'],
            outsideLink: true,
          },
        },
      ],
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/example/about/AboutView.vue'),
      meta: {
        title: 'route.about',
        icon: 'material-symbols:info-outline-rounded',
        namePath: ['About'],
      },
    },

    RefreshRoute,
  ],
}

export default RootRoute
