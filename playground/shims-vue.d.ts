/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-11-26 10:08:17
 * @LastEditTime: 2025-11-26 10:08:42
 * @LastEditors: LLiuHuan
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<object, object, any>;
  export default component;
}
