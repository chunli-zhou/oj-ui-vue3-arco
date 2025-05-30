import type { JudgeInfo } from '@/api/gen-api/models/problem/JudgeInfo.ts';

/**
 * 题目响应体-分页查询
 */
export type ResultOjProblemNewSubmitVo = {
  /**
   * id
   */
  id?: number;

  /**
   * 标题
   */
  title?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 标签列表（json 数组）
   */
  tags?: Array<string>;
  /**
   * 题目难度，简单，中等，困难
   */
  difficulty?: number;
  /**
   * 编程语言
   */
  language?: string;
  /**
   * 用户代码
   */
  code?: string;
  /**
   * 代码执行状态
   */
  codeStatus?: string;
  /**
   * 题目实际输出
   */
  judgeInfo?: JudgeInfo;

  /**
   *  状态
   *
   */
  status?: string;

  /**
   *  题目id
   */
  questionId?: number;

  /**
   *  用户id
   */
  userId?: number;
};
