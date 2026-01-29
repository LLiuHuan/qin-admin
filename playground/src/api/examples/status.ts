/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:39:13
 * @LastEditTime: 2026-01-08 16:34:47
 * @LastEditors: LLiuHuan
 */
import type { Recordable } from '@qin/types';

import { client } from '../request';

const STATUS_BASE_URL = '/status';

const StatusAPI = {
  status(status: string) {
    return client.get(`${STATUS_BASE_URL}`, { params: { status } });
  },
  status1(
    params: Recordable<any>,
    type: 'brackets' | 'comma' | 'indices' | 'repeat',
  ) {
    return client.get(`${STATUS_BASE_URL}`, {
      params,
      paramsSerializer: type,
      responseReturn: 'raw',
    });
  },
};

export default StatusAPI;
