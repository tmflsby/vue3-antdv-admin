/**
 * fetch API 通用请求封装
 * 支持请求拦截器、响应拦截器、请求取消等功能
 */

// 存储请求控制器的Map
const pendingRequests = new Map()

/**
 * 生成请求的唯一标识
 * @param {string} url - 请求URL
 * @param {Object} options - 请求选项
 * @returns {string} 请求标识
 */
const generateRequestKey = (url, options) => {
  const { method = 'GET', body, params } = options || {}
  return [method, url, params ? JSON.stringify(params) : '', body ? JSON.stringify(body) : ''].join(
    '&',
  )
}

/**
 * 基础配置
 */
const defaultConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
}

/**
 * 取消指定的请求
 * @param {string} requestKey - 请求标识
 */
export const cancelRequest = (requestKey) => {
  if (pendingRequests.has(requestKey)) {
    const controller = pendingRequests.get(requestKey)
    controller.abort()
    pendingRequests.delete(requestKey)
    console.log(`请求已取消: ${requestKey}`)
    return true
  }
  return false
}

/**
 * 取消所有待处理的请求
 */
export const cancelAllRequests = () => {
  pendingRequests.forEach((controller, requestKey) => {
    controller.abort()
    console.log(`请求已取消: ${requestKey}`)
  })
  pendingRequests.clear()
}

/**
 * 处理请求URL和参数
 * @param {string} url - 相对或绝对URL
 * @param {Object} params - URL参数
 * @param {string} baseURL - 基础URL
 * @returns {string} 处理后的URL
 */
const buildUrl = (url, params, baseURL) => {
  // 如果是绝对URL，则直接使用
  if (url.startsWith('http://') || url.startsWith('https://')) {
    baseURL = ''
  }

  let fullUrl = `${baseURL}${url}`

  // 处理URL参数
  if (params && typeof params === 'object') {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value)
      }
    })

    const queryString = searchParams.toString()
    if (queryString) {
      const separator = fullUrl.includes('?') ? '&' : '?'
      fullUrl = `${fullUrl}${separator}${queryString}`
    }
  }

  return fullUrl
}

/**
 * 默认请求拦截器 - 内部实现
 * @param {Object} options - 请求选项
 * @returns {Object} 处理后的请求选项
 */
const defaultRequestInterceptor = (options) => {
  // 从localStorage或其他存储中获取token
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  // 如果有token，添加到请求头
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  // 添加时间戳防止缓存
  // options.headers['Cache-Control'] = 'no-cache';
  // options.headers['Pragma'] = 'no-cache';

  return options
}

/**
 * 默认响应拦截器 - 内部实现
 * @param {Response} response - 响应对象
 * @returns {Promise} 处理后的响应
 */
const defaultResponseInterceptor = async (response) => {
  // 可以在这里对响应进行统一处理
  // 例如：记录响应日志、统一处理响应头等

  return response
}

/**
 * 通用fetch请求方法
 * @param {string} url - 请求URL
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
const fetchRequest = async (url, options = {}) => {
  // 合并默认配置和用户配置
  const config = { ...defaultConfig, ...options }

  // 提取配置项
  const {
    baseURL,
    timeout,
    headers: customHeaders,
    params,
    body,
    method = 'GET',
    ...restOptions
  } = config

  // 创建AbortController用于取消请求
  const controller = new AbortController()
  const signal = controller.signal

  // 构建完整URL
  const fullUrl = buildUrl(url, params, baseURL)

  // 合并请求头
  const headers = {
    ...defaultConfig.headers,
    ...customHeaders,
  }

  // 处理请求体
  let requestBody = body
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    requestBody = JSON.stringify(body)
  }

  // 准备请求选项
  let requestOptions = {
    method,
    headers,
    signal,
    ...restOptions,
  }

  // GET、HEAD请求不应该有body
  if (method !== 'GET' && method !== 'HEAD' && requestBody !== undefined) {
    requestOptions.body = requestBody
  }

  // 执行默认请求拦截器
  requestOptions = defaultRequestInterceptor(requestOptions)

  // 生成请求标识并存储控制器
  const requestKey = generateRequestKey(fullUrl, requestOptions)

  // 如果有相同的请求正在进行中，则取消之前的请求
  if (pendingRequests.has(requestKey)) {
    cancelRequest(requestKey)
  }

  pendingRequests.set(requestKey, controller)

  try {
    // 设置超时处理
    const timeoutPromise = new Promise((_, reject) => {
      const timer = setTimeout(() => {
        controller.abort()
        pendingRequests.delete(requestKey)
        reject(new Error(`请求超时: ${fullUrl}`))
      }, timeout)

      // 清理定时器
      signal.addEventListener('abort', () => clearTimeout(timer))
    })

    // 使用Promise.race处理请求超时
    const response = await Promise.race([fetch(fullUrl, requestOptions), timeoutPromise])

    // 从待处理列表中移除
    pendingRequests.delete(requestKey)

    // 检查响应是否成功
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`)
      error.status = response.status
      error.response = response
      throw error
    }

    // 执行默认响应拦截器
    const processedResponse = await defaultResponseInterceptor(response)

    // 尝试解析JSON响应
    try {
      return await processedResponse.json()
    } catch (_e) {
      console.error('响应不是JSON格式', _e)
      // 如果不是JSON格式，则返回响应对象
      return processedResponse
    }
  } catch (error) {
    // 从待处理列表中移除
    pendingRequests.delete(requestKey)

    // 处理取消请求的错误
    if (error.name === 'AbortError') {
      throw new Error('请求已被取消')
    }

    throw error
  }
}

/**
 * GET请求方法
 * @param {string} url - 请求URL
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
fetchRequest.get = (url, options = {}) => {
  return fetchRequest(url, { ...options, method: 'GET' })
}

/**
 * POST请求方法
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
fetchRequest.post = (url, data, options = {}) => {
  return fetchRequest(url, { ...options, method: 'POST', body: data })
}

/**
 * PUT请求方法
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
fetchRequest.put = (url, data, options = {}) => {
  return fetchRequest(url, { ...options, method: 'PUT', body: data })
}

/**
 * DELETE请求方法
 * @param {string} url - 请求URL
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
fetchRequest.delete = (url, options = {}) => {
  return fetchRequest(url, { ...options, method: 'DELETE' })
}

/**
 * PATCH请求方法
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @returns {Promise} 请求结果
 */
fetchRequest.patch = (url, data, options = {}) => {
  return fetchRequest(url, { ...options, method: 'PATCH', body: data })
}

// 只导出主要方法
export default fetchRequest
