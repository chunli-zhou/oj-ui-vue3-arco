/**
 * 题目查询请求体
 */
export type OjProblemQueryRequest = {
  /**
   * 标题
   */
  title?: string;
  /**
   * 标签列表
   */
  tags?: Array<string>;
  /**
   * 题目难度，0简单，1中等，2困难
   */
  difficulty?: number;
};
