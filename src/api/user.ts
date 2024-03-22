import request from '@/api/interceptor.ts';
import type { Result } from '../../types/axios.d.ts';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest
} from '@/api/gen-api';

export function login(data: LoginRequest) {
  return request.post<Result<LoginResponse>>('/security/login', data);
}

export function register(data: RegisterRequest) {
  return request.post<Result>('/security/register', data);
}

export function logout() {
  return request.get<Result>('/security/logout');
}

export function getUserInfo() {
  return request.get<Result>('/sys/sysUser/info');
}
