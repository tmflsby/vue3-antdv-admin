import axios from 'axios'
import qs from 'qs'

const request = axios.create({})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加请求参数序列化
    config.paramsSerializer = {
      serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
