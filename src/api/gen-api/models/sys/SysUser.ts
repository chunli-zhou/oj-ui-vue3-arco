/**
 * 系统用户
 */
export type SysUser = {
  /**
   * id
   */
  id?: number;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 密码
   */
  password?: string;
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
   * 个人介绍
   */
  introduce?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 手机号
   */
  mobile?: string;
  /**
   * 状态: 0:停用; 1:正常
   */
  status?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 权限
   */
  role?: string;
};
