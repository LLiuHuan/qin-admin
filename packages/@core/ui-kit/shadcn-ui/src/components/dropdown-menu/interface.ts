/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-08-18 10:11:34
 * @LastEditors: LLiuHuan
 */
import type { Component } from 'vue';

interface QinDropdownMenuItem {
  disabled?: boolean;
  /**
   * @zh_CN 点击事件处理
   * @param data
   */
  handler?: (data: any) => void;
  /**
   * @zh_CN 图标
   */
  icon?: Component;
  /**
   * @zh_CN 标题
   */
  label: string;
  /**
   * @zh_CN 是否是分割线
   */
  separator?: boolean;
  /**
   * @zh_CN 唯一标识
   */
  value: string;
}

interface DropdownMenuProps {
  menus: QinDropdownMenuItem[];
}

export type { DropdownMenuProps, QinDropdownMenuItem };
