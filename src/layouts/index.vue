<template>
  <component :is="LayoutComponents[globalStore.layout]" />
  <ThemeDrawer />
</template>

<script setup lang="ts">
import { type Component } from 'vue'

import useGlobalStore from '@/store/module/global.ts'
import { LayoutType } from '@/store/interface'
import LayoutVertical from '@/layouts/layout-vertical/index.vue'
import LayoutClassic from '@/layouts/layout-classic/index.vue'
import LayoutTransverse from '@/layouts/layout-transverse/index.vue'
import LayoutColumns from '@/layouts/layout-columns/index.vue'
import ThemeDrawer from '@/layouts/components/theme-drawer/index.vue'

const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns,
}

const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
/* TODO: 为什么需要这个样式 */
.layout {
  min-width: 730px;
}
</style>
