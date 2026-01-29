/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-16 10:24:21
 * @LastEditTime: 2026-01-08 18:20:29
 * @LastEditors: LLiuHuan
 */
import type { Linter } from 'eslint';

import { interopDefault } from '../util';

export async function perfectionist(): Promise<Linter.Config[]> {
  const perfectionistPlugin = await interopDefault(
    import('eslint-plugin-perfectionist'),
  );

  return [
    perfectionistPlugin.configs['recommended-natural'],
    {
      rules: {
        'perfectionist/sort-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            order: 'asc', // 升序排列
            type: 'natural', // 修复：将顶层type改为sortType，避免与customGroups.type冲突
            internalPattern: ['^#/.+'], // 内部模块匹配规则
            // newlinesBetween: 'always', // 分组间强制换行
            groups: [
              // 1. 类型导入分组（type父分组下嵌套自定义type子分组）
              [
                // 'external-type',
                // 'builtin-type',
                'type', // 原生type分组
                'vue-type', // 自定义type分组
                'arco-type', // 自定义type分组
                'arco-core-type', // 自定义type分组
                // 'parent-type',
                // 'sibling-type',
                // 'index-type',
                // 'internal-type',
              ],
              // 2. 普通导入分组（external父分组下嵌套自定义value子分组）
              [
                'builtin', // 原生内置模块
                'external', // 原生外部模块
                'vue', // 自定义value分组
                'arco', // 自定义value分组
                'arco-core', // 自定义value分组
                'internal', // 原生内部模块
              ],
              // 3. 其他原生分组
              ['parent', 'sibling', 'index'],
              'side-effect',
              'side-effect-style',
              'style',
              // 'object',
              'unknown',
            ],
            // 自定义分组：type（导入类型分组）、value（导入值分组）
            customGroups: [
              {
                groupName: 'arco-core-type',
                elementNamePattern: ['^@qin-core/.+'], // 匹配@qin-core开头的类型导入
              },
              {
                groupName: 'arco-type',
                elementNamePattern: ['^@arco-design/.+'], // 匹配@arco-design开头的类型导入
              },
              {
                groupName: 'vue-type',
                elementNamePattern: ['^vue$', '^vue-.+', '^@vue/.+'], // 匹配vue相关类型导入
              },
              {
                groupName: 'arco',
                elementNamePattern: '^@qin/.+', // 匹配@qin开头的导入值
              },
              {
                groupName: 'arco-core',
                elementNamePattern: '^@qin-core/.+', // 匹配@qin-core开头的导入值
              },
              {
                groupName: 'vue',
                elementNamePattern: ['^vue$', '^vue-.+', '^@vue/.+'], // 匹配vue相关导入值
              },
            ],
            environment: 'node',
          },
        ],
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-named-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-objects': [
          'off',
          {
            customGroups: {
              items: 'items',
              list: 'list',
              children: 'children',
            },
            groups: ['unknown', 'items', 'list', 'children'],
            ignorePattern: ['children'],
            order: 'asc',
            type: 'natural',
          },
        ],
      },
    },
  ];
}
