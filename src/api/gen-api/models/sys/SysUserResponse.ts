/**
 * 系统用户响应体
 */
export type SysUserResponse = {
  /**
   * 主键
   */
  id?: number;
  /**
   * 用户名
   */
  username?: string;
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
   * 状态: 0:停用; 1:正常
   */
  status?: number;
  /**
   * 注册时间
   */
  registerTime?: string;
  /**
   * 权限
   */
  role?: string;
};
