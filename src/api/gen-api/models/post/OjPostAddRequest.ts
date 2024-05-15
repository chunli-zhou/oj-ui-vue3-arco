/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 帖子
 */
export type OjPostAddRequest = {
  /**
   * 标题
   */
  title: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 标签列表（json 数组）
   */
  tags: Array<string>;
  /**
   * 分区
   */
  zone: string;
};
