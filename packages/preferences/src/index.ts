/*
 * @Description: 公共的默认偏好设置
 * @Author: LLiuHuan
 * @Date: 2025-05-22 17:14:05
 * @LastEditTime: 2025-05-22 17:14:34
 * @LastEditors: LLiuHuan
 */
import type { Preferences } from '@qin-core/preferences';
import type { DeepPartial } from '@qin-core/typings';

/**
 * 如果你想所有的app都使用相同的默认偏好设置，你可以在这里定义
 * 而不是去修改 @qin-core/preferences 中的默认偏好设置
 * @param preferences
 * @returns
 */

function defineOverridesPreferences(preferences: DeepPartial<Preferences>) {
  return preferences;
}

export { defineOverridesPreferences };

export * from '@qin-core/preferences';
