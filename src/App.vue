<template>
  <el-config-provider
    :locale="locale"
    :size="assemblySize"
    :button="buttonConfig"
  >
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

import useGlobalStore from '@/store/module/global.ts'
import { getBrowserLang } from '@/utils'
import { useTheme } from '@/hooks/useTheme.ts'

const globalStore = useGlobalStore()

const { initTheme } = useTheme()
initTheme()

const locale = computed(() => {
  // 先从状态管理中获取语言，如果没有则根据用户设置的浏览器语言
  if (globalStore.language === 'zh') {
    return zhCn
  }
  if (globalStore.language === 'en') {
    return en
  }
  return getBrowserLang() === 'zh' ? zhCn : en
})

const assemblySize = computed(() => globalStore.assemblySize)

const buttonConfig = reactive({ autoInsertSpace: false })
</script>
