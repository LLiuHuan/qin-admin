/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2026-01-06 10:36:38
 * @LastEditTime: 2026-01-06 10:49:40
 * @LastEditors: LLiuHuan
 */
/** 分页参数 */
export interface PaginationParams {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  size: number;
  /** 总条数 */
  total: number;
}

/** 分页响应基础结构 */
export interface PaginatedResponse<T = any> {
  list: T[];
  current: number;
  size: number;
  total: number;
}
