export const formatQueryUrl = (query: any) => {
  const queryParts = [];
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      const value = query[key];
      // 检查 value 是否为空字符串
      if (value !== "" && value !== undefined && value !== null) {
        queryParts.push(
          encodeURIComponent(key) + "=" + encodeURIComponent(value)
        );
      }
    }
  }
  if (queryParts.join("&")) {
    return "?" + queryParts.join("&");
  } else {
    return "";
  }
};

export const imgBaseURL = (url:string)=>{
  return `https://static.onew.design/${url}`
}

// 导出 SSR 友好的 HTTP 请求工具
export { useHttp } from './useHttp'