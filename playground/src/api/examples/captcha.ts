import { requestClient } from '../request';

/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-29 17:52:15
 * @LastEditTime: 2026-01-25 17:05:24
 * @LastEditors: LLiuHuan
 */
const CAPTCHA_BASE_URL = '/captcha';

const CaptchaAPI = {
  getCaptcha(s: number) {
    return requestClient.get(`${CAPTCHA_BASE_URL}?s=${s}`);
  },
};

export default CaptchaAPI;
