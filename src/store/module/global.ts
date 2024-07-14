import { defineStore } from 'pinia'
import { ref } from 'vue'

import { DEFAULT_PRIMARY } from '@/config/index.ts'
import piniaPersistConfig from '@/config/pinia-persist.ts'
import { GlobalState, LayoutType } from '@/store/interface'

const useGlobalStore = defineStore(
  'global',
  () => {
    // 系统语言
    const language = ref<GlobalState['language']>(null)
    // 主题色
    const primary = ref<GlobalState['primary']>(DEFAULT_PRIMARY)
    const assemblySize = ref<GlobalState['assemblySize']>('default')
    // 布局模式
    const layout = ref<LayoutType>('vertical')
    // 侧边栏反转
    const asideInverted = ref<boolean>(false)
    // 是否为深色模式
    const isDark = ref<GlobalState['isDark']>(false)
    // 侧边栏是否缩放
    const isCollapse = ref<boolean>(false)
    // 是否显示面包屑导航
    const isBreadcrumb = ref<boolean>(true)
    // 是否显示面包屑导航图标
    const isBreadcrumbIcon = ref<boolean>(true)

    return {
      language,
      primary,
      assemblySize,
      layout,
      asideInverted,
      isDark,
      isCollapse,
      isBreadcrumb,
      isBreadcrumbIcon,
    }
  },
  {
    persist: piniaPersistConfig('global'),
  },
)

export default useGlobalStore
