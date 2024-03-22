import type { SysUser } from '../sys/SysUser';

/**
 * 统一返回结果
 */
export type ResultSysUser = {
  code?: number;
  message?: string;
  result?: SysUser;
};
