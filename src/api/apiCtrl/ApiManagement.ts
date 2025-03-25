/*
 * @Author: XDTEAM
 * @Date: 2025-03-22 22:51:49
 * @LastEditTime: 2025-03-25 23:14:23
 * @LastEditors: XDTEAM
 * @Description:
 */
import { http } from "@/utils/http";
import type { ResultDetail } from "@/api/types";

type Result = {
  success: boolean;
  code: number;
  message: string;
  data: {
    roles_id?: [];
    user_role?: [];
  };
};

/** 获取api列表 */
export const getApiRoutes = (data?: object | string) => {
  return http.request<ResultDetail>("post", "/api/apiInfo/getApiRoutes", {
    data
  });
};

/** 更新api数据 */
export const UpdateApi = (funcName: string, data?: object | string) => {
  return http.request<Result>("put", `/api/apiInfo/update/${funcName}`, {
    data
  });
};

/** 同步API数据到数据库 */
export const DataSyncApi = () => {
  return http.request<Result>("get", `/api/apiInfo/action/DataSync`);
};
