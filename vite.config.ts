import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'

// 需要安装 @types/node，否则 TS 会报错
import { resolve } from 'path'
// 按需引入 Element Plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 需要使用 normalizePath，否则 Vue 会报错找不到该文件
const variablePath = normalizePath(resolve('./src/styles/variables.scss'))

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
})
