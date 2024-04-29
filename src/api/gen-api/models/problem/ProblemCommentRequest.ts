/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 题目评论
 */
export type ProblemCommentRequest = {
  /**
   * 主键
   */
  id?: number;
  /**
   * 标签列表（json 数组）
   */
  tags?: string;
  /**
   * 父id
   */
  parentId?: number;
  /**
   * 题目id
   */
  problemId: number;
  /**
   * 内容
   */
  content: string;
};
