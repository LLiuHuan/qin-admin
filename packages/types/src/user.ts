/*
 * @Description: 用户信息
 * @Author: LLiuHuan
 * @Date: 2025-05-22 17:02:33
 * @LastEditTime: 2025-05-22 17:02:44
 * @LastEditors: LLiuHuan
 */
import type { BasicUserInfo } from '@qin-core/typings';

/** 用户信息 */
interface UserInfo extends BasicUserInfo {
  /**
   * 用户描述
   */
  desc: string;
  /**
   * 首页地址
   */
  homePath: string;

  /**
   * accessToken
   */
  token: string;
}

export type { UserInfo };
