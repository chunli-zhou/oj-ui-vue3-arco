/**
 * 系统用户 修改请求体
 */
export type SysUserUpdateRequest = {
  /**
   * id
   */
  id: number;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 手机号
   */
  mobile?: string;
  /**
   * 个人简介
   */
  introduce?: string;
  /**
   * 头像url
   */
  avatar?: string;
};
