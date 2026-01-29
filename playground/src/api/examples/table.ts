/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:39:13
 * @LastEditTime: 2026-01-25 17:05:26
 * @LastEditors: LLiuHuan
 */

import { requestClient } from '../request';

const TABLE_BASE_URL = '/table';

export namespace TableParams {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

const TableAPI = {
  list(params: TableParams.PageFetchParams) {
    const method = requestClient.get(`${TABLE_BASE_URL}/list`, { params });
    // const method = client.post<AuthApi.LoginResult>('/auth/login', params);
    // method.meta = {
    //   authRole: 'login',
    // };
    return method;
    // return requestClient.get(`${TABLE_BASE_URL}/list`, { params });
  },
};

export default TableAPI;
