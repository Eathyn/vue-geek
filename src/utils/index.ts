import { Menu } from '@/typings/global'

/**
 * @description 获取浏览器默认语言
 * */
export function getBrowserLang() {
  // 根据用户设置的浏览器语言
  const browserLang = navigator.language
  let defaultBrowserLang = ''
  if (['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = 'zh'
  } else {
    defaultBrowserLang = 'en'
  }
  return defaultBrowserLang
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

export function getFlatMenuList(
  menuList: Menu.MenuOptions[],
): Menu.MenuOptions[] {
  const menuListClone: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  const flatMenuList: Menu.MenuOptions[] = []
  makeMenuListFlat(menuListClone, flatMenuList)
  return flatMenuList
}

function makeMenuListFlat(
  menuList: Menu.MenuOptions[],
  flatMenuList: Menu.MenuOptions[],
) {
  menuList.forEach((item) => {
    if (item['children']) {
      const itemWithoutChildrenProp = JSON.parse(JSON.stringify(item))
      delete itemWithoutChildrenProp.children
      flatMenuList.push(itemWithoutChildrenProp)
      makeMenuListFlat(item.children, flatMenuList)
    } else {
      flatMenuList.push(item)
    }
  })
}

/**
 * @description 使用递归找出所有面包屑存
 */
export function getAllBreadcrumbList(
  menuList: Menu.MenuOptions[],
  parent = [],
  result: { [key: string]: any } = {},
) {
  for (const menu of menuList) {
    result[menu.path] = [...parent, menu]
    if (menu.children) {
      getAllBreadcrumbList(menu.children, result[menu.path], result)
    }
  }
  return result
}

/**
 * @description 获取当前时间对应的提示语
 * */
export function getTimeState() {
  const timeNow = new Date()
  const hours = timeNow.getHours()
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`
  if (hours >= 10 && hours <= 14) return `中午好 🌞`
  if (hours >= 14 && hours <= 18) return `下午好 🌞`
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`
}
