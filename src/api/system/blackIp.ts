/*
 * @Author: XDTEAM
 * @Date: 2025-03-26 21:04:52
 * @LastEditTime: 2025-03-29 21:02:24
 * @LastEditors: XDTEAM
 * @Description:
 */
import { http } from "@/utils/http";
import type { Result, ResultDetail } from "@/api/types";

/** 获取黑名单Ip列表 */
export const getIpList = (data?: object) => {
  return http.request<Result>("post", "/api/blackip/list", {
    data: data
  });
};

/** 黑名单Ip添加 */
export const createIp = (data?: object) => {
  return http.request<ResultDetail>("post", "/api/blackip/add", {
    data: data
  });
};

/** 删除黑名单Ip */
export const deleteIp = ipid => {
  const url = `/api/blackip/del/${ipid}`;
  return http.request<ResultDetail>("delete", url);
};

/** 更新黑名单Ip数据 */
export const UpdateIp = (ipid: number, data?: object | string) => {
  return http.request<ResultDetail>("put", `/api/blackip/update/${ipid}`, {
    data
  });
};
