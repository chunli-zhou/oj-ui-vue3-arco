import type {SysRoleResponse} from '@/api/gen-api';

/**
 * 统一返回结果
 */
export type ResultListSysRoleResponse = {
  code?: number;
  message?: string;
  result?: Array<SysRoleResponse>;
};
