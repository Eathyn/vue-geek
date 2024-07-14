<!-- 经典布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="header-lf">
        <div class="logo flx-center">
          <img
            class="logo-img"
            src="@/assets/images/logo.svg"
            alt="logo"
          />
          <span class="logo-text">Geek Admin</span>
        </div>
        <ToolBarLeft />
      </div>
      <div class="header-ri">
        <ToolBarRight />
      </div>
    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <div
          class="aside-box"
          :style="{ width: globalStore.isCollapse ? '65px' : '210px' }"
        >
          <el-scrollbar>
            <el-menu
              :default-active="activeMenu"
              :router="false"
              :collapse="globalStore.isCollapse"
              :collapse-transition="false"
              :unique-opened="true"
            >
              <SubMenu :menu-list="authStore.showMenuListGet" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="classic-main">
        <div>main</div>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useGlobalStore from '@/store/module/global.ts'
import useAuthStore from '@/store/module/auth.ts'
import ToolBarLeft from '@/layouts/components/header/ToolBarLeft.vue'
import ToolBarRight from '@/layouts/components/header/ToolBarRight.vue'
import SubMenu from '@/components/Menu/SubMenu.vue'

defineOptions({
  name: 'LayoutClassic',
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
