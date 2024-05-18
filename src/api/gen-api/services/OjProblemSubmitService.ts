import { request as __request } from '../core/request';
import type { ResultLong } from '@/api/gen-api/models/result/ResultLong.ts';
import {
  type CancelablePromise,
  OpenAPI,
  type Paging,
  type ProblemSubmitAddRequest,
  type ResultOjProblemSubmitVo
} from '@/api/gen-api';
import type { OjProblemSubmitQueryRequest } from '@/api/gen-api/models/problem/OjProblemSubmitQueryRequest.ts';
import type { ResultPageOjProblemSubmitVo } from '@/api/gen-api/models/problem/ResultPageOjProblemSubmitVo.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OjProblemSubmitService {
  /**
   * 提交题目
   * @param requestBody
   * @returns ResultLong OK
   * @throws ApiError
   */
  public static doQuestionSubmit(
    requestBody: ProblemSubmitAddRequest
  ): CancelablePromise<ResultLong> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/submit/',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 根据主键获取题目提交信息
   * @param id
   * @returns ResultOjProblemSubmitVo OK
   * @throws ApiError
   */
  public static getInfo(
    id: number
  ): CancelablePromise<ResultOjProblemSubmitVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/submit/getInfo/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 根据用户id分页查询题目提交信息列表
   * @param id
   * @param paging
   * @param requestBody
   * @returns ResultPageOjProblemSubmitVo OK
   * @throws ApiError
   */
  public static pageInfoByUserId(
    id: number,
    paging: Paging,
    requestBody: OjProblemSubmitQueryRequest
  ): CancelablePromise<ResultPageOjProblemSubmitVo> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/submit/pageInfoByUserId/{id}',
      path: {
        id: id
      },
      query: {
        paging: paging
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
}
