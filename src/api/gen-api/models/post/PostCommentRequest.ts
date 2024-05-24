/**
 * 帖子评论
 */
export type PostCommentRequest = {
  /**
   * 主键
   */
  id?: string;
  /**
   * 父id
   */
  parentId?: string;
  /**
   * 帖子id
   */
  postId: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 作者id
   */
  authorId?: string;
  /**
   * 创建时间
   */
  createTime?: string;
};
