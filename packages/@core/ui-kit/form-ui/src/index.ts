/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:33:35
 * @LastEditTime: 2025-05-27 11:39:39
 * @LastEditors: LLiuHuan
 */
export { setupQinForm } from './config';

export type {
  QinFormProps,
  FormSchema as QinFormSchema,
  BaseFormComponentType,
  ExtendedFormApi,
} from './types';

export * from './use-qin-form';
// export { default as QinForm } from './arco-form.vue';
export * as z from 'zod';
