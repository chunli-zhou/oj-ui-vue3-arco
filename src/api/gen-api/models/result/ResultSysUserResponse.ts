import type { SysUserResponse } from '../sys/SysUserResponse';

/**
 * 统一返回结果
 */
export type ResultSysUserResponse = {
  code?: number;
  message?: string;
  result?: SysUserResponse;
};
