import { createRouter, createWebHashHistory } from 'vue-router'
import staticRoutes from '@/router/modules/static-route.ts'
import errorRoutes from '@/router/modules/error-route.ts'
import NProgress from '@/config/nprogress.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes, ...errorRoutes],
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
})

// 1.NProgress 开始
NProgress.start()
export default router
