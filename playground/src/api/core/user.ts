/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2026-01-05 18:10:13
 * @LastEditors: LLiuHuan
 */
import type { UserInfo } from '@qin/types';

import { client } from '#/api/request';

const USER_BASE_URL = '/user';

const UserAPI = {
  /**
   * 获取用户信息
   */
  async getUserInfoApi() {
    return client.get<UserInfo>(`${USER_BASE_URL}/info`);
  },
};

export default UserAPI;
