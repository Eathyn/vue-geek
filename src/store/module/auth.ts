import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import {
  getAuthButtonListApi,
  getAuthMenuListApi,
} from '@/api/modules/login.ts'
import { getAllBreadcrumbList, getFlatMenuList } from '@/utils'
import { Menu } from '@/typings/global'
import { getShowMenuList } from '@/utils'

const useAuthStore = defineStore('auth', () => {
  // 按钮权限列表
  const authButtonList = ref({})
  // 菜单权限列表
  const authMenuList = ref<Menu.MenuOptions[]>([])
  // 当前页面的 router name，用来做按钮权限筛选
  const routeName = ref('')

  // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
  const showMenuListGet = computed(() => getShowMenuList(authMenuList.value))
  // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
  const flatMenuListGet = computed(() => getFlatMenuList(authMenuList.value))
  // 递归处理后的所有面包屑导航列表
  const breadcrumbListGet = computed(() =>
    getAllBreadcrumbList(authMenuList.value),
  )

  // 根据用户角色获取菜单列表
  async function getAuthMenuList() {
    const { data } = await getAuthMenuListApi()
    authMenuList.value = data
  }

  // 根据用户角色获取按钮列表
  async function getAuthButtonList() {
    const { data } = await getAuthButtonListApi()
    authButtonList.value = data
  }

  async function setRouteName(name: string) {
    routeName.value = name
  }

  return {
    authButtonList,
    authMenuList,
    routeName,
    showMenuListGet,
    flatMenuListGet,
    breadcrumbListGet,
    getAuthMenuList,
    getAuthButtonList,
    setRouteName,
  }
})

export default useAuthStore
