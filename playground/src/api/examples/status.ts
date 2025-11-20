/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:39:13
 * @LastEditTime: 2025-08-01 04:49:28
 * @LastEditors: LLiuHuan
 */
import type { Recordable } from '@qin/types';

import { requestClient } from '../request';

const STATUS_BASE_URL = '/status';

const StatusAPI = {
  status(status: string) {
    return requestClient.get(`${STATUS_BASE_URL}`, { params: { status } });
  },
  status1(
    params: Recordable<any>,
    type: 'brackets' | 'comma' | 'indices' | 'repeat',
  ) {
    return requestClient.get(`${STATUS_BASE_URL}`, {
      params,
      paramsSerializer: type,
      responseReturn: 'raw',
    });
  },
};

export default StatusAPI;
