<!-- 纵向布局 -->
<template>
  <el-container class="layout">
    <el-aside width="auto">
      <div
        class="aside-box"
        :style="{ width: globalStore.isCollapse ? '65px' : '210px' }"
      >
        <div class="logo flx-center">
          <img
            src="@/assets/images/logo.svg"
            alt="logo"
            class="logo-img"
          />
          <span
            v-show="!globalStore.isCollapse"
            class="logo-text"
          >
            Geek Admin
          </span>
        </div>
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :collapse="globalStore.isCollapse"
            :router="false"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="authStore.showMenuListGet" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import useGlobalStore from '@/store/module/global.ts'
import useAuthStore from '@/store/module/auth.ts'
import SubMenu from '@/components/Menu/SubMenu.vue'
import ToolBarLeft from '@/layouts/components/header/ToolBarLeft.vue'
import ToolBarRight from '@/layouts/components/header/ToolBarRight.vue'

defineOptions({
  name: 'LayoutVertical',
})

const route = useRoute()
const globalStore = useGlobalStore()
const authStore = useAuthStore()
const activeMenu = computed(() =>
  route.meta.activeMenu ? route.meta.activeMenu : route.path,
)
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
