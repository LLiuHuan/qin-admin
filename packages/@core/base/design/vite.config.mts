/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-16 14:36:31
 * @LastEditTime: 2025-05-16 14:37:10
 * @LastEditors: LLiuHuan
 */
import { defineConfig } from '@qin/vite-config';

export default defineConfig(async () => {
  return {
    vite: {
      publicDir: 'src/scss-bem',
    },
  };
});
