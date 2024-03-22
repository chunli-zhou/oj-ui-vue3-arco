import type { OjProblemVo } from './OjProblemVo';
export type PageOjProblemVo = {
  records?: Array<OjProblemVo>;
  pageNumber?: number;
  pageSize?: number;
  totalPage?: number;
  totalRow?: number;
  optimizeCountQuery?: boolean;
};
