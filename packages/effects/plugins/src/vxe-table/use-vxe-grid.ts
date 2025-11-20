/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:03:11
 * @LastEditTime: 2025-05-27 15:06:57
 * @LastEditors: LLiuHuan
 */

import type { VxeGridSlots, VxeGridSlotTypes } from 'vxe-table';

import type { SlotsType } from 'vue';

import type { BaseFormComponentType } from '@qin-core/form-ui';

import type { ExtendedVxeGridApi, VxeGridProps } from './types';

import { defineComponent, h, onBeforeUnmount } from 'vue';

import { useStore } from '@qin-core/shared/store';

import { VxeGridApi } from './api';
import VxeGrid from './use-vxe-grid.vue';

type FilteredSlots<T> = {
  [K in keyof VxeGridSlots<T> as K extends 'form'
    ? never
    : K]: VxeGridSlots<T>[K];
};

export function useQinVxeGrid<
  T extends Record<string, any> = any,
  D extends BaseFormComponentType = BaseFormComponentType,
>(options: VxeGridProps<T, D>) {
  // const IS_REACTIVE = isReactive(options);
  const api = new VxeGridApi(options);
  const extendedApi: ExtendedVxeGridApi<T, D> = api as ExtendedVxeGridApi<T, D>;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Grid = defineComponent(
    (props: VxeGridProps<T>, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () => h(VxeGrid, { ...props, ...attrs, api: extendedApi }, slots);
    },
    {
      name: 'QinVxeGrid',
      inheritAttrs: false,
      slots: Object as SlotsType<
        {
          // 表格标题
          'table-title': undefined;
          // 工具栏左侧部分
          'toolbar-actions': VxeGridSlotTypes.DefaultSlotParams<T>;
          // 工具栏右侧部分
          'toolbar-tools': VxeGridSlotTypes.DefaultSlotParams<T>;
        } & FilteredSlots<T>
      >,
    },
  );
  // Add reactivity support
  // if (IS_REACTIVE) {
  //   watch(
  //     () => options,
  //     () => {
  //       api.setState(options);
  //     },
  //     { immediate: true },
  //   );
  // }

  return [Grid, extendedApi] as const;
}

export type useQinVxeGrid = typeof useQinVxeGrid;
