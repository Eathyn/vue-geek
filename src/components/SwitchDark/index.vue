<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'

import useGlobalStore from '@/store/module/global.ts'
import { useTheme } from '@/hooks/useTheme.ts'

defineOptions({
  name: 'SwitchDark',
})

const globalStore = useGlobalStore()
const themeStore = useTheme()
</script>

<template>
  <el-switch
    v-model="globalStore.isDark"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="themeStore.switchDark"
  />
</template>
