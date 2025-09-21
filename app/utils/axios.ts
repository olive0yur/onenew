// plugins/axios.ts
import axios, { type AxiosRequestConfig } from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: "http://127.0.0.1:9000/api/",
  //   baseURL: "/api/",
  timeout: 25000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

// 封装请求方法
export const http = {
  get<T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.get(url, { params, ...config });
  },

  post<T = any>(
    url: string,
    data?: object | string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, { ...config });
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, { ...config });
  },

  delete<T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.delete(url, { params, ...config });
  },
};

export default http;
