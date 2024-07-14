import {
  ConfigEnv,
  UserConfig,
  defineConfig,
  normalizePath,
  loadEnv,
} from 'vite'
import vue from '@vitejs/plugin-vue'
// 需要安装 @types/node，否则 TS 会报错
import { resolve } from 'path'
// 按需引入 Element Plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { wrapperEnv } from './build/getEnv.ts'
import { createProxy } from './build/proxy.ts'

// 需要使用 normalizePath，否则 Vue 会报错找不到该文件
const variablePath = normalizePath(resolve('./src/styles/variables.scss'))

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  // `loadEnv` 会将 `\n` 转为 `\\n`，例如：'hello\nworld' -> 'hello\\nworld'
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  return {
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
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
  }
})
