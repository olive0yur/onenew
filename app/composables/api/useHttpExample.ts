// composables/api/useHttpExample.ts
// 使用示例：展示如何使用 useHttp 进行 SSR 友好的数据请求

import { useHttp } from "~/utils";

interface Response {
  code: number;
  data: any;
}

/**
 * 示例：使用 GET 请求获取字典列表
 * 这个方法支持服务端渲染（SSR）
 */
export const useDictList = async (params?: object) => {
  const { data, pending, error, refresh } = await useHttp.get<Response>(
    "dict/list",
    {
      params, // GET 请求参数
      // 可选配置
      lazy: false, // 是否懒加载
      server: true, // 是否在服务端执行
      watch: [], // 监听的响应式数据
    }
  );

  return {
    data,
    pending,
    error,
    refresh,
  };
};

export const useGetGroupImage = async (params?: object) => {
  const { data, pending, error, refresh } = await useHttp.get<Response>(
    "dict/img-group",
    {
      params, // GET 请求参数
      // 可选配置
      lazy: false, // 是否懒加载
      server: true, // 是否在服务端执行
      watch: [], // 监听的响应式数据
    }
  );

  return {
    data,
    pending,
    error,
    refresh,
  };
};

export const useWebCount = async (params?: object) => {
  const { data, pending, error, refresh } = await useHttp.post<Response>(
    "web-collection/record"
  );
  return {
    data,
    pending,  
    error,
    refresh,
  };
};

/**
 * 示例：使用 POST 请求提交数据
 */
export const useCreateItem = async (formData: object) => {
  const { data, pending, error } = await useHttp.post<Response>(
    "items/create",
    formData, // POST 请求体
    {
      // 可选配置
      immediate: true, // 是否立即执行
    }
  );

  return {
    data,
    pending,
    error,
  };
};
