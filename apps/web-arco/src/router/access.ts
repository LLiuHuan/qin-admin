/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-28 12:17:56
 * @LastEditTime: 2025-07-24 02:16:04
 * @LastEditors: LLiuHuan
 */
import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@qin/types';

import { generateAccessible } from '@qin/access';
import { preferences } from '@qin/preferences';

import { Message } from '@arco-design/web-vue';

import MenuAPI from '#/api/core/menu';
import { BasicLayout, IFrameView } from '#/layouts';
import { $t } from '#/locales';

const forbiddenComponent = () => import('#/views/_core/fallback/forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue');

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
  };

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      Message.loading({
        content: `${$t('common.loadingMenu')}...`,
        duration: 1.5,
      });
      return await MenuAPI.getMenusApi();
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}

export { generateAccess };
