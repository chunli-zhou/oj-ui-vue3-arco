/**
 * 系统用户简洁响应体
 */
export type SysUserSimpleResponse = {
  /**
   * 用户名
   */
  username?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 头像url
   */
  avatar?: string;
  /**
   * 性别: 0:男; 1:女; 2:保密
   */
  gender?: number;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 手机号
   */
  mobile?: string;
  /**
   * 个人介绍
   */
  introduce?: string;
};
