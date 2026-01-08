import type { VueHook } from '@qin/plugins/alova';
/**
 * 该文件可自行根据业务逻辑进行调整
 */
import type { RequestClientOptions } from '@qin/request';

import { useAppConfig } from '@qin/hooks';
import {
  AlovaClient,
  createServerTokenAuthentication,
} from '@qin/plugins/alova';
import { preferences } from '@qin/preferences';
import {
  authenticateResponseInterceptor,
  defaultResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@qin/request';
import { useAccessStore, useTimezoneStore } from '@qin/stores';

import { ElMessage } from 'element-plus';

import { useAuthStore } from '#/store';

import AuthAPI from './core/auth';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL,
  });

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const resp = await AuthAPI.refreshTokenApi();
    const newToken = resp.data;
    accessStore.setAccessToken(newToken);
    return newToken;
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();
      const timezoneStore = useTimezoneStore();

      config.headers.Authorization = formatToken(accessStore.accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      config.headers['X-Timezone'] = timezoneStore.timezone;
      return config;
    },
  });

  // 处理返回的响应数据格式
  client.addResponseInterceptor(
    defaultResponseInterceptor({
      codeField: 'code',
      dataField: 'data',
      successCode: 0,
    }),
  );

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      // 当前mock接口返回的错误字段是 error 或者 message
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? '';
      // 如果没有错误信息，则会根据状态码进行提示
      ElMessage.error(errorMessage || msg);
    }),
  );

  return client;
}

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
});

export const baseRequestClient = new RequestClient({ baseURL: apiURL });

// const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

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
export const client = new AlovaClient({ baseURL: '/api111' });

client.addResponseSuccessInterceptor(async (response, method) => {
  const { config } = method;
  const { requestType } = config;
  console.log(response, method);

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
