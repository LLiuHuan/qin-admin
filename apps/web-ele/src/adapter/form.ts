/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2025-05-27 15:52:10
 * @LastEditors: LLiuHuan
 */
import type { QinFormSchema as FormSchema, QinFormProps } from '@qin/common-ui';

import type { ComponentType } from './component';

import { setupQinForm, useQinForm as useForm, z } from '@qin/common-ui';
import { $t } from '@qin/locales';

async function initSetupQinForm() {
  setupQinForm<ComponentType>({
    config: {
      modelPropNameMap: {
        Upload: 'fileList',
        CheckboxGroup: 'model-value',
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
