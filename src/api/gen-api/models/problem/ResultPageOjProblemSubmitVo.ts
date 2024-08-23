import type { PageOjProblemSubmitVo } from '@/api/gen-api/models/problem/PageOjProblemSubmitVo.ts';

/**
 * 统一返回结果
 */
export type ResultPageOjProblemSubmitVo = {
  code?: number;
  message?: string;
  result?: PageOjProblemSubmitVo;
};
