/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:38:40
 * @LastEditTime: 2026-01-05 18:15:11
 * @LastEditors: LLiuHuan
 */
import { defineConfig } from '@qin/vite-config';

import { vitePluginForArco } from '@arco-plugins/vite-vue';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:8989',
            ws: true,
          },
        },
      },
      plugins: [
        vitePluginForArco({
          style: 'css',
        }),
      ],
    },
  };
});
