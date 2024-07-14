<template>
  <div :class="['breadcrumb-box', !globalStore.isBreadcrumbIcon && 'no-icon']">
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <div
            class="el-breadcrumb__inner is-link"
            @click="onBreadcrumbClick(item, index)"
          >
            <el-icon
              class="breadcrumb-icon"
              v-show="item.meta.icon && globalStore.isBreadcrumbIcon"
            >
              <component :is="item.meta.icon" />
            </el-icon>
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import useGlobalStore from '@/store/module/global.ts'
import useAuthStore from '@/store/module/auth.ts'
import { Menu } from '@/typings/global'

const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()
const authStore = useAuthStore()

const breadcrumbList = computed(() => {
  return (
    authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ??
    []
  )
})

function onBreadcrumbClick(item: Menu.MenuOptions, index: number) {
  if (index !== breadcrumbList.value.length - 1) {
    router.push(item.path)
  }
}
</script>

<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  align-items: center;
  padding-right: 50px;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    #000000 0%,
    #000000 calc(100% - 50px),
    transparent
  );
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .el-breadcrumb__inner {
        display: inline-flex;
        .breadcrumb-icon {
          margin-top: 2px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 3px;
        }
      }
      :deep(.el-breadcrumb__separator) {
        position: relative;
        top: -1px;
      }
    }
  }
}
.no-icon {
  .el-breadcrumb {
    .el-breadcrumb__item {
      top: -2px;
      :deep(.el-breadcrumb__separator) {
        top: 2px;
      }
    }
  }
}
</style>
