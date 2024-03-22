import type { LoginRequest } from '@/api/gen-api/models/sys/LoginRequest.ts';
import type { RegisterRequest } from '@/api/gen-api/models/sys/RegisterRequest.ts';
import type { ResultLoginResponse } from '@/api/gen-api/models/result/ResultLoginResponse.ts';
import type { ResultString } from '@/api/gen-api/models/result/ResultString.ts';
import type { CancelablePromise } from '@/api/gen-api/core/CancelablePromise.ts';
import { OpenAPI } from '@/api/gen-api/core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class LoginService {
  /**
   * 注册
   * @param requestBody
   * @returns ResultString OK
   * @throws ApiError
   */
  public static register(
    requestBody: RegisterRequest
  ): CancelablePromise<ResultString> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/security/register',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 登录
   * @param requestBody
   * @returns ResultLoginResponse OK
   * @throws ApiError
   */
  public static login(
    requestBody: LoginRequest
  ): CancelablePromise<ResultLoginResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/security/login',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 退出登录
   * @returns ResultString OK
   * @throws ApiError
   */
  public static logout(): CancelablePromise<ResultString> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/security/logout'
    });
  }

  /**
   * 获取验证码
   * 获取验证码
   * @param uuid
   * @returns binary 成功返回验证码图片
   * @throws ApiError
   */
  public static captcha(uuid: string): CancelablePromise<Blob> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/security/captcha',
      query: {
        uuid: uuid
      }
    });
  }
}
