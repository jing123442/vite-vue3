import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { ElMessage } from 'element-plus'

// import qs from qs

const service: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 30000, // 请求超时 30s
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]

})

// 前置拦截器（发起请求之前的拦截）
service .interceptors.request.use(
  (config: AxiosRequestConfig ) => {

    return config 
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
service .interceptors.response.use(
  (response: AxiosResponse) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    return response
  },
  (error: AxiosError) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default service 
