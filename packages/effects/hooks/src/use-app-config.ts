/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:01:59
 * @LastEditTime: 2025-07-31 12:10:13
 * @LastEditors: LLiuHuan
 */
import type {
  ApplicationConfig,
  ArcoDesignProAppConfigRaw,
} from '@qin/types/global';

/**
 * 由 vite-inject-app-config 注入的全局配置
 */
export function useAppConfig(
  env: Record<string, any>,
  isProduction: boolean,
): ApplicationConfig {
  // 生产环境下，直接使用 window._QIN_ADMIN_APP_CONF_ 全局变量
  const config = isProduction
    ? window._QIN_ADMIN_APP_CONF_
    : (env as ArcoDesignProAppConfigRaw);

  const {
    VITE_GLOB_API_URL,
    VITE_GLOB_AUTH_DINGDING_CORP_ID,
    VITE_GLOB_AUTH_DINGDING_CLIENT_ID,
  } = config;

  const applicationConfig: ApplicationConfig = {
    apiURL: VITE_GLOB_API_URL,
    auth: {},
  };

  if (VITE_GLOB_AUTH_DINGDING_CORP_ID && VITE_GLOB_AUTH_DINGDING_CLIENT_ID) {
    applicationConfig.auth.dingding = {
      clientId: VITE_GLOB_AUTH_DINGDING_CLIENT_ID,
      corpId: VITE_GLOB_AUTH_DINGDING_CORP_ID,
    };
  }

  return applicationConfig;
}
