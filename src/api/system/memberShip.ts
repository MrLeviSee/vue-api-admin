import { http } from "@/utils/http";

type Result_table = {
  success: boolean;
  data?: {
    /** 列表数据 */
    results: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    size?: number;
    /** 当前页数 */
    page?: number;
  };
};

type Result = {
  success: boolean;
  code: number;
  message: string;
  data: {
    roles_id?: [];
    user_role?: [];
  };
};

/** 获取用户列表 */
export const getUserList = (data?: object) => {
  return http.request<Result_table>("post", "/api/user/list", {
    data
  });
};

/** 新增用户 */
export const AddUser = (data?: object) => {
  return http.request<Result>("post", "/api/user/create", { data });
};

/** 删除用户 */
export const DelUser = userId => {
  const url = `/api/user/delete/${userId}`;
  return http.request<Result>("delete", url);
};

/** 更新用户数据 */
export const UpdateUser = (userId: number, data?: object | string) => {
  return http.request<Result>("put", `/api/user/update/${userId}`, {
    data
  });
};

/** 获取指定用户数据（userId：用户id） */
export const getUserInfo = (userId: number) => {
  const url = `/api/user/${userId}/info`;
  return http.request<Result>("get", url);
};

/** 用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result_table>("get", "/api/user/role/list");
};
