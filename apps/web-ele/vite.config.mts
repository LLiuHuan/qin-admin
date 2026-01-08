/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:38:40
 * @LastEditTime: 2026-01-06 11:12:38
 * @LastEditors: LLiuHuan
 */
import { defineConfig } from '@qin/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      server: {
        proxy: {
          '/api111': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api111/, ''),
            // mock代理目标地址
            target: 'http://localhost:8989',
            ws: true,
          },
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'https://m1.apifoxmock.com/m1/3402401-1018037-default',
            ws: true,
          },
        },
      },
    },
  };
});
