/*
 * @Description: 表格列配置类型定义
 * @Author: LLiuHuan
 * @Date: 2025-12-31 13:13:36
 * @LastEditTime: 2025-12-31 13:36:15
 * @LastEditors: LLiuHuan
 */

import type { TableProps } from 'element-plus';

/** 分页配置接口 */
export interface PaginationConfig {
  /** 当前页码 */
  current: number;
  /** 每页显示条目个数 */
  size: number;
  /** 总条目数 */
  total: number;
}

/** 分页器配置选项接口 */
export interface PaginationOptions {
  /** 每页显示个数选择器的选项列表 */
  pageSizes?: number[];
  /** 分页器的对齐方式 */
  align?: 'center' | 'left' | 'right';
  /** 分页器的布局 */
  layout?: string;
  /** 是否显示分页器背景 */
  background?: boolean;
  /** 只有一页时是否隐藏分页器 */
  hideOnSinglePage?: boolean;
  /** 分页器的大小 */
  size?: 'default' | 'large' | 'small';
  /** 分页器的页码数量 */
  pagerCount?: number;
}

/** QinTable 组件的 Props 接口 */
export interface QinTableProps extends TableProps<Record<string, any>> {
  /** 加载状态 */
  loading?: boolean;
  /** 列渲染配置 */
  columns?: ColumnOption[];
  /** 分页状态 */
  pagination?: PaginationConfig;
  /** 分页配置 */
  paginationOptions?: PaginationOptions;
  /** 空数据表格高度 */
  emptyHeight?: string;
  /** 空数据时显示的文本 */
  emptyText?: string;
  /** 是否开启 QinTableHeader，解决表格高度自适应问题 */
  showTableHeader?: boolean;
}

// 表格列配置接口
export interface ColumnOption<T = any> {
  // 列类型
  type?: 'expand' | 'globalIndex' | 'index' | 'selection';
  // 列属性名
  prop?: string;
  // 列标题
  label?: string;
  // 列宽度
  width?: number | string;
  // 最小列宽度
  minWidth?: number | string;
  // 固定列
  fixed?: 'left' | 'right' | boolean;
  // 是否可排序
  sortable?: boolean;
  // 过滤器选项
  filters?: any[];
  // 过滤方法
  filterMethod?: (value: any, row: any) => boolean;
  // 过滤器位置
  filterPlacement?: string;
  // 是否禁用
  disabled?: boolean;
  // 是否显示列
  visible?: boolean;
  // 是否选中显示
  checked?: boolean;
  // 自定义渲染函数
  formatter?: (row: T) => any;
  // 插槽相关配置
  // 是否使用插槽渲染内容
  useSlot?: boolean;
  // 插槽名称（默认为 prop 值）
  slotName?: string;
  // 是否使用表头插槽
  useHeaderSlot?: boolean;
  // 表头插槽名称（默认为 `${prop}-header`）
  headerSlotName?: string;
  // 其他属性
  [key: string]: any;
}

// 分页配置
export interface QinPaginationConfig {
  // 当前页
  currentPage: number;
  // 每页条数
  pageSize: number;
  // 总条数
  total: number;
  // 每页显示个数选择器的选项
  pageSizes?: number[];
  // 组件布局
  layout?: string;
  // 是否为小型分页
  small?: boolean;
}

// 表格大小
export enum TableSizeEnum {
  DEFAULT = 'default',
  LARGE = 'large',
  SMALL = 'small',
}
