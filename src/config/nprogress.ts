import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载中的图标
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最下百分比
})

export default NProgress
