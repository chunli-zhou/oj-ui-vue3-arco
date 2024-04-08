import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
/**
 * 题目主键
 */
export type OjProblemUpdateRequest = {
  /**
   * 标题
   */
  title?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 标签列表
   */
  tags?: Array<string>;
  /**
   * 题目难度，0简单，1中等，2困难
   */
  difficulty?: number;
  /**
   * 题目答案
   */
  answer?: string;
  /**
   * 判题用例
   */
  judgeCase?: Array<JudgeCase>;
  judgeConfig?: JudgeConfig;
  /**
   * 主键
   */
  id: string;
};
