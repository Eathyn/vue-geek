import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'

// 需要安装 @types/node，否则 TS 会报错
import path from 'path'

// 需要使用 normalizePath，否则 Vue 会报错找不到该文件
const variablePath = normalizePath(path.resolve('./src/styles/variables.scss'))

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
})
