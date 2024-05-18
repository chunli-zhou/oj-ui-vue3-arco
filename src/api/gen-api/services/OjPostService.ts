import {
  type CancelablePromise,
  type OjPostAddRequest,
  type OjPostQueryRequest,
  OpenAPI,
  type Paging,
  type ResultBoolean,
  type ResultOjPostVo,
  type ResultPageOjPostVo
} from '@/api/gen-api';
import { request as __request } from '../core/request.ts';
import type { OjPostUpdateRequest } from '@/api/gen-api/models/post/OjPostUpdateRequest.ts';
import type { ResultListOjPostSimpleVo } from '@/api/gen-api/models/post/ResultListOjPostSimpleVo.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OjPostService {
  /**
   * 根据主键更新帖子
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static update(
    requestBody: OjPostUpdateRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/oj/post/update',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 保存帖子
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static save(
    requestBody: OjPostAddRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/oj/post/save',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 分页查询帖子
   * @param requestBody
   * @returns ResultPageOjPostVo OK
   * @throws ApiError
   */
  public static page(requestBody: {
    page?: Paging;
    req?: OjPostQueryRequest;
  }): CancelablePromise<ResultPageOjPostVo> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/oj/post/page',
      body: requestBody.req,
      query: {
        ...requestBody.page
      },
      mediaType: 'application/json'
    });
  }

  /**
   * 分页查询当前用户帖子
   * @param requestBody
   * @returns ResultPageOjPostVo OK
   * @throws ApiError
   */
  public static pageSelf(requestBody: {
    page?: Paging;
    req?: OjPostQueryRequest;
  }): CancelablePromise<ResultPageOjPostVo> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/oj/post/pageSelf',
      body: requestBody.req,
      query: {
        ...requestBody.page
      },
      mediaType: 'application/json'
    });
  }

  /**
   * 根据主键获取帖子
   * @param id
   * @returns ResultOjPostVo OK
   * @throws ApiError
   */
  public static getInfo(id: string): CancelablePromise<ResultOjPostVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/oj/post/getInfo/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 根据主键帖子
   * @param id 帖子主键
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static remove(id: number): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/oj/post/remove/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 获取五个热门帖子
   * @returns ResultListOjPostSimpleVo OK
   * @throws ApiError
   */
  public static getFiveHotPost(): CancelablePromise<ResultListOjPostSimpleVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/oj/post/get/fiveHotPost'
    });
  }
}
