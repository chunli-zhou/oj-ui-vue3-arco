/**
 * 查询帖子参数
 */
export type OjPostQueryRequest = {
  /**
   * 用户id
   */
  userId?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 分区
   */
  zone?: string;
  /**
   * 标签列表（json 数组）
   */
  tags?: Array<string>;
};
