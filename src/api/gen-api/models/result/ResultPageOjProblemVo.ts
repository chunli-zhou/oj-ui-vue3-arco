import type { PageOjProblemVo } from '../problem/PageOjProblemVo';

/**
 * 统一返回结果
 */
export type ResultPageOjProblemVo = {
  code?: number;
  message?: string;
  result?: PageOjProblemVo;
};
