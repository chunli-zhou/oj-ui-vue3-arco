import type { LoginResponse } from '@/api/gen-api';

/**
 * 统一返回结果
 */
export type ResultLoginResponse = {
  code?: number;
  message?: string;
  result?: LoginResponse;
};
