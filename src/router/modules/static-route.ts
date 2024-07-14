import { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HOME_URL,
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    redirect: HOME_URL,
    children: [],
  },
]

export default staticRoutes
