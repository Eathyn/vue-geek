import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import useGlobalStore from '@/store/module/global.ts'
import { GlobalState } from '@/store/interface'
import { DEFAULT_PRIMARY } from '@/config'
import { getDarkColor, getLightColor } from '@/utils/colors.ts'
import { asideTheme, AsideThemeType } from '@/styles/theme/aside.ts'

export const useTheme = defineStore('theme', () => {
  const globalStore = useGlobalStore()

  function initTheme() {
    switchDark()
  }

  /**
   * @description 切换黑暗模式 ==> 并修改主题颜色、侧边栏颜色
   * */
  function switchDark() {
    const html = document.documentElement as HTMLHtmlElement
    if (globalStore.isDark) {
      html.setAttribute('class', 'dark')
    } else {
      html.setAttribute('class', '')
    }
    changePrimary(globalStore.primary)
    setAsideTheme()
  }

  /**
   * @description 修改主题颜色
   * */
  function changePrimary(primary: GlobalState['primary']) {
    if (!primary) {
      globalStore.primary = DEFAULT_PRIMARY
      ElMessage({
        type: 'success',
        message: `主题颜色已重置为 ${DEFAULT_PRIMARY}`,
      })
    }
    // 设置基本的主题颜色
    document.documentElement.style.setProperty('--el-color-primary', primary)
    // 设置暗色主题的次级颜色，`--el-color-primary-dark-2` 表示在暗色模式下稍微暗一些的主颜色
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      globalStore.isDark
        ? `${getLightColor(primary, 0.2)}` // 如果是暗色主题，则将主题色变亮
        : `${getDarkColor(primary, 0.3)}`, // 如果不是暗色主题，则将主题色变暗
    )
    for (let i = 1; i <= 9; i++) {
      const primaryColor = globalStore.isDark
        ? `${getDarkColor(primary, i / 10)}`
        : `${getLightColor(primary, i / 10)}`
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        primaryColor,
      )
    }
    globalStore.primary = primary
  }

  // 设置侧边栏样式 ==> light、inverted、dark
  function setAsideTheme() {
    let type: AsideThemeType = 'light'
    // 反转色在 vertical、classic 布局模式生效
    // 反转色在 transverse 布局默认生效
    if (
      (['vertical', 'classic'].includes(globalStore.layout) &&
        globalStore.asideInverted) ||
      globalStore.layout === 'transverse'
    ) {
      type = 'inverted'
    }
    // 如果暗黑模式，则侧边栏为暗色类型
    if (globalStore.isDark) {
      type = 'dark'
    }
    const theme = asideTheme[type]
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value)
    }
  }

  return {
    initTheme,
    setAsideTheme,
    switchDark,
  }
})
