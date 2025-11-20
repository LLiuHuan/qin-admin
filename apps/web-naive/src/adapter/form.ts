/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-08-12 15:20:00
 * @LastEditors: LLiuHuan
 */
import type { QinFormSchema as FormSchema, QinFormProps } from '@qin/common-ui';

import type { ComponentType } from './component';

import { setupQinForm, useQinForm as useForm, z } from '@qin/common-ui';
import { $t } from '@qin/locales';

async function initSetupQinForm() {
  setupQinForm<ComponentType>({
    config: {
      // naive-ui组件的空值为null,不能是undefined，否则重置表单时不生效
      emptyStateValue: null,
      baseModelPropName: 'value',
      modelPropNameMap: {
        Checkbox: 'checked',
        Radio: 'checked',
        Upload: 'fileList',
      },
    },
    defineRules: {
      required: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label]);
        }
        return true;
      },
      selectRequired: (value, _params, ctx) => {
        if (value === undefined || value === null) {
          return $t('ui.formRules.selectRequired', [ctx.label]);
        }
        return true;
      },
    },
  });
}

const useQinForm = useForm<ComponentType>;

export { initSetupQinForm, useQinForm, z };

export type QinFormSchema = FormSchema<ComponentType>;
export type { QinFormProps };
