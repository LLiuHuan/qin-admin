/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-31 13:57:09
 * @LastEditTime: 2026-01-08 09:55:36
 * @LastEditors: LLiuHuan
 */

import type {
  AlovaGenerics,
  Method,
  RespondedAlovaGenerics,
} from '@qin/plugins/alova';

import type { PaginatedResponse } from '#/api/types';
import type { ColumnOption } from '#/components/table/types';

import { computed, reactive } from 'vue';

import { usePagination } from '@qin/plugins/alova';

import { useTableColumns } from './useTableColumns';

// 类型推导工具类型
// type InferMethodResponse<M> = M extends Method<infer R> ? R : never;
type TApiFn<
  TParams = any, // 函数入参类型
  TResponse = any, // Method 中的响应类型
> = (
  params: TParams,
) => Method<RespondedAlovaGenerics<AlovaGenerics, TResponse, unknown>>;
type InferApiParams<T> = T extends (params: infer P) => any ? P : never;
type InferApiResponse<T> = T extends (params: any) => infer M
  ? M extends Method<RespondedAlovaGenerics<AlovaGenerics, infer R, unknown>>
    ? R
    : never
  : never;
type InferRecordType<T> = T extends PaginatedResponse<infer U> ? U : never;

export interface UseTableConfig<
  TApiFn extends (
    params: any,
  ) => Method<RespondedAlovaGenerics<AlovaGenerics, any, unknown>> = (
    params: any,
  ) => Method<RespondedAlovaGenerics<AlovaGenerics, any, unknown>>,
  TRecord = InferRecordType<InferApiResponse<TApiFn>>,
  TParams = InferApiParams<TApiFn>,
  // TResponse = InferApiResponse<TApiFn>,
> {
  /** API 请求函数 */
  apiFn: TApiFn;
  /** 默认请求参数 */
  apiParams?: Partial<TParams>;
  /** 是否开启追加模式 */
  append?: boolean;
  /** 列配置工厂函数 */
  columnsFactory?: () => ColumnOption<TRecord>[];
  /** 数据转换函数 */
  dataFn?: (response: any) => any[];
  /** 列表数据操作防抖参数 */
  debounce?: number | number[];
  /** 排除 apiParams 中的属性 */
  excludeParams?: string[];
  /** 是否立即加载数据 */
  immediate?: boolean;
  /** 自定义分页字段映射 */
  paginationKey?: {
    /** 当前页码字段名，默认为 'current' */
    current?: string;
    /** 数据字段，默认为 'data' */
    data?: string;
    /** 每页条数字段名，默认为 'size' */
    size?: string;
    /** 总数字段名，默认为 'total' */
    total?: string;
  };
  responseKey?: {
    /** 数据字段名，默认为 'data' */
    data?: string;
    /** 总数字段名，默认为 'total' */
    total?: string;
  };
  /** 预加载下一页数据 */
  preloadNextPage?: boolean;
  /** 预加载上一页数据 */
  preloadPreviousPage?: boolean;
  /** 数据总条数函数 */
  totalFn?: (response: any) => number;
  /** 状态监听触发请求 */
  watchingStates?: any[];

  // 生命周期钩子
  hooks?: {
    /** insert回调函数，调用操作函数insert时触发 */
    onInsert?: (row: any, position?: unknown) => Promise<void>;
    /** remove回调函数，调用操作函数remove时触发 */
    onRemove?: (row: any) => Promise<void>;
    /** replace回调函数，调用操作函数replace时触发 */
    onReplace?: (row: any, position?: unknown) => Promise<void>;
  };
}

