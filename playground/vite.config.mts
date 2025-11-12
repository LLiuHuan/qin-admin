/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:38:40
 * @LastEditTime: 2025-08-18 10:18:26
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
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'https://m1.apifoxmock.com/m1/3402401-1018037-default',
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
