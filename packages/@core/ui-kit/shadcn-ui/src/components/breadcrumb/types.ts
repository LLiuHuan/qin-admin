/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-05-27 10:16:09
 * @LastEditors: LLiuHuan
 */
import type { Component } from 'vue';

import type { BreadcrumbStyleType } from '@qin-core/typings';

export interface IBreadcrumb {
  icon?: Component | string;
  isHome?: boolean;
  items?: IBreadcrumb[];
  path?: string;
  title?: string;
}

export interface BreadcrumbProps {
  breadcrumbs: IBreadcrumb[];
  showIcon?: boolean;
  styleType?: BreadcrumbStyleType;
}
