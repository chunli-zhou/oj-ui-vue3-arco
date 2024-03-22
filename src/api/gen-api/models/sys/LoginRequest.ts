/**
 * 登录表单
 */
export type LoginRequest = {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 验证码
   */
  captcha: string;
  /**
   * uuid
   */
  uuid: string;
};
