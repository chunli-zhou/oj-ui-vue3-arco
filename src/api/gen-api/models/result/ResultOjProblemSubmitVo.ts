import type { ResultOjProblemNewSubmitVo } from '@/api/gen-api/models/problem/ResultOjProblemNewSubmitVo.ts';

/**
 * 统一返回结果
 */
export type ResultOjProblemNewVo = {
  code?: number;
  message?: string;
  result?: ResultOjProblemNewSubmitVo;
};
