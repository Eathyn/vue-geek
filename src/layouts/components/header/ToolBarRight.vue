<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <ThemeSetting />
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSetting from '@/layouts/components/header/components/ThemeSetting.vue'

defineOptions({
  name: 'ToolBarRight',
})
</script>

<style scoped lang="scss"></style>
