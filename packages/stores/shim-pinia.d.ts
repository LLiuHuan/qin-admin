/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2025-11-24 15:36:12
 * @LastEditors: LLiuHuan
 */
// https://github.com/vuejs/pinia/issues/2098
declare module 'pinia' {
  export function acceptHMRUpdate(
    initialUseStore: any | StoreDefinition,
    hot: any,
  ): (newModule: any) => any;
}

export { acceptHMRUpdate };
