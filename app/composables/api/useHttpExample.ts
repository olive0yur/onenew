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
  // useHttp.get 返回 useAsyncData 的结果
  // 包含: data, pending, error, refresh 等响应式属性
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

/**
 * 示例：在 Vue 组件中使用
 * 
 * <script setup lang="ts">
 * // 在组件中直接调用
 * const { data, pending, error, refresh } = await useDictList({ type: 'all' })
 * 
 * // 访问数据
 * console.log(data.value) // 响应式数据
 * console.log(pending.value) // 加载状态
 * console.log(error.value) // 错误信息
 * 
 * // 刷新数据
 * const handleRefresh = () => {
 *   refresh()
 * }
 * </script>
 */

