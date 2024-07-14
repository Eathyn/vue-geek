import { Recordable } from '../src/typings/global'

/**
 * @description 改变数据类型
 * */
export function wrapperEnv(envConfig: Recordable) {
  const env: Record<string, any> = {}
  for (const envKey of Object.keys(envConfig)) {
    // Vite 的 `loadEnv` 函数会将 `\n` 转为 `\\n`，所以需要把它重新转回来，例如：'hello\\nworld' -> 'hello\nworld'
    let envVal = envConfig[envKey].replace(/\\n/g, '\n')
    // boolean
    if (envVal === 'true') {
      envVal = true
    }
    if (envVal === 'false') {
      envVal = false
    }
    // VITE_PORT
    if (envKey === 'VITE_PORT') {
      envVal = Number(envVal)
    }
    // VITE_PROXY
    if (envKey === 'VITE_PROXY') {
      try {
        envVal = JSON.parse(envVal)
      } catch (error) {}
    }
    env[envKey] = envVal
  }
  return env
}
