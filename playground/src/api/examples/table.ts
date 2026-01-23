/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:39:13
 * @LastEditTime: 2026-01-05 16:53:41
 * @LastEditors: LLiuHuan
 */

import { client } from '../request';

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
    const method = client.get(`${TABLE_BASE_URL}/list`, { params });
    // const method = client.post<AuthApi.LoginResult>('/auth/login', params);
    // method.meta = {
    //   authRole: 'login',
    // };
    return method;
    // return requestClient.get(`${TABLE_BASE_URL}/list`, { params });
  },
};

export default TableAPI;
