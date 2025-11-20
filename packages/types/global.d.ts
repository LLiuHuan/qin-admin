/*
 * @Description: 全局类型
 * @Author: LLiuHuan
 * @Date: 2025-05-22 17:00:46
 * @LastEditTime: 2025-08-18 10:53:10
 * @LastEditors: LLiuHuan
 */
import type { RouteMeta as IRouteMeta } from '@qin-core/typings';

import 'vue-router';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends IRouteMeta {}
}

export interface QinAdminAppConfigRaw {
  VITE_GLOB_API_URL: string;
  VITE_GLOB_AUTH_DINGDING_CLIENT_ID: string;
  VITE_GLOB_AUTH_DINGDING_CORP_ID: string;
}

interface AuthConfig {
  dingding?: {
    clientId: string;
    corpId: string;
  };
}

export interface ApplicationConfig {
  apiURL: string;
  auth: AuthConfig;
}

declare global {
  interface Window {
    _QIN_ADMIN_APP_CONF_: QinAdminAppConfigRaw;
  }
}
