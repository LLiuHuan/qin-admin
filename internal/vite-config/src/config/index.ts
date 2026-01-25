/*
 * @Description: vite 配置文件
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:52:54
 * @LastEditTime: 2026-01-25 16:41:32
 * @LastEditors: LLiuHuan
 */
import type { DefineConfig, QinViteConfig } from '../typing';

import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { defineApplicationConfig } from './application';
import { defineLibraryConfig } from './library';

export * from './application';
export * from './library';

function defineConfig(
  userConfigPromise?: DefineConfig,
  type: 'application' | 'auto' | 'library' = 'auto',
): QinViteConfig {
  let projectType = type;

  // 根据包是否存在 index.html,自动判断类型
  if (projectType === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html');
    projectType = existsSync(htmlPath) ? 'application' : 'library';
  }

  switch (projectType) {
    case 'application': {
      return defineApplicationConfig(userConfigPromise);
    }
    case 'library': {
      return defineLibraryConfig(userConfigPromise);
    }
    default: {
      throw new Error(`Unsupported project type: ${projectType}`);
    }
  }
}

export { defineConfig };
