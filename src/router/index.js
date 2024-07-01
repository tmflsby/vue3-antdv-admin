import { createRouter, createWebHistory } from 'vue-router'
import { routerGuard } from '@/router/guards.js'
import rootRoute from '@/router/rootRoute.js'
import outsideLayoutRoute from '@/router/outsideLayoutRoute.js'

const routes = [rootRoute, ...outsideLayoutRoute]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export const setupRouter = (app) => {
  routerGuard(router)
  app.use(router)
}

export default router
