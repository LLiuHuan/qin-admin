/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:01:59
 * @LastEditTime: 2025-05-27 12:08:53
 * @LastEditors: LLiuHuan
 */
import { updatePreferences, usePreferences } from '@qin/preferences';
/**
 * 主体区域最大化
 */
export function useContentMaximize() {
  const { contentIsMaximize } = usePreferences();

  function toggleMaximize() {
    const isMaximize = contentIsMaximize.value;

    updatePreferences({
      header: {
        hidden: !isMaximize,
      },
      sidebar: {
        hidden: !isMaximize,
      },
    });
  }
  return {
    contentIsMaximize,
    toggleMaximize,
  };
}
