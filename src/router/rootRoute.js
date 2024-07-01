import { RouterView } from 'vue-router'
import router from '@/router/index.js'

const LayoutDefault = () => import('@/layouts/LayoutDefault.vue')

// 刷新
const RefreshRoute = {
  path: '/refresh',
  name: 'Refresh',
  component: RouterView,
  meta: {
    title: '刷新'
  },
  beforeEnter: (to, from) => {
    // 刷新
    setTimeout(() => {
      router.replace(from.fullPath)
    })
    return true
  }
}

// 跟路由
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
  component: LayoutDefault,
  meta: {
    title: '根路由',
    icon: 'material-symbols:account-tree-outline-rounded'
  },
  children: [
    {
      path: '/dashboard',
      redirect: '/dashboard/workbench',
      name: 'Dashboard',
      meta: {
        title: '仪表盘',
        icon: 'material-symbols:dashboard-outline',
        namePath: ['Dashboard']
      },
      children: [
        {
          path: 'workbench',
          name: 'Workbench',
          component: () => import('@/views/example/workbench/WorkbenchView.vue'),
          meta: {
            title: '工作台',
            icon: 'icon-park-outline:workbench',
            namePath: ['Dashboard', 'Workbench']
          }
        }
      ]
    },
    {
      path: '/outside',
      redirect: '/outside/iframe',
      name: 'OutSide',
      meta: {
        title: '外部页面',
        icon: 'material-symbols:link',
        namePath: ['OutSide']
      },
      children: [
        {
          path: 'iframe',
          name: 'Iframe',
          component: () => import('@/views/iframe/IframeView.vue'),
          meta: {
            title: 'bilibili（内嵌）',
            icon: 'simple-icons:bilibili',
            namePath: ['OutSide', 'Iframe'],
            iframe: 'https://www.bilibili.com/'
          }
        },
        {
          path: 'https://www.zhihu.com/',
          name: 'OutsideLink',
          meta: {
            title: '知乎（外链）',
            icon: 'simple-icons:zhihu',
            namePath: ['OutSide', 'OutsideLink'],
            outsideLink: true
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/example/about/AboutView.vue'),
      meta: {
        title: '关于',
        icon: 'material-symbols:info-outline-rounded',
        namePath: ['About']
      }
    },

    RefreshRoute
  ]
}

export default RootRoute
