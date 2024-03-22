/**
 * 统一返回结果
 */
export type Result<T = any> = {
  code?: number;
  message?: string;
  result?: T;
};
