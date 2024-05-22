import { ElLoading } from 'element-plus'

let loadingInstance: ReturnType<typeof ElLoading.service>
let needLoadingRequestCount = 0

/**
 * @description 开始 Loading
 * */
function startLoading() {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

/**
 * @description 结束 Loading
 * */
function endLoading() {
  loadingInstance.close()
}

/**
 * @description 显示全屏加载
 * */
export function showFullScreenLoading() {
  // 当前没有 Loading 才调用
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

/**
 * @description 隐藏全屏加载
 * */
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) {
    return
  }
  needLoadingRequestCount--
  // 当前没有 Loading 才调用
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
