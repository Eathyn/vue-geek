<template>
  <el-icon
    class="collapse-icon"
    @click="changeCollapse"
  >
    <component :is="globalStore.isCollapse ? Expand : Fold" />
  </el-icon>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'

import useGlobalStore from '@/store/module/global.ts'

const globalStore = useGlobalStore()

function changeCollapse() {
  globalStore.isCollapse = !globalStore.isCollapse
}
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  cursor: pointer;
}
</style>
