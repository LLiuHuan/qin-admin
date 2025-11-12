/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-06-22 23:51:12
 * @LastEditTime: 2025-08-12 15:20:12
 * @LastEditors: LLiuHuan
 */

// import type { PwaOptions } from '@vite-pwa/vitepress';

// import { resolve } from 'node:path';

import { defineConfig } from 'vitepress';

export const shared = defineConfig({
  appearance: 'dark',
});

// function pwa(): PwaOptions {
//   return {
//     includeManifestIcons: false,
//     manifest: {
//       description:
//         'Arco Admin is a modern admin dashboard template based on Vue 3. ',
//       icons: [
//         {
//           sizes: '192x192',
//           src: 'https://unpkg.com/arco-static@0.0.3/source/logo@192.png',
//           type: 'image/png',
//         },
//         {
//           sizes: '512x512',
//           src: 'https://unpkg.com/arco-static@0.0.3/source/logo@512.png',
//           type: 'image/png',
//         },
//       ],
//       id: '/',
//       name: 'Qin Admin Doc',
//       short_name: 'arco_admin_doc',
//       theme_color: '#ffffff',
//     },
//     outDir: resolve(process.cwd(), '.vitepress/dist'),
//     registerType: 'autoUpdate',
//     workbox: {
//       globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
//       maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
//     },
//   };
// }
