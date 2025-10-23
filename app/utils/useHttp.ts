// utils/useHttp.ts
// Nuxt 4 优化版本 - 使用 useFetch

// 基础配置
const BASE_URL = 'http://onew-nest:9000/api/'
// const BASE_URL = 'http://127.0.0.1:9000/api/'
const TIMEOUT = 25000

// 定义请求选项类型
interface RequestOptions {
  params?: Record<string, any>
  body?: any
  headers?: Record<string, string>
  lazy?: boolean
  server?: boolean
  watch?: any[]
  immediate?: boolean
  key?: string
  [key: string]: any
}

// 创建请求函数
const createRequest = <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
) => {
  return (
    url: string,
    options?: RequestOptions
  ) => {
    const { params, body, headers, key, ...restOptions } = options || {}

    // 生成唯一的 key
    const cacheKey = key || `${method}-${url}-${JSON.stringify(params || body || {})}`

    // 使用 useFetch - Nuxt 4 推荐方式
    return useFetch<T>(url, {
      baseURL: BASE_URL,
      method: method as any,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      // GET 请求使用 query，其他请求使用 body
      ...(method === 'GET' ? { query: params } : { body }),
      key: cacheKey,
      // 请求拦截
      onRequest({ options }: any) {
        // 可以在这里添加 token 等
        return options
      },
      // 响应拦截
      onResponse({ response }: any) {
        return response
      },
      // 错误处理
      onResponseError({ response }: any) {
        // console.error('请求错误:', response.status, response._data)
      },
      // 传递其他选项
      ...restOptions,
    } as any)
  }
}

// 封装的 HTTP 方法
export const useHttp = {
  /**
   * GET 请求
   * @param url 请求地址
   * @param options 请求配置
   */
  get: <T = any>(url: string, options?: RequestOptions) => {
    return createRequest<T>('GET')(url, options)
  },

  /**
   * POST 请求
   * @param url 请求地址
   * @param body 请求数据
   * @param options 请求配置
   */
  post: <T = any>(url: string, body?: any, options?: RequestOptions) => {
    return createRequest<T>('POST')(url, { ...options, body })
  },

  /**
   * PUT 请求
   * @param url 请求地址
   * @param body 请求数据
   * @param options 请求配置
   */
  put: <T = any>(url: string, body?: any, options?: RequestOptions) => {
    return createRequest<T>('PUT')(url, { ...options, body })
  },

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param options 请求配置
   */
  delete: <T = any>(url: string, options?: RequestOptions) => {
    return createRequest<T>('DELETE')(url, options)
  },
}

export default useHttp

