/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2026-01-23 08:39:15
 * @LastEditTime: 2026-01-23 08:47:50
 * @LastEditors: LLiuHuan
 */
import { client } from '../request';

const TABLE_BASE_URL = '/table';

const TableAPI = {
  /**
   * 获取表格数据
   * @param params
   */
  getTableDataApi(params: any) {
    return client.get(`${TABLE_BASE_URL}/list`, { params });
  },

  // getT1(params: { page: number; size: number }) {
  //   console.log(params);
  //   return client.get(`/v1/roles/page`, {
  //     params,
  //   });
  // },
};
export { TableAPI };
