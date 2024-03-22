import type { PageSysUserResponse } from '../sys/PageSysUserResponse';

/**
 * 统一返回结果
 */
export type ResultPageSysUserResponse = {
  code?: number;
  message?: string;
  result?: PageSysUserResponse;
};
