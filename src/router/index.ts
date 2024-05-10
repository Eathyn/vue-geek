import { createRouter, createWebHashHistory } from 'vue-router'
import staticRoutes from '@/router/modules/static-route.ts'
import errorRoutes from '@/router/modules/error-route.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes, ...errorRoutes],
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
})

export default router
