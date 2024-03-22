import type { JudgeConfig } from './JudgeConfig';

/**
 * 题目响应体
 */
export type OjProblemVo = {
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
  difficulty?: string;
  /**
   * 题目提交数
   */
  submitNum?: number;
  /**
   * 题目通过数
   */
  acceptedNum?: number;
  judgeConfig?: JudgeConfig;
  /**
   * 点赞数
   */
  thumbNum?: number;
  /**
   * 收藏数
   */
  favourNum?: number;
};
