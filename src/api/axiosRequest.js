import axios from 'axios'

const axiosRequest = axios.create({
  // 基础URL配置
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  // 请求超时时间
  timeout: 15000,
  // 请求头配置
  headers: {
    'Content-Type': 'application/json',
  },
})

// 存储取消请求控制器的Map
const pendingRequests = new Map()

/**
 * 生成请求的唯一标识
 * @param {Object} config - 请求配置对象
 * @returns {string} 请求标识
 */
const generateRequestKey = (config) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 添加请求到待处理列表
 * @param {Object} config - 请求配置对象
 */
const addPendingRequest = (config) => {
  const requestKey = generateRequestKey(config)
  // 如果有相同的请求正在进行中，则取消之前的请求
  if (pendingRequests.has(requestKey)) {
    cancelRequest(requestKey)
  }
  // 创建取消控制器
  const controller = new AbortController()
  config.signal = controller.signal
  pendingRequests.set(requestKey, {
    controller,
    config,
  })
  // 将请求标识添加到配置中，方便后续操作
  config.requestKey = requestKey
}

/**
 * 从待处理列表中移除请求
 * @param {Object} config - 请求配置对象
 */
const removePendingRequest = (config) => {
  const requestKey = config.requestKey || generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}

/**
 * 取消指定的请求
 * @param {string} requestKey - 请求标识
 */
export const cancelRequest = (requestKey) => {
  if (pendingRequests.has(requestKey)) {
    const { controller } = pendingRequests.get(requestKey)
    controller.abort()
    pendingRequests.delete(requestKey)
    console.log(`请求已取消: ${requestKey}`)
  }
}

/**
 * 取消所有待处理的请求
 */
export const cancelAllRequests = () => {
  pendingRequests.forEach(({ controller, _config }, requestKey) => {
    controller.abort()
    console.log(`请求已取消: ${requestKey}`)
  })
  pendingRequests.clear()
}

// 请求拦截器
axiosRequest.interceptors.request.use(
  (config) => {
    // 从localStorage或其他存储中获取token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    // 如果有token，添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加请求到待处理列表
    addPendingRequest(config)

    // 可以在这里添加其他通用配置
    // 例如：添加时间戳防止缓存
    // config.params = { ...config.params, _t: Date.now() }

    return config
  },
  (error) => {
    // 处理请求错误
    console.error('请求错误:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosRequest.interceptors.response.use(
  (response) => {
    // 从待处理列表中移除请求
    removePendingRequest(response.config)

    // 可以根据后端约定的数据格式进行统一处理
    // 例如，如果后端返回{ code: 200, data: {}, message: '' }格式
    const { data } = response

    // 根据实际业务需求处理响应数据
    return data
  },
  (error) => {
    // 如果是取消请求的错误，不进行错误处理
    if (axios.isCancel(error)) {
      console.log('请求已被用户取消')
      return Promise.reject(error)
    }

    // 从待处理列表中移除请求
    if (error.config) {
      removePendingRequest(error.config)
    }

    // 处理响应错误
    const { response } = error

    // 根据错误状态码进行不同处理
    if (response) {
      switch (response.status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          // window.location.href = '/login'
          console.error('未授权，请重新登录')
          break
        case 403:
          console.error('拒绝访问')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error(`请求失败: ${response.status} ${response.statusText}`)
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误，请检查您的网络连接')
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message)
    }

    return Promise.reject(error)
  },
)

export default axiosRequest
