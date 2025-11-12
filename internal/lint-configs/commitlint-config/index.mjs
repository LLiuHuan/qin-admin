import { execSync } from 'node:child_process';

import { getPackagesSync } from '@qin/node-utils';

const { packages } = getPackagesSync();

// allowed scopes of commit
const allowedScopes = [
  ...packages.map((pkg) => pkg.packageJson.name),
  'project',
  'style',
  'lint',
  'ci',
  'dev',
  'deploy',
  'other',
];

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/s$/, '');

/**
 * @type {import('cz-git').UserConfig}
 */
const userConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  prompt: {
    /** @use `pnpm commit :f` */
    alias: {
      b: 'build: bump dependencies',
      c: 'chore: update config',
      f: 'docs: fix typos',
      r: 'docs: update README',
      s: 'style: update code format',
    },
    allowCustomIssuePrefixs: false,
    // scopes: [...scopes, 'mock'],
    allowEmptyIssuePrefixs: false,
    customScopesAlign: scopeComplete ? 'bottom' : 'top',
    defaultScope: scopeComplete,
    // English
    typesAppend: [
      { name: 'workflow: workflow improvements', value: 'workflow' },
      { name: 'types:    type definition file changes', value: 'types' },
    ],

    // 中英文对照版
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围 (可选):',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀 (可选):',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix' },
      {
        value: 'docs',
        name: 'docs:     文档变更 | Documentation only changes',
      },
      {
        value: 'style',
        name: 'style:    代码格式 | Changes that do not affect the meaning of the code',
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature',
      },
      {
        value: 'perf',
        name: 'perf:     性能优化 | A code change that improves performance',
      },
      {
        value: 'test',
        name: 'test:     添加疏漏测试或已有测试改动 | Adding missing tests or correcting existing tests',
      },
      {
        value: 'build',
        name: 'build:    构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等) | Changes that affect the build system or external dependencies',
      },
      {
        value: 'ci',
        name: 'ci:       修改 CI 配置、脚本 | Changes to our CI configuration files and scripts | Revert to a commit',
      },
      { value: 'revert', name: 'revert:   回滚 commit | Revert to a commit' },
      {
        value: 'chore',
        name: 'chore:    对构建过程或辅助工具和库的更改 (不影响源文件、测试用例) | Other changes that do not modify src or test files',
      },
      { value: 'wip', name: 'wip:      正在开发中 | Under development' },
      {
        value: 'workflow',
        name: 'workflow: 工作流程改进 | Workflow improvement',
      },
      {
        value: 'types',
        name: 'types:    类型定义文件修改 | Type definition file modification',
      },
    ],
    emptyScopesAlias: 'empty:      不填写',
    customScopesAlias: 'custom:     自定义',
  },
  rules: {
    /**
     * - 提交信息的 body 部分之前必须有两个空行。
     */
    'body-leading-blank': [2, 'always'],
    /**
     * - 提交信息的 footer 部分之前必须有一个空行。
     */
    'footer-leading-blank': [1, 'always'],
    /**
     * -
     */
    'function-rules/scope-enum': [
      2, // level: error
      'always',
      (parsed) => {
        if (!parsed.scope || allowedScopes.includes(parsed.scope)) {
          return [true];
        }

        return [false, `scope must be one of ${allowedScopes.join(', ')}`];
      },
    ],
    /**
     * - 限制提交信息的标题（header）的最大长度为 108 个字符。
     */
    'header-max-length': [2, 'always', 108],
    /**
     * - 禁用 scope（范围）的值限制。
     */
    'scope-enum': [0],
    /**
     * - 禁用 subject（描述）部分的首字母需要大写，并且其余字母小写。
     */
    'subject-case': [0],
    /**
     * - 确保 subject（描述）部分不为空。
     */
    'subject-empty': [2, 'never'],
    /**
     * - 确保 type（类型）部分不为空。
     */
    'type-empty': [2, 'never'],
    /**
     * - 限定 type 的值必须在以下选项中，以确保提交类型统一
     */
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'types',
        'release',
      ],
    ],
  },
};

export default userConfig;
