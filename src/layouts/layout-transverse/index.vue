<!-- 横向布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="logo flx-center">
        <img
          class="logo-img"
          src="@/assets/images/logo.svg"
          alt="logo"
        />
        <span class="logo-text">Geek Admin</span>
      </div>
      <el-menu
        mode="horizontal"
        :default-active="activeMenu"
        :router="false"
        :unique-opened="true"
      >
        <!-- 不能直接使用 SubMenu 组件，无法触发 el-menu 隐藏省略功能 -->
        <template
          v-for="subItem in authStore.showMenuListGet"
          :key="subItem.path"
        >
          <el-sub-menu
            v-if="subItem.children?.length"
            :key="subItem.path"
            :index="subItem.path + 'el-sub-menu'"
          >
            <template #title>
              <el-icon>
                <component :is="subItem.meta.icon" />
              </el-icon>
              <span>{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menu-list="subItem.children" />
          </el-sub-menu>
          <el-menu-item
            v-else
            :key="subItem.path + 'el-menu-item'"
            :index="subItem.path"
            @click="handleClickMenu(subItem)"
          >
            <el-icon>
              <component :is="subItem.meta.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ subItem.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
      <ToolBarRight />
    </el-header>
    <div>main</div>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAuthStore from '@/store/module/auth.ts'
import { Menu } from '@/typings/global'
import SubMenu from '@/components/Menu/SubMenu.vue'
import ToolBarRight from '@/layouts/components/header/ToolBarRight.vue'

defineOptions({
  name: 'LayoutTransverse',
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const activeMenu = computed(() =>
  route.meta.activeMenu ? route.meta.activeMenu : route.path,
)

function handleClickMenu(subItem: Menu.MenuOptions) {
  if (subItem.meta.isLink) {
    return window.open(subItem.meta.isLink, '_blank')
  }
  router.push(subItem.path)
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
