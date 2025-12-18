import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'carbon:template',
      keepAlive: true,
      order: 1000,
      title: $t('template.title'),
    },
    name: 'Template',
    path: '/template',
    children: [
      {
        name: 'BannerExample',
        path: '/template/banners',
        component: () => import('#/views/template/banners/index.vue'),
        meta: {
          icon: 'ri:rectangle-line',
          keepAlive: true,
          title: $t('examples.drawer.title'),
        },
      },
    ],
  },
];

export default routes;
