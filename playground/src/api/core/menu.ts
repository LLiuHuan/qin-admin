/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2026-01-05 18:10:18
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordStringComponent } from '@qin/types';

import { client } from '#/api/request';

const MENU_BASE_URL = '/menu';

const MenuAPI = {
  /**
   * 获取用户所有菜单
   */
  async getMenusApi() {
    return client.get<RouteRecordStringComponent[]>(`${MENU_BASE_URL}/all`);
  },
};

export default MenuAPI;
