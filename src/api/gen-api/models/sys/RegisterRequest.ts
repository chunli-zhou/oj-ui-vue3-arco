/**
 * 注册表单
 */
export type RegisterRequest = {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 确认密码
   */
  checkPassword: string;
  /**
   * 手机号
   */
  mobile: string;
};
