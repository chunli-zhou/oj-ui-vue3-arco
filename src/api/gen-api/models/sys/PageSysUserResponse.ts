import type { SysUserResponse } from './SysUserResponse';

export type PageSysUserResponse = {
  records?: Array<SysUserResponse>;
  pageNumber?: number;
  pageSize?: number;
  totalPage?: number;
  totalRow?: number;
  optimizeCountQuery?: boolean;
};
