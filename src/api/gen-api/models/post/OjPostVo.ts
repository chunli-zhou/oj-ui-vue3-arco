/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 帖子
 */
export type OjPostVo = {
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
   * 点赞数
   */
  thumbNum?: number;
  /**
   * 收藏数
   */
  favourNum?: number;
  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 观看数
   */
  viewNum?: number;

  /**
   * 作者Id
   */
  creator?: number;

  /**
   * 作者
   */
  creatorName?: string;

  /**
   * 作者简介
   */
  introduce?: string;

  /**
   * 作者头像
   */
  avatar?: string;
};
