<template>
  <div class="theme-setting">
    <i
      :class="'iconfont icon-zhuti'"
      class="toolBar-icon"
      @click="openDrawer"
    />
  </div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus.ts'

function openDrawer() {
  mittBus.emit('openThemeDrawer')
}
</script>
