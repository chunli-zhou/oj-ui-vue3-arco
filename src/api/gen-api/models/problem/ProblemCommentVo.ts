/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 题目评论
 */
export type ProblemCommentVo = {
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
  problemId?: number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 作者id
   */
  authorId?: number;
  /**
   * 用户头像
   */
  authorAvatar?: string;
  /**
   * 用户昵称
   */
  authorName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 子评论
   */
  children?: Array<ProblemCommentVo>;
  /**
   * 是否展开-默认false，不展开
   */
  expandedFlag?: boolean;
};
