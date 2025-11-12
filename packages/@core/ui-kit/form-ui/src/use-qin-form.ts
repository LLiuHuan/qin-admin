/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:33:35
 * @LastEditTime: 2025-08-18 10:14:55
 * @LastEditors: LLiuHuan
 */
import type {
  BaseFormComponentType,
  ExtendedFormApi,
  QinFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@qin-core/shared/store';

import QinUseForm from './arco-use-form.vue';
import { FormApi } from './form-api';

export function useQinForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: QinFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: QinFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(QinUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'QinUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
