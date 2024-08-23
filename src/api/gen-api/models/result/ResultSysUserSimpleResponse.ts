import type { SysUserSimpleResponse } from '@/api/gen-api';

/**
 * 统一返回结果
 */
export type ResultSysUserResponse = {
  code?: number;
  message?: string;
  result?: SysUserSimpleResponse;
};
