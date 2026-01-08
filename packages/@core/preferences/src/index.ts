/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-16 12:18:03
 * @LastEditTime: 2026-01-08 11:38:06
 * @LastEditors: LLiuHuan
 */
import type { Preferences } from './types';

import { preferencesManager } from './preferences';

export const {
  getPreferences,
  updatePreferences,
  resetPreferences,
  clearCache,
  initPreferences,
} = preferencesManager;

export const preferences: Preferences = getPreferences();

export { preferencesManager };

export * from './constants';
export type * from './types';
export * from './use-preferences';
