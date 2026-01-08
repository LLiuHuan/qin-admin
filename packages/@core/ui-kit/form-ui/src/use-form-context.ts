/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-16 12:18:03
 * @LastEditTime: 2026-01-08 19:02:15
 * @LastEditors: LLiuHuan
 */
import type { ExtendedFormApi, FormActions, QinFormProps } from './types';
import { createContext } from '@qin-core/shadcn-ui';
import { isString, set } from '@qin-core/shared/utils';
import type { ComputedRef } from 'vue';
import { computed, unref, useSlots } from 'vue';

import { useForm } from 'vee-validate';

import { getCustomDefaultValue_byZodSchema } from './form-render/helper';

type ExtendFormProps = QinFormProps & { formApi?: ExtendedFormApi };

export const [injectFormProps, provideFormProps] =
  createContext<[ComputedRef<ExtendFormProps> | ExtendFormProps, FormActions]>(
    'QinFormProps',
  );

export const [injectComponentRefMap, provideComponentRefMap] =
  createContext<Map<string, unknown>>('ComponentRefMap');

export function useFormInitial(
  props: ComputedRef<QinFormProps> | QinFormProps,
) {
  const slots = useSlots();
  const initialValues = generateInitialValues();

  const form = useForm({
    ...(Object.keys(initialValues)?.length ? { initialValues } : {}),
  });

  const delegatedSlots = computed(() => {
    const resultSlots: string[] = [];

    for (const key of Object.keys(slots)) {
      if (key !== 'default') {
        resultSlots.push(key);
      }
    }
    return resultSlots;
  });

  function generateInitialValues() {
    const initialValues: Record<string, any> = {};

    (unref(props).schema || []).forEach((item) => {
      if ('defaultValue' in item) {
        set(initialValues, item.fieldName, item.defaultValue);
      } else if (item.rules && !isString(item.rules)) {
        const zodSchema = item.rules;

        // 检查规则是否适合提取默认值
        const customDefaultValue = getCustomDefaultValue_byZodSchema(zodSchema);
        if (customDefaultValue !== undefined) {
          set(initialValues, item.fieldName, customDefaultValue);
        }
      }
    });

    return initialValues;
  }

  return {
    delegatedSlots,
    form,
  };
}
