import type { OjProblemVo } from '@/api/gen-api/models/problem/OjProblemVo';

/**
 * 统一返回结果
 */
export type ResultOjProblemVo = {
  code?: number;
  message?: string;
  result?: OjProblemVo;
};
