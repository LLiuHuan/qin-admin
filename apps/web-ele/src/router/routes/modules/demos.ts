/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-16 12:18:03
 * @LastEditTime: 2026-01-05 18:25:11
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: $t('demos.elementPlus'),
        },
        name: 'NaiveDemos',
        path: '/demos/element',
        component: () => import('#/views/demos/element/index.vue'),
      },
      {
        meta: {
          title: $t('demos.form'),
        },
        name: 'BasicForm',
        path: '/demos/form',
        component: () => import('#/views/demos/form/basic.vue'),
      },
      {
        meta: {
          title: $t('demos.table'),
        },
        name: 'BasicTable',
        path: '/demos/table',
        component: () => import('#/views/demos/table/basic.vue'),
      },
    ],
  },
];

export default routes;
