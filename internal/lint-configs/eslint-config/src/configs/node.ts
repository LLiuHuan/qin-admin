/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-16 10:24:21
 * @LastEditTime: 2025-11-24 15:00:08
 * @LastEditors: LLiuHuan
 */
import type { Linter } from 'eslint';

import { interopDefault } from '../util';

export async function node(): Promise<Linter.Config[]> {
  const pluginNode = await interopDefault(import('eslint-plugin-n'));

  return [
    {
      plugins: {
        n: pluginNode,
      },
      rules: {
        'n/handle-callback-err': ['error', '^(err|error)$'],
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-extraneous-import': [
          'error',
          {
            allowModules: [
              'unbuild',
              '@qin/vite-config',
              'vitest',
              'vite',
              '@vue/test-utils',
              '@qin/uno-config',
              '@playwright/test',
            ],
          },
        ],
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        // 'n/no-unpublished-import': 'off',
        'n/no-unsupported-features/es-syntax': [
          'error',
          {
            ignores: [],
            version: '>=20.12.0',
          },
        ],
        'n/prefer-global/buffer': ['error', 'never'],
        // 'n/no-missing-import': 'off',
        'n/prefer-global/process': ['error', 'never'],
        'n/process-exit-as-throw': 'error',
      },
    },
    {
      files: [
        'scripts/**/*.?([cm])[jt]s?(x)',
        'internal/**/*.?([cm])[jt]s?(x)',
      ],
      rules: {
        'n/prefer-global/process': 'off',
      },
    },
  ];
}
