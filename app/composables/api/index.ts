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

/** 获取图片组 **/
export const getImageGroup = async (data?: object) => {
  const url = formatQueryUrl(data);
  try {
    return await $http.get<Response>("dict/img-group" + url);
  } catch (e) {
    return e;
  }
};

/** 收集访问信息 **/
export const useWebCount = async (data?: object) => {
  const url = formatQueryUrl(data);
  try {
    return await $http.post<Response>("web-collection/record" + url, data);
  } catch (e) {
    return e;
  }
};

/** 获取公司信息 **/
export const useGetCompanyInfo = async (data?: object) => {
  const url = formatQueryUrl(data);
  try {
    return await $http.get<Response>("dict/company" + url);
  } catch (e) {
    return e;
  }
};