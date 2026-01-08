/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2026-01-05 18:14:35
 * @LastEditors: LLiuHuan
 */
import { client } from '#/api/request';

const AUTH_BASE_URL = '/v1/auth';

const AuthAPI = {
  /**
   * 登录
   */
  async loginApi(data: LoginParams) {
    const method = client.post<LoginResult>(`${AUTH_BASE_URL}/login`, data);
    method.meta = {
      authRole: 'login',
    };
    return method;
  },

  /**
   * 刷新accessToken
   */
  async refreshTokenApi() {
    const method = client.post<RefreshTokenResult>(
      `${AUTH_BASE_URL}/refresh-token`,
    );
    method.meta = {
      authRole: 'refreshToken',
    };
    return method;
  },

  /**
   * 退出登录
   */
  async logoutApi() {
    const method = client.post(`${AUTH_BASE_URL}/logout`);
    method.meta = {
      authRole: 'logout',
    };
    return method;
  },

  /**
   * 获取验证码
   */
  async getCaptchaApi() {
    return client.get<CaptchaResult>(`${AUTH_BASE_URL}/captcha`);
  },

  /**
   * 获取用户权限码
   */
  async getAccessCodesApi() {
    return client.get<string[]>(`${AUTH_BASE_URL}/codes`);
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

export interface CaptchaResult {
  captchaBase64: string;
  captchaKey: string;
}
