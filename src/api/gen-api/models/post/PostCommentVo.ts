/**
 * 帖子评论
 */
export type PostCommentVo = {
  /**
   * 主键
   */
  id?: string;
  /**
   * 父id
   */
  parentId?: string;
  /**
   * 题目id
   */
  postId?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 作者id
   */
  authorId?: string;
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
  children?: Array<PostCommentVo>;
  /**
   * 是否展开
   */
  expandedFlag?: boolean;
  /**
   * 是否展开回复框-默认false，不展开
   */
  replyFlag?: false;
};
