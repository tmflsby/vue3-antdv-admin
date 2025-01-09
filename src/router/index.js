import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routerGuards } from '@/router/guards.js'
import rootRoute from '@/router/rootRoute.js'
import outsideLayoutRoute from '@/router/outsideLayoutRoute.js'

const routes = [rootRoute, ...outsideLayoutRoute]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
    }
  },
})

export const setupRouter = (app) => {
  routerGuards(router)
  app.use(router)
}

export default router
