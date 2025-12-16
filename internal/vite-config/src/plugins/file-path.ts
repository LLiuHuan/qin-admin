import type { FSWatcher } from 'chokidar';
import type { Plugin } from 'vite';

import fs from 'node:fs';
import path from 'node:path';

import chokidar from 'chokidar';

/**
 * 字符串转帕斯卡命名（大驼峰）
 * @param str 原始字符串
 * @returns 帕斯卡命名字符串
 */
const toPascalCase = (str: string): string => {
  return str.replaceAll(/(^\w|-\w)/g, clearAndUpper);
};

/**
 * 清除连字符并转大写
 * @param text 匹配的文本
 * @returns 处理后的文本
 */
const clearAndUpper = (text: string): string => {
  return text.replace(/-/, '').toUpperCase();
};

/**
 * 递归获取目录下所有 .vue 文件
 * @param dir 目标目录
 * @param fileList 文件列表（递归累加）
 * @returns 所有.vue文件路径数组
 */
const getAllVueFiles = (dir: string, fileList: string[] = []): string[] => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getAllVueFiles(filePath, fileList);
    } else if (filePath.endsWith('.vue')) {
      fileList.push(filePath);
    }
  });

  return fileList;
};

/**
 * 从.vue文件内容提取组件名称（从defineOptions.name）
 * @param fileContent 文件内容
 * @returns 组件名称或null
 */
const extractComponentName = (
  fileContent: string,
): null | string | undefined => {
  const regex = /defineOptions\(\s*\{\s*name:\s*["']([^"']+)["']/;
  const match = fileContent.match(regex);
  return match ? match[1] : null;
};

/**
 * Vite插件：生成Vue文件路径与组件名的映射表
 * @param outputFilePath 映射表输出文件路径
 * @returns Vite插件对象
 */
const filePathPlugin = (outputFilePath: string): Plugin => {
  let root: string; // 项目根目录
  let watcher: FSWatcher | null = null; // 文件监听器

  /**
   * 生成路径-组件名映射表并写入文件
   */
  const generatePathNameMap = (): void => {
    if (!root) return;

    // 获取目标目录下的所有.vue文件
    const vueFiles = [...getAllVueFiles(path.join(root, 'src/views'))];

    // 构建映射关系
    const pathNameMap: Record<string, string> = {};
    for (const filePath of vueFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      const componentName = extractComponentName(content);
      const relativePath = `/${path.relative(root, filePath).replaceAll('\\', '/')}`;

      pathNameMap[relativePath] =
        componentName || toPascalCase(path.basename(filePath, '.vue'));
    }

    // 写入文件
    const outputContent = `${JSON.stringify(pathNameMap, null, 2)}\n`;
    fs.writeFileSync(outputFilePath, outputContent, 'utf8');
  };

  /**
   * 监听目录变化（开发环境）
   */
  const watchDirectoryChanges = (): void => {
    if (!root) return;

    const watchDirectories = [path.join(root, 'src/views')];

    // 初始化监听器
    watcher = chokidar.watch(watchDirectories, {
      persistent: true,
      ignoreInitial: true,
      ignorePermissionErrors: true,
    });

    // 监听所有变化事件
    watcher.on('all', (event, path) => {
      console.log(`[file-path-plugin] ${event} ${path}, regenerating map...`);
      generatePathNameMap();
    });
  };

  return {
    name: 'file-path-plugin',

    // 配置解析完成后获取项目根目录
    configResolved(resolvedConfig) {
      root = resolvedConfig.root;
    },

    // 构建开始时生成映射表
    buildStart() {
      generatePathNameMap();
    },

    // 构建结束时启动监听器（开发环境）
    buildEnd() {
      if (process.env.NODE_ENV === 'development') {
        watchDirectoryChanges();
      }
    },

    // 插件关闭时清理监听器
    closeBundle() {
      if (watcher) {
        watcher.close();
      }
    },
  };
};

export { filePathPlugin };
