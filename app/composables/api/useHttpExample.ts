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

//获取图片组
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

//收集访问信息
export const useWebCount = async (params?: object) => {
  // 获取真实 IP 地址
  let clientIp = '';
  let deviceType = 'pc'
  
  // 只在服务端执行
  if (process.server) {
    const event = useRequestEvent();
    if (event) {
      const headers = event.node.req.headers;
      
      // 获取真实 IP
      clientIp = 
        (headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        (headers['x-real-ip'] as string) ||
        (headers['cf-connecting-ip'] as string) ||
        event.node.req.socket.remoteAddress ||
        '';
      
      if (clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
        clientIp = '127.0.0.1';
      }
      
      // 检测设备类型
      const userAgent = (headers['user-agent'] || '').toLowerCase();
      const mobileKeywords = [
        'mobile', 'android', 'iphone', 'ipad', 'ipod', 
        'blackberry', 'windows phone', 'webos', 'opera mini'
      ];
      
      deviceType = mobileKeywords.some(keyword => userAgent.includes(keyword)) 
        ? 'mobile' 
        : 'pc';
    }
  }
  
  // 将 IP 地址和设备类型添加到请求体中
  const { data, pending, error, refresh } = await useHttp.post<Response>(
    "web-collection/record",
    {
      clientIp,
      type: deviceType,
      ...params,
    },
    {
      server: true,
    }
  );
  
  return {
    data,
    pending,  
    error,
    refresh,
  };
};

//获取公司信息
export const useGetCompanyInfo = async (params?: object) => {
  const { data, pending, error, refresh } = await useHttp.get<Response>(
    "dict/company",
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
