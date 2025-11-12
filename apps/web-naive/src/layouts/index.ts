/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-07-15 02:20:22
 * @LastEditors: LLiuHuan
 */
const BasicLayout = () => import('./basic.vue');
const AuthPageLayout = () => import('./auth.vue');

const IFrameView = () => import('@qin/layouts').then((m) => m.IFrameView);

export { AuthPageLayout, BasicLayout, IFrameView };
