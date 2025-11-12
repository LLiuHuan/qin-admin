/*
 * @Description: 查找菜单路径
 * @Author: LLiuHuan
 * @Date: 2025-05-16 16:10:01
 * @LastEditTime: 2025-05-16 17:13:06
 * @LastEditors: LLiuHuan
 */
import type { MenuRecordRaw } from '@qin-core/typings';

function findMenuByPath(
  list: MenuRecordRaw[],
  path?: string,
): MenuRecordRaw | null {
  for (const menu of list) {
    if (menu.path === path) {
      return menu;
    }
    const findMenu = menu.children && findMenuByPath(menu.children, path);
    if (findMenu) {
      return findMenu;
    }
  }
  return null;
}

/**
 * 查找根菜单
 * @param menus
 * @param path
 */
function findRootMenuByPath(menus: MenuRecordRaw[], path?: string, level = 0) {
  const findMenu = findMenuByPath(menus, path);
  const rootMenuPath = findMenu?.parents?.[level];
  const rootMenu = rootMenuPath
    ? menus.find((item) => item.path === rootMenuPath)
    : undefined;
  return {
    findMenu,
    rootMenu,
    rootMenuPath,
  };
}

export { findMenuByPath, findRootMenuByPath };
