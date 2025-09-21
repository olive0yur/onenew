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
