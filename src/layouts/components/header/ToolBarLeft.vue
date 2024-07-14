<template>
  <div class="tool-bar-lf">
    <CollapseIcon id="collapseIcon" />
    <Breadcrumb
      v-if="globalStore.isBreadcrumb"
      id="breadcrumb"
    />
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from '@/layouts/components/header/components/CollapseIcon.vue'
import Breadcrumb from '@/layouts/components/header/components/Breadcrumb.vue'
import useGlobalStore from '@/store/module/global.ts'

const globalStore = useGlobalStore()
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
