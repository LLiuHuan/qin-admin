/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-28 11:47:26
 * @LastEditTime: 2025-11-26 09:56:27
 * @LastEditors: LLiuHuan
 */
import { initPreferences } from '@qin/preferences';
import { unmountGlobalLoading } from '@qin/utils';

import { overridesPreferences } from './preferences';

/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initApplication() {
  try {
    // name用于指定项目唯一标识
    // 用于区分不同项目的偏好设置以及存储数据的key前缀以及其他一些需要隔离的数据
    const env = import.meta.env.PROD ? 'prod' : 'dev';
    const appVersion = import.meta.env.VITE_APP_VERSION;
    const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

    // app偏好设置初始化
    await initPreferences({
      namespace,
      overrides: overridesPreferences,
    });

    // 启动应用并挂载
    // vue应用主要逻辑及视图
    const { bootstrap } = await import('./bootstrap');
    await bootstrap(namespace);

    // 移除并销毁loading
    unmountGlobalLoading();
  } catch (error) {
    console.error('Failed to initialize application:', error);
    // 移除loading即使初始化失败
    unmountGlobalLoading();
    // 可以显示错误页面或重试选项
    document.body.innerHTML =
      '<h1>Application failed to load. Please refresh the page.</h1>';
  }
}

initApplication();
