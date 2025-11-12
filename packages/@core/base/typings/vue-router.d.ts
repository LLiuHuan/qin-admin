/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-16 16:07:50
 * @LastEditTime: 2025-05-16 16:08:24
 * @LastEditors: LLiuHuan
 */
/* eslint-disable no-restricted-imports */
import type { RouteMeta as IRouteMeta } from '@qin-core/typings';

import 'vue-router';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends IRouteMeta {}
}
