import type { OjProblemAddRequest } from '@/api/gen-api/models/problem/OjProblemAddRequest.ts';
import type { OjProblemQueryRequest } from '@/api/gen-api/models/problem/OjProblemQueryRequest.ts';
import type { OjProblemUpdateRequest } from '@/api/gen-api/models/problem/OjProblemUpdateRequest.ts';
import type { Paging } from '@/api/gen-api/models/Paging.ts';
import type { ResultBoolean } from '@/api/gen-api/models/result/ResultBoolean.ts';
import type { ResultOjProblemVo } from '@/api/gen-api/models/result/ResultOjProblemVo.ts';
import type { ResultPageOjProblemVo } from '@/api/gen-api/models/result/ResultPageOjProblemVo.ts';
import type { ResultString } from '@/api/gen-api/models/result/ResultString.ts';
import type { CancelablePromise } from '@/api/gen-api/core/CancelablePromise.ts';
import { OpenAPI } from '@/api/gen-api/core/OpenAPI.ts';
import { request as __request } from '../core/request.ts';
import type { ResultOjProblemNewVo } from '@/api/gen-api/models/result/ResultOjProblemSubmitVo.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OjProblemService {
  /**
   * 根据主键更新题目
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static update(
    requestBody: OjProblemUpdateRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/ojProblem/update',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 保存题目
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static save(
    requestBody: OjProblemAddRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/ojProblem/save',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 分页查询题目
   * @param page 分页信息
   * @param req
   * @returns ResultPageOjProblemVo OK
   * @throws ApiError
   */
  public static page2(
    page: Paging,
    req: OjProblemQueryRequest
  ): CancelablePromise<ResultPageOjProblemVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/ojProblem/page',
      query: {
        ...page,
        ...req
      }
    });
  }

  /**
   * 根据主键获取题目
   * @param id
   * @returns ResultOjProblemVo OK
   * @throws ApiError
   */
  public static getInfo(id: string): CancelablePromise<ResultOjProblemVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/ojProblem/getInfo/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 根据主键删除题目
   * @param id 题目主键
   * @returns ResultString OK
   * @throws ApiError
   */
  public static remove(id: number): CancelablePromise<ResultString> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/ojProblem/remove/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 查询当前用户已经完成的题目
   * @param page
   */
  public static getSubProblemByUserId(
    page: Paging
  ): CancelablePromise<ResultPageOjProblemVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/ojProblem/getSubProblemByUserId/page',
      query: {
        ...page
      }
    });
  }

  /**
   * 根据当前用户已经完成的题目，根据主键id查询用户提交的信息
   * @param id
   * @returns ResultOjProblemVo OK
   * @throws ApiError
   */
  public static getInfoBySubmitId(
    id: number
  ): CancelablePromise<ResultOjProblemNewVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/ojProblem/getInfoBySubmitId/{id}',
      path: {
        id: id
      }
    });
  }
}
