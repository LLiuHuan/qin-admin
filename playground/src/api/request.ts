/*
 * @Description: 该文件可自行根据业务逻辑进行调整
 * @Author: LLiuHuan
 * @Date: 2025-12-16 12:18:03
 * @LastEditTime: 2026-01-08 16:28:13
 * @LastEditors: LLiuHuan
 */
import type { VueHook } from '@qin/plugins/alova';

import { useAppConfig } from '@qin/hooks';
import {
  AlovaClient,
  createServerTokenAuthentication,
} from '@qin/plugins/alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import { preferences } from '@qin/preferences';
import { useAccessStore } from '@qin/stores';

import AuthAPI from '#/api/core/auth';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

const { onAuthRequired, onResponseRefreshToken, waitingList } =
  createServerTokenAuthentication<typeof VueHook>({
    async login(response) {
      const accessStore = useAccessStore();
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.clone().json();
      if (json.code !== 0) {
        throw new Error(json.message);
      }
      accessStore.setAccessToken(json.access_token);
    },
    assignToken: (method) => {
      const accessStore = useAccessStore();
      const accessToken = accessStore.accessToken;
      method.config.headers['Accept-Language'] = preferences.app.locale;
      method.config.headers.Authorization = accessToken
        ? `Bearer ${accessToken}`
        : null;
    },
    logout(response, method) {
      console.log(response, method);
    },
    refreshTokenOnSuccess: {
      // 在请求前触发，将接收到method参数，并返回boolean表示token是否过期
      isExpired: (response) => {
        // if (count > 5) {
        //   return false;
        // }
        // count++;
        return response.status === 401;
      },

      // 当token过期时触发，在此函数中触发刷新token
      handler: async (method) => {
        try {
          const accessStore = useAccessStore();
          const { data } = await AuthAPI.refreshTokenApi();
          accessStore.setAccessToken(data);
          // console.log('refresh token success');
        } catch (error) {
          // token刷新失败，跳转回登录页
          location.href = '/login';
          // 并抛出错误
          throw error;
        }
      },
    },
  });
export const client = new AlovaClient(
  { baseURL: apiURL, requestAdapter: axiosRequestAdapter() },
  { onAuthRequired, onResponseRefreshToken, waitingList },
);

client.addResponseSuccessInterceptor(async (response, method) => {
  const { config } = method;
  const { requestType } = config;

  // 处理特殊请求类型（上传/下载）
  if (requestType === 'upload' || requestType === 'download') {
    return response;
  }

  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  const json = await response.clone().json();

  if (json.code !== 0 && json.code !== 200 && json.code !== '00000') {
    throw new Error(json.message);
  }
  return json.data;
});
