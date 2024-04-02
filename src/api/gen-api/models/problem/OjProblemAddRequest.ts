import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
/**
 * 题目添加请求体
 */
export type OjProblemAddRequest = {
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
   * 题目答案语言
   */
  ansLanguage?: string;
  /**
   * 题目答案
   */
  answer?: string;
  /**
   * 判题用例
   */
  judgeCase?: Array<JudgeCase>;
  judgeConfig?: JudgeConfig;
};
