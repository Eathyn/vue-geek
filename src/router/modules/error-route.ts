import { RouteRecordRaw } from 'vue-router'

const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/view/error/403.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/view/error/404.vue'),
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/view/error/500.vue'),
  },
]

export default errorRoutes
