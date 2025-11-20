/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-08-18 10:04:02
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordRaw } from 'vue-router';

import {
  QIN_ANT_PREVIEW_URL,
  QIN_DOC_URL,
  QIN_ELE_PREVIEW_URL,
  QIN_GITHUB_URL,
  QIN_LOGO_URL,
  QIN_NAIVE_PREVIEW_URL,
  QIN_TD_PREVIEW_URL,
} from '@qin/constants';
import { SvgAntdvLogoIcon, SvgTDesignIcon } from '@qin/icons';

import { IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      icon: QIN_LOGO_URL,
      order: 9998,
      title: $t('demos.qin.title'),
    },
    name: 'QinProject',
    path: '/qin',
    children: [
      {
        name: 'QinDocument',
        path: '/qin/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: QIN_DOC_URL,
          title: $t('demos.qin.document'),
        },
      },
      {
        name: 'QinGithub',
        path: '/qin/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: QIN_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'QinAntd',
        path: '/qin/antd',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: QIN_ANT_PREVIEW_URL,
          title: $t('demos.qin.antdv'),
        },
      },
      {
        name: 'QinElementPlus',
        path: '/qin/ele',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:element',
          link: QIN_ELE_PREVIEW_URL,
          title: $t('demos.qin.element-plus'),
        },
      },
      {
        name: 'QinNaive',
        path: '/qin/naive',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:naiveui',
          link: QIN_NAIVE_PREVIEW_URL,
          title: $t('demos.qin.naive-ui'),
        },
      },
      {
        name: 'QinTDesign',
        path: '/qin/tdesign',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgTDesignIcon,
          link: QIN_TD_PREVIEW_URL,
          title: $t('demos.qin.tdesign'),
        },
      },
    ],
  },
  {
    name: 'QinAbout',
    path: '/qin/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('demos.qin.about'),
      order: 9999,
    },
  },
];

export default routes;
