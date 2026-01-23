/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2026-01-23 08:38:52
 * @LastEditors: LLiuHuan
 */
import { baseRequestClient, requestClient } from '#/api/request';

const AUTH_BASE_URL = '/auth';

const AuthAPI = {
  /**
   * 登录
   */
  async loginApi(data: LoginParams) {
    return requestClient.post<LoginResult>(`${AUTH_BASE_URL}/login`, data);
  },

  /**
   * 刷新accessToken
   */
  async refreshTokenApi() {
    return baseRequestClient.post<RefreshTokenResult>(
      `${AUTH_BASE_URL}/refresh`,
      {
        withCredentials: true,
      },
    );
  },

  /**
   * 退出登录
   */
  async logoutApi() {
    return baseRequestClient.post(`${AUTH_BASE_URL}/logout`, {
      withCredentials: true,
    });
  },

  /**
   * 获取用户权限码
   */
  async getAccessCodesApi() {
    return requestClient.get<string[]>(`${AUTH_BASE_URL}/codes`);
  },

  /**
   * 获取用户权限码
   */
  async getAccessCodesApi1() {
    return requestClient.get(`${AUTH_BASE_URL}/codes`);
  },
};

export default AuthAPI;

/** 登录接口参数 */
export interface LoginParams {
  password?: string;
  username?: string;
}

/** 登录接口返回值 */
export interface LoginResult {
  accessToken: string;
}

export interface RefreshTokenResult {
  data: string;
  status: number;
}
