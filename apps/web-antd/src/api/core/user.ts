/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2025-07-24 01:19:09
 * @LastEditors: LLiuHuan
 */
import type { UserInfo } from '@qin/types';

import { requestClient } from '#/api/request';

const USER_BASE_URL = '/user';

const UserAPI = {
  /**
   * 获取用户信息
   */
  async getUserInfoApi() {
    return requestClient.get<UserInfo>(`${USER_BASE_URL}/info`);
  },
};

export default UserAPI;
