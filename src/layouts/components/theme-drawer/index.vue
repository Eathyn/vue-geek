<template>
  <el-drawer
    v-model="drawerVisible"
    title="布局设置"
    size="300px"
  >
    <!-- 布局切换 -->
    <el-divider
      class="divider"
      content-position="center"
    >
      <el-icon>
        <Notification />
      </el-icon>
      布局切换
    </el-divider>
    <div class="layout-box mb30">
      <el-tooltip
        effect="dark"
        content="纵向"
        placement="top"
        :show-after="200"
      >
        <div
          :class="[
            'layout-item layout-vertical',
            { 'is-active': globalStore.layout === 'vertical' },
          ]"
          @click="setLayout('vertical')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="globalStore.layout === 'vertical'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="经典"
        placement="top"
        :show-after="200"
      >
        <div
          :class="[
            'layout-item layout-classic',
            { 'is-active': globalStore.layout === 'classic' },
          ]"
          @click="setLayout('classic')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="globalStore.layout === 'classic'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="横向"
        placement="top"
        :show-after="200"
      >
        <div
          :class="[
            'layout-item layout-transverse',
            { 'is-active': globalStore.layout === 'transverse' },
          ]"
          @click="setLayout('transverse')"
        >
          <div class="layout-dark"></div>
          <div class="layout-content"></div>
          <el-icon v-if="globalStore.layout === 'transverse'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="分栏"
        placement="top"
        :show-after="200"
      >
        <div
          :class="[
            'layout-item layout-columns',
            { 'is-active': globalStore.layout === 'columns' },
          ]"
          @click="setLayout('columns')"
        >
          <div class="layout-dark"></div>
          <div class="layout-light"></div>
          <div class="layout-content"></div>
          <el-icon v-if="globalStore.layout === 'columns'">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Notification, CircleCheckFilled } from '@element-plus/icons-vue'
import mittBus from '@/utils/mittBus.ts'
import useGlobalStore from '@/store/module/global.ts'
import { LayoutType } from '@/store/interface'
import { useTheme } from '@/hooks/useTheme.ts'

defineOptions({
  name: 'ThemeDrawer',
})

const drawerVisible = ref(false)
mittBus.on('openThemeDrawer', () => (drawerVisible.value = true))
const globalStore = useGlobalStore()
const theme = useTheme()

function setLayout(layoutType: LayoutType) {
  globalStore.layout = layoutType
  theme.setAsideTheme()
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
