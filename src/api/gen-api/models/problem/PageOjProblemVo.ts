import type { OjProblemPageVo } from '@/api/gen-api/models/problem/OjProblemPageVo.ts';

export type PageOjProblemVo = {
  records?: Array<OjProblemPageVo>;
  pageNumber?: number;
  pageSize?: number;
  totalPage?: number;
  totalRow?: number;
  optimizeCountQuery?: boolean;
};
