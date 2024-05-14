import { request as __request } from '../core/request';
import type { ResultLong } from '@/api/gen-api/models/result/ResultLong.ts';
import {
  type CancelablePromise,
  OpenAPI,
  type ProblemSubmitAddRequest,
  type ResultOjProblemSubmitVo
} from '@/api/gen-api';
import type { ResultListOjProblemSubmitVo } from '../../../../generated';

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
   * 根据用户id获取题目提交信息列表
   * @param id
   * @returns ResultListOjProblemSubmitVo OK
   * @throws ApiError
   */
  public static getInfoByUserId(
    id: number
  ): CancelablePromise<ResultListOjProblemSubmitVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/submit/getInfoByUserId/{id}',
      path: {
        id: id
      }
    });
  }
}
