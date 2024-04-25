import type { SysRoleRequest } from '@/api/gen-api/models/sys/role/SysRoleRequest.ts';
import {
  type CancelablePromise,
  OpenAPI,
  type Paging,
  type ResultBoolean
} from '@/api/gen-api';
import type { ResultPageSysRoleResponse } from '@/api/gen-api/models/sys/role/ResultPageSysRoleResponse.ts';
import { request as __request } from '../core/request.ts';
import { ResultListSysRoleResponse } from '@/api/gen-api/models/sys/role/ResultListSysRoleResponse.ts';
import { UpdateUserRoleRequest } from '@/api/gen-api/models/sys/role/UpdateUserRoleRequest.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SysRoleService {
  /**
   * 根据主键更新系统角色
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static update(
    requestBody: SysRoleRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sys/role/update',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 查询所有系统角色
   * @returns ResultListSysRoleResponse OK
   * @throws ApiError
   */
  public static list(): CancelablePromise<ResultListSysRoleResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sys/role/list'
    });
  }

  /**
   * 保存
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static save(
    requestBody: SysRoleRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/sys/role/save',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 分页查询
   * @param page 分页信息
   * @param req 查询参数
   * @returns ResultPageSysRoleResponse OK
   * @throws ApiError
   */
  public static page1(
    page: Paging,
    req: SysRoleRequest
  ): CancelablePromise<ResultPageSysRoleResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sys/role/page',
      query: {
        ...page,
        ...req
      }
    });
  }

  /**
   * 根据主键列表删除系统角色
   * @param id 主键
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static remove(id: number): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/sys/role/remove/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 修改系统用户角色
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static updateUserRole(
    requestBody: UpdateUserRoleRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sys/role/update/userRole',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
}
