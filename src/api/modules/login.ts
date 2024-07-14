// import authMenuList from '@/assets/json/authMenuList.json'
// import authButtonList from '@/assets/json/authButtonList.json'
import http from '@/api/index.ts'
import { PORT1 } from '@/api/config/service-port.ts'
import { Login } from '@/api/interface'
import { Menu } from '@/typings/global'

export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`${PORT1}/login`, params, {
    noLoading: true,
  })
}

// 根据用户角色获取菜单列表
export function getAuthMenuListApi() {
  return http.get<Menu.MenuOptions[]>(
    `${PORT1}/menu/list`,
    {},
    { noLoading: true },
  )
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  // return authMenuList
}

// 根据用户角色获取按钮列表
export function getAuthButtonListApi() {
  return http.get<Login.ResAuthButtons>(
    `${PORT1}/auth/buttons`,
    {},
    { noLoading: true },
  )
  // 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtonList.json 数据
  // return authButtonList
}
