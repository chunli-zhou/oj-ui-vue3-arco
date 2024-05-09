/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import {request as __request} from '../core/request';
import {ResultLong} from '@/api/gen-api/models/result/ResultLong.ts';
import {type CancelablePromise, OpenAPI, ProblemSubmitAddRequest, ResultOjProblemSubmitVo} from '@/api/gen-api';

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
}
