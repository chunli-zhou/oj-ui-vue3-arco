import type { SysRole } from './SysRole';

export type PageSysRole = {
  records?: Array<SysRole>;
  pageNumber?: number;
  pageSize?: number;
  totalPage?: number;
  totalRow?: number;
  optimizeCountQuery?: boolean;
};
