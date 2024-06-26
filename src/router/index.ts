import { createRouter, createWebHashHistory } from 'vue-router'

import staticRoutes from '@/router/modules/static-route.ts'
import errorRoutes from '@/router/modules/error-route.ts'
import useUserStore from '@/store/module/user.ts'
import useAuthStore from '@/store/module/auth.ts'
import NProgress from '@/config/nprogress.ts'
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config'
import { initDynamicRoutes } from '@/router/modules/dynamic-route.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes, ...errorRoutes],
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  // 1.NProgress 开始
  NProgress.start()

  // 2.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE
  document.title = to.meta.title
    ? `${to.meta.title} - ${title}`
    : `${to.meta.title}`

  // 3.判断是否访问登录页面
  if (to.path.toLowerCase() === LOGIN_URL) {
    // 如果有 token 则返回之前的页面
    if (userStore.token) {
      return next(from.fullPath)
    }
    // 如果没有 token 则重置路由，然后进入登录页面
    resetRouter()
    return next()
  }

  // 4.判断访问页面是否在路由白名单地址中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) {
    return next()
  }

  // 5.如果没有 token，则重定向到登录页面
  if (!userStore.token) {
    return next({
      path: LOGIN_URL,
      replace: true,
    })
  }

  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.authMenuList.length) {
    await initDynamicRoutes()
    return next({
      ...to,
      replace: true,
    })
  }

  // 7.存储 routerName 做按钮权限筛选
  await authStore.setRouteName(to.name as string)

  // 8.正常访问页面
  next()
})

/**
 * @description 重置路由
 * */
function resetRouter() {
  const authStore = useAuthStore()
  authStore.flatMenuListGet.forEach((route) => {
    const { name } = route
    if (name && router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done()
  console.error('路由错误', error.message)
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done()
})

export default router
