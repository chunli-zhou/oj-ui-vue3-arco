import request from '@/api/interceptor.ts';
import type { Result } from '../../types/axios.d.ts';

export interface LoginData {
  username: string;
  password: string;
  captcha: string;
  uuid: string;
}

export interface LoginResponse {
  token: string;
  id: string;
}

export function login(data: LoginData) {
  return request.post<Result<LoginResponse>>('/security/login', data);
}

export function logout() {
  return request.get<Result>('/security/logout');
}

export function getUserInfo() {
  return request.get<Result>('/sys/sysUser/info');
}
