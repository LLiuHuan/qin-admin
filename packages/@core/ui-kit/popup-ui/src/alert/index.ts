/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:02:15
 * @LastEditTime: 2025-08-18 11:30:58
 * @LastEditors: LLiuHuan
 */
export type {
  AlertProps,
  BeforeCloseScope,
  IconType,
  PromptProps,
} from './alert';
export { useAlertContext } from './alert';
export { default as Alert } from './alert.vue';
export {
  qinAlert as alert,
  clearAllAlerts,
  arcoConfirm as confirm,
  arcoPrompt as prompt,
} from './AlertBuilder';
