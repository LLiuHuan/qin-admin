/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-21 02:30:08
 * @LastEditTime: 2025-12-26 09:31:29
 * @LastEditors: LLiuHuan
 */
export interface EditorProps {
  /** 编辑器高度 */
  height?: string;
  /** 自定义工具栏配置 */
  toolbarKeys?: string[];
  /** 插入新工具到指定位置 */
  insertKeys?: { index: number; keys: string[] };
  /** 排除的工具栏项 */
  excludeKeys?: string[];
  /** 编辑器模式 */
  mode?: 'default' | 'simple';
  /** 占位符文本 */
  placeholder?: string;
  /** 上传配置 */
  uploadConfig?: {
    headers?: object;
    maxFileSize?: number;
    maxNumberOfFiles?: number;
    onError(file: File, err: any, res: any): void;
    onSuccess?: () => void;
    server?: string;
  };
}
