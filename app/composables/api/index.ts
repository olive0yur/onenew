import $http from "~/utils/axios";
import { formatQueryUrl } from "~/utils";
interface Response {
  code: number;
  data: any;
}

/** 获取字典列表 **/
export const getDictList = async (data?: object) => {
  const url = formatQueryUrl(data);
  try {
    return await $http.get<Response>("dict/list" + url);
  } catch (e) {
    return e;
  }
};
