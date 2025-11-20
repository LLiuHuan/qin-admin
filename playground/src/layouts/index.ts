/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2025-05-27 15:36:04
 * @LastEditors: LLiuHuan
 */
const BasicLayout = () => import('./basic.vue');
const AuthPageLayout = () => import('./auth.vue');

const IFrameView = () => import('@qin/layouts').then((m) => m.IFrameView);

export { AuthPageLayout, BasicLayout, IFrameView };
