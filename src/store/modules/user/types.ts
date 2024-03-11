export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserInfo {
  id?: string;
  name?: string;
  nickName?: string;
  username?: string;
  avatar?: string;
  gender?: string;
  email?: string;
  mobile?: string;
  role: RoleType;
  createTime?: string;
}
