import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { ResultEnum } from '@/enums/http-enum.ts'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from '@/config/service-loading.ts'
import useUserStore from '@/store/module/user.ts'
import { LOGIN_URL } from '@/config'
import { checkStatus } from '@/api/helper/check-status.ts'
import { ResultData } from '@/api/interface'

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean
}

const requestConfig: AxiosRequestConfig = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    // 请求拦截
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        if (!config.noLoading) {
          showFullScreenLoading()
        }
        if (config.headers && typeof config.headers.set === 'function') {
          const userStore = useUserStore()
          config.headers.set('x-access-token', userStore.token)
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )

    // 响应拦截
    this.service.interceptors.response.use(
      async (response: AxiosResponse) => {
        const { data } = response
        tryHideFullScreenLoading()
        // 登录失效
        if (data.code === ResultEnum.OVERDUE) {
          const useStore = useUserStore()
          useStore.setToken('')
          const router = useRouter()
          await router.replace(LOGIN_URL)
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        // 请求成功
        return data
      },
      async (error: AxiosError) => {
        const { response } = error
        tryHideFullScreenLoading()
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.includes('timeout')) {
          ElMessage.error('请求超时！请您稍后重试')
        }
        if (error.message.includes('Network Error')) {
          ElMessage.error('网络错误！请您稍后重试')
        }
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) {
          checkStatus(response.status)
        }
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) {
          const router = useRouter()
          await router.replace('/500')
        }
        return Promise.reject(error)
      },
    )
  }

  /* 封装常用的请求方法 */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(
    url: string,
    params?: object | string,
    _object = {},
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
}

export default new RequestHttp(requestConfig)
