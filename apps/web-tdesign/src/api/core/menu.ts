/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2025-07-24 01:18:13
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordStringComponent } from '@qin/types';

import { requestClient } from '#/api/request';

const MENU_BASE_URL = '/menu';

const MenuAPI = {
  /**
   * 获取用户所有菜单
   */
  async getMenusApi() {
    return requestClient.get<RouteRecordStringComponent[]>(
      `${MENU_BASE_URL}/all`,
    );
  },
};

export default MenuAPI;