export function useTable(config: UseTableConfig) {
  type TRecord = InferRecordType<InferApiResponse<TApiFn>>;
  type TParams = InferApiParams<TApiFn>;

  // 解构配置并设置默认值
  const {
    apiFn,
    apiParams = {} as Partial<TParams>,
    excludeParams = [],
    columnsFactory,
    paginationKey,
    responseKey,
    hooks = {},
    dataFn,
    totalFn,

    // 参数
    immediate = true,
    append = false,
    preloadNextPage = true,
    preloadPreviousPage = true,
    watchingStates = [],
    debounce,
  } = config;

  const { onInsert, onRemove, onReplace } = hooks;

  // 初始化工具
  const pageKey = paginationKey?.current || 'current';
  const sizeKey = paginationKey?.size || 'size';
  const dataKey = responseKey?.data || 'data';
  const totalKey = responseKey?.total || 'total';

  const searchParams = reactive(
    Object.assign(
      {
        [pageKey]: 1,
        [sizeKey]: 10,
      },
      apiParams || {},
    ) as TParams,
  );

  const requestParams = (page: number, pageSize: number, params?: TParams) => {
    let requestParams = Object.assign(
      {},
      searchParams,
      {
        [pageKey]: page,
        [sizeKey]: pageSize,
      },
      params || {},
    ) as TParams;

    // 剔除不需要的参数
    if (excludeParams.length > 0) {
      const filteredParams = {} as TParams;
      for (const key in requestParams) {
        if (!excludeParams.includes(key)) {
          (filteredParams as any)[key] = (requestParams as any)[key];
        }
      }
      requestParams = filteredParams;
    }
    return requestParams;
  };

  // 列配置
  const columnConfig = columnsFactory
    ? useTableColumns<TRecord>(columnsFactory)
    : null;
  const columns = columnConfig?.columns;
  const columnChecks = columnConfig?.columnChecks;

  const {
    // 加载状态
    loading,

    // 列表数据
    data,

    // 是否为最后一页
    // 下拉加载时可通过此参数判断是否还需要加载
    isLastPage,

    // 当前页码，改变此页码将自动触发请求
    page,

    // 每页数据条数
    pageSize,

    // 分页页数
    pageCount,

    // 总数据量
    total,

    // [3.3.0+]
    // action状态，当对应的action触发时才会更改此状态，具体的值如下：
    // empty string: 默认状态
    // loading: 列表数据请求中
    // removing: 列表数据删除中
    // inserting: 列表数据插入中
    // replacing: 列表数据替换中
    status,

    // [3.3.0+]
    // 移除列表项
    remove,

    // [3.3.0+]
    // 正在移除的row index数组，用于控制对应列的删除按钮状态
    removing,

    // [3.3.0+]
    // 替换列表项
    replace,

    // [3.3.0+]
    // 正在替换的row index，用于控制对应列的替换按钮状态
    replacing,

    /**
     * 刷新指定页码数据，此函数将忽略缓存强制发送请求
     * 如果未传入页码则会刷新当前页
     * 如果传入一个列表项，将会刷新此列表项所在页
     * @param pageOrItemPage 刷新的页码或列表项
     * @returns [v3.1.0+]包含响应数据的promise
     */
    refresh,

    /**
     * 从第一页开始重新加载列表，并清空缓存
     * @returns [v3.1.0+]promise实例，表示是否重置成功
     */
    reload,

    /**
     * 插入一条数据，如果未传入 index，将默认插入到最前面，如果传入一个列表项，将插入到这个列表项的后面，如果列表项未在列表数据中将会抛出错误
     * @param item 插入项
     * @param indexOrItem 插入位置（索引）或列表项，默认为 0
     */
    insert,

    /**
     * 更新状态数据，与 alova 的 use hook 用法相同，但在更新 data 字段时是更新列表数据
     */
    update,

    /**
     * 发送请求函数
     */
    send,

    /**
     * 中止请求函数
     */
    abort,

    onFetchSuccess,
    onFetchComplete,
    onFetchError,
    onSuccess,
    onComplete,
    onError,
  } = usePagination((page, pageSize) => apiFn(requestParams(page, pageSize)), {
    // 请求前的初始数据（接口返回的数据格式）
    initialData: {
      [totalKey]: 0,
      [dataKey]: [],
    },
    initialPage:
      ((searchParams as Record<string, unknown>)[pageKey] as number) || 1, // 初始页码，默认为1
    initialPageSize:
      ((searchParams as Record<string, unknown>)[sizeKey] as number) || 10, // 初始每页数据条数，默认为10
    total: totalFn || ((response) => response[totalKey]),
    data: dataFn || ((response) => response[dataKey]),
    actions: {
      insert: onInsert,
      remove: onRemove,
      replace: onReplace,
    },
    debounce,
    watchingStates,
    preloadNextPage,
    preloadPreviousPage,
    append,
    immediate,
  });

  // 整合分页配置
  const pagination = reactive({
    current: page,
    size: pageSize,
    total,
  });

  // 翻到上一页，page值更改后将自动发送请求
  const handlePrevPage = () => {
    page.value--;
  };

  // 翻到下一页，page值更改后将自动发送请求
  const handleNextPage = () => {
    page.value++;
  };

  const handleCurrentChange = (newCurrent: number) => {
    if (newCurrent <= 0) return;

    if (page.value === newCurrent) {
      return;
    }

    page.value = newCurrent;
  };

  // 更改每页数量，pageSize值更改后将自动发送请求
  const handleSizeChange = (newSize: number) => {
    pageSize.value = newSize;
  };

  // 是否有数据
  const hasData = computed(() => data.value.length > 0);

  // 重置搜索参数
  const resetSearchParams = async () => {
    const paramsRecord = searchParams as Record<string, unknown>;
    Object.assign(searchParams, apiParams, {
      [pageKey]: 1,
      [sizeKey]: (paramsRecord[sizeKey] as number) || 10,
    });
    await reload();
  };

  return {
    // 搜索相关
    /** 搜索参数 */
    searchParams,
    /** 重置搜索参数 */
    resetSearchParams,

    // 数据相关
    /** 表格数据 */
    data,
    /** 加载状态 */
    loading,
    /** 是否为最后一页 */
    isLastPage,
    /** 当前页码 */
    page,
    /** 每页数据条数 */
    pageSize,
    /** 分页页数 */
    pageCount,
    /** 总数据量 */
    total,
    /**
     * action状态，当对应的action触发时才会更改此状态，具体的值如下：
     * empty string: 默认状态
     * loading: 列表数据请求中
     * removing: 列表数据删除中
     * inserting: 列表数据插入中
     * replacing: 列表数据替换中
     */
    status,
    /**
     * 移除列表项
     */
    remove,
    /** 正在移除的row index数组，用于控制对应列的删除按钮状态 */
    removing,
    /** 替换列表项 */
    replace,
    /** 正在替换的row index，用于控制对应列的替换按钮状态 */
    replacing,
    /** 刷新指定页码数据，此函数将忽略缓存强制发送请求，append 模式下可传入列表项表示刷新此列表项所在的页数 */
    refresh,
    /** 插入一条数据，如果未传入 index，将默认插入到最前面，如果传入一个列表项，将插入到这个列表项的后面，如果列表项未在列表数据中将会抛出错误 */
    insert,
    /** 更新状态数据，与 alova 的 use hook 用法相同，但在更新 data 字段时是更新列表数据 */
    update,
    /** 清空数据，并重新请求第一页数据 */
    reload,
    /** 发送请求函数 */
    send,
    /** 中止请求函数 */
    abort,

    onFetchSuccess,
    onFetchComplete,
    onFetchError,
    onSuccess,
    onComplete,
    onError,

    /**
     * 分页信息
     */
    pagination,

    /**
     * 是否有数据
     */
    hasData,

    // 翻页相关
    /**
     * 翻到上一页，page值更改后将自动发送请求
     */
    handlePrevPage,
    /**
     * 翻到下一页，page值更改后将自动发送请求
     */
    handleNextPage,
    /**
     * 改变当前页码，page值更改后将自动发送请求
     */
    handleCurrentChange,
    /**
     * 改变每页数量，pageSize值更改后将自动发送请求
     */
    handleSizeChange,

    // 列配置 (如果提供了 columnsFactory)
    ...(columnConfig && {
      /** 表格列配置 */
      columns,
      /** 列显示控制 */
      columnChecks,
      /** 新增列 */
      addColumn: columnConfig.addColumn,
      /** 删除列 */
      removeColumn: columnConfig.removeColumn,
      /** 切换列显示状态 */
      toggleColumn: columnConfig.toggleColumn,
      /** 更新列配置 */
      updateColumn: columnConfig.updateColumn,
      /** 批量更新列配置 */
      batchUpdateColumns: columnConfig.batchUpdateColumns,
      /** 重新排序列 */
      reorderColumns: columnConfig.reorderColumns,
      /** 获取指定列配置 */
      getColumnConfig: columnConfig.getColumnConfig,
      /** 获取所有列配置 */
      getAllColumns: columnConfig.getAllColumns,
      /** 重置所有列配置到默认状态 */
      resetColumns: columnConfig.resetColumns,
    }),
  };
}
