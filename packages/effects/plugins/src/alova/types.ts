/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2026-01-04 15:52:25
 * @LastEditTime: 2026-01-05 11:58:01
 * @LastEditors: LLiuHuan
 */
import type {
  AlovaGenerics,
  AlovaOptions,
  AlovaRequestAdapter,
  Method,
  ResponseCompleteHandler,
} from 'alova';

/**
 * 请求拦截器方法类型
 */
export type RequestMethod<T extends AlovaGenerics = AlovaGenerics> = (
  method: Method<T>,
) => Promise<void> | void;

/**
 * 自定义Alova配置类型，继承自Alova的配置类型，并删除了部分不需要的配置项
 */
export type CustomAlovaConfig<AG extends AlovaGenerics> = Omit<
  AlovaOptions<AG>,
  'beforeRequest' | 'requestAdapter' | 'responded' | 'statesHook'
> & {
  requestAdapter?: AlovaRequestAdapter<
    AG['RequestConfig'],
    AG['Response'],
    AG['ResponseHeader']
  >;
};

export interface RequestOptions<AG extends AlovaGenerics> {
  /**
   * 请求前的钩子
   *
   * 例如：您可以在此钩子中添加token到请求头中
   *
   * @param method alova Method Instance
   */
  onRequest?: AlovaOptions<AG>['beforeRequest'];
  /**
   * 检测后端响应是否成功
   *
   * @param response alova response
   */
  isBackendSuccess: (response: AG['Response']) => Promise<boolean>;

  /** 配置刷新token的逻辑 */
  tokenRefresher?: {
    /** 刷新token的方法 */
    handler(response: AG['Response'], Method: Method<AG>): Promise<void>;
    /** 检查token是否过期 */
    isExpired(
      response: AG['Response'],
      Method: Method<AG>,
    ): boolean | Promise<boolean>;
  };

  /** 后端请求完成后的钩子 */
  onComplete?: ResponseCompleteHandler<AG>;

  /**
   * 错误处理钩子
   *
   * 例如：您可以在此钩子中显示错误信息
   *
   * @param error
   */
  onError?: (
    error: any,
    response: AG['Response'] | null,
    methodInstance: Method<AG>,
  ) => any | Promise<any>;
  /**
   * 当responseType为json时，转换后端响应数据
   *
   * @param response alova response
   */
  transformBackendResponse: (response: AG['Response']) => any;
}
