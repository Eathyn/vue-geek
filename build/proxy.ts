import { ProxyOptions } from 'vite'

type ProxyList = ProxyItem[]
type ProxyItem = [string, string]
type ProxyTargetList = Record<string, ProxyOptions>

/**
 * @description 创建代理
 * */
export function createProxy(proxyList: ProxyList) {
  const proxy: ProxyTargetList = {}
  for (const [prefix, target] of proxyList) {
    const httpsRE = /^https:\/\//
    const isHttps = httpsRE.test(target)
    proxy[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return proxy
}
