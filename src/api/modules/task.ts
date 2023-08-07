import { ResPage, User } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 任务管理模块
 */
// * 获取用户列表
export const getTaskList = (params: User.ReqGetUserParams) => {
	return http.get<ResPage<User.ResUserList>>(`/drm-batch-task-info`, params);
};

//* 删除用户
export const deleteTask = (params: any) => {
	return http.delete(`/drm-batch-task-info/${params.id}`);
};

//* 新增用户
export const addTask = (params: any) => {
	return http.post(`/drm-batch-task-info`, params);
};

//* 编辑用户
export const editTask = (params: any) => {
	return http.put(`/drm-batch-task-info/${params.id}`, params);
};
