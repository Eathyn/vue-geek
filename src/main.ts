import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/store'
import '@/styles/reset.scss'
import '@/styles/common.scss'
// TODO 将 iconfont 方案换为 svg 方案
// iconfont css
import '@/assets/iconfont/iconfont.scss'
// element-plus 图标
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)
// 将 element-plus 全部图标注册为全局组件
// TODO: 注册全部图标耗费性能，应该在 `SubMenu` 文件中遍历所有侧边栏，然后按需引入需要的组件
for (let key in Icons) {
  app.component(key, Icons[key as keyof typeof Icons])
}
app.use(router).use(pinia)
app.mount('#app')
