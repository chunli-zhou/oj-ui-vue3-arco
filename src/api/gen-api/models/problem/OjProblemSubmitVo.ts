/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 题目
 */
export type OjProblemSubmitVo = {
  /**
   * id
   */
  id?: number;
  /**
   * 编程语言
   */
  language?: string;
  /**
   * 用户代码
   */
  code?: string;
  /**
   * 代码执行状态（详见ProblemJudgeResultEnum）
   */
  codeStatus?: number;
  /**
   * 题目实际输出（json）
   */
  output?: string;
  /**
   * 判题信息（json 对象）
   */
  judgeInfo?: string;
  /**
   * 判题状态（0 - 待判题、1 - 判题中、2 - 成功、3 - 失败）
   */
  status?: number;
  /**
   * 题目 id
   */
  questionId?: number;
};
