import type { PageSysRole } from '@/api/gen-api/models/sys/PageSysRole.ts';
import type { SysRole } from '@/api/gen-api/models/sys/SysRole.ts';
import type { CancelablePromise } from '@/api/gen-api/core/CancelablePromise.ts';
import { OpenAPI } from '@/api/gen-api/core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SysRoleService {
  /**
   * 根据主键更新系统角色
   * @param requestBody
   * @returns boolean OK
   * @throws ApiError
   */
  public static update(requestBody: SysRole): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sys/role/update',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 保存
   * @param requestBody
   * @returns boolean OK
   * @throws ApiError
   */
  public static save(requestBody: SysRole): CancelablePromise<boolean> {
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
   * @returns PageSysRole OK
   * @throws ApiError
   */
  public static page1(page: PageSysRole): CancelablePromise<PageSysRole> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sys/role/page',
      query: {
        page: page
      }
    });
  }

  /**
   * 查询所有系统角色
   * @returns SysRole OK
   * @throws ApiError
   */
  public static list(): CancelablePromise<Array<SysRole>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sys/role/list'
    });
  }

  /**
   * 根据主键获取系统角色详细信息
   * @param id
   * @returns SysRole OK
   * @throws ApiError
   */
  public static getInfo1(id: Record<string, any>): CancelablePromise<SysRole> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sys/role/getInfo/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 根据主键列表删除系统角色
   * @param id 主键
   * @returns boolean OK
   * @throws ApiError
   */
  public static remove(id: Record<string, any>): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/sys/role/remove/{id}',
      path: {
        id: id
      }
    });
  }
}
