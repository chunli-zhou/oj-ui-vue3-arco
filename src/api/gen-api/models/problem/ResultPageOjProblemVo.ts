import type { PageOjProblemVo } from '@/api/gen-api/models/problem/PageOjProblemVo.ts';

/**
 * 统一返回结果
 */
export type ResultPageOjProblemVo = {
  code?: number;
  message?: string;
  result?: PageOjProblemVo;
};
