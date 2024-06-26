import { ElNotification } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'
// useRouter 只能在 `setup` 函数或 `setup` 上下文中使用
import router from '@/router/index.ts'

import useUserStore from '@/store/module/user.ts'
import useAuthStore from '@/store/module/auth.ts'
import { LOGIN_URL } from '@/config'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

export async function initDynamicRoutes() {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  try {
    // 1.获取菜单列表 && 按钮权限列表
    await authStore.getAuthMenuList()
    await authStore.getAuthButtonList()

    // 2.判断当前用户有没有菜单权限
    if (!authStore.authMenuList.length) {
      ElNotification({
        title: '无权限访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000,
      })
      userStore.setToken('')
      await router.replace(LOGIN_URL)
      return Promise.reject('No permission')
    }

    // 3.添加动态路由
    authStore.flatMenuListGet.forEach((item) => {
      if (item.children) {
        delete item.children
      }
      // 将 component: <string> 转为 component: () => import('/src/views/<string>')
      if (item.component && typeof item.component === 'string') {
        // TODO: 驼峰格式转为短横杠模式（后端返回驼峰格式的字符串，而我的文件夹名想采用短横杠模式）
        item.component = modules['/src/views' + item.component + '.vue']
      }
      // isFull 表示非全屏，说明是 layout 的子路由
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw)
      } else {
        router.addRoute('layout', item as unknown as RouteRecordRaw)
      }
    })
  } catch (error) {
    // 当菜单列表请求或按钮列表请求失败时，重定向到登录页
    userStore.setToken('')
    await router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}
