import type { Paging } from '@/api/gen-api/models/Paging.ts';
import type { ResultBoolean } from '@/api/gen-api/models/result/ResultBoolean.ts';
import type { ResultPageSysUserResponse } from '@/api/gen-api/models/result/ResultPageSysUserResponse.ts';
import type { ResultString } from '@/api/gen-api/models/result/ResultString.ts';
import type { ResultSysUser } from '@/api/gen-api/models/result/ResultSysUser.ts';
import type { ResultSysUserResponse } from '@/api/gen-api/models/result/ResultSysUserResponse.ts';
import type { SysUserRequest } from '@/api/gen-api/models/sys/SysUserRequest.ts';
import type { CancelablePromise } from '@/api/gen-api/core/CancelablePromise.ts';
import { OpenAPI } from '@/api/gen-api/core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';
import type { SysUserUpdateRequest } from '@/api/gen-api/models/sys/SysUserUpdateRequest.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SysUserService {
  /**
   * 修改用户信息--开放给个人用户使用
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static updateUserInfo(
    requestBody: SysUserUpdateRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sys/sysUser/update',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 启用用户
   * @param id 主键
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static enable(id: string): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sys/sysUser/enable/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 禁用用户
   * @param id 主键
   * @returns ResultString OK
   * @throws ApiError
   */
  public static disable(id: string): CancelablePromise<ResultString> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sys/sysUser/disable/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 分页查询
   * @param page 分页条件
   * @param request 查询条件
   * @returns ResultPageSysUserResponse OK
   * @throws ApiError
   */
  public static page(
    page: Paging,
    request: SysUserRequest
  ): CancelablePromise<ResultPageSysUserResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sys/sysUser/page',
      query: {
        page: page,
        request: request
      }
    });
  }

  /**
   * 获取已登录的当前用户信息
   * @returns ResultSysUser OK
   * @throws ApiError
   */
  public static info(): CancelablePromise<ResultSysUser> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sys/sysUser/info'
    });
  }

  /**
   * 根据主键获取系统用户详细信息
   * @param id
   * @returns ResultSysUserResponse OK
   * @throws ApiError
   */
  public static getInfo(): CancelablePromise<ResultSysUserResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sys/sysUser/getInfo'
    });
  }
}
