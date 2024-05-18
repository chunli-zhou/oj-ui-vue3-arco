export type OjProblemSubmitQueryRequest = {
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
   * 判题状态（0 - 待判题、1 - 判题中、2 - 成功、3 - 失败）
   */
  status?: number;
  /**
   * 题目 id
   */
  questionId?: number;
};
