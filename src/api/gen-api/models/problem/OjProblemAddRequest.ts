import type { JudgeCase, JudgeConfig } from '@/api/gen-api';

//添加题目
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
  tags?: string[];

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
  judgeCase?: JudgeCase[];

  /**
   * 判题配置
   */
  judgeConfig?: JudgeConfig;
};
