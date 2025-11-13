/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2025-08-14 10:06:36
 * @LastEditors: LLiuHuan
 */
// https://github.com/vuejs/pinia/issues/2098
declare module 'pinia' {
  export function acceptHMRUpdate(
    initialUseStore: any | StoreDefinition,
    hot: any,
  ): (newModule: any) => any;
}
