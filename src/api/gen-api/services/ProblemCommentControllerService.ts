import {
  type CancelablePromise,
  OpenAPI,
  type ProblemCommentRequest,
  type ResultBoolean,
  type ResultListProblemCommentVo
} from '@/api/gen-api';
import { request as __request } from '../core/request.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ProblemCommentControllerService {
  /**
   * 评论题目
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static save(
    requestBody: ProblemCommentRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/problem/comment/save',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 获取根节点评论
   * @param problemId
   * @returns ResultListProblemCommentVo OK
   * @throws ApiError
   */
  public static list(
    problemId: number
  ): CancelablePromise<ResultListProblemCommentVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/problem/comment/list',
      query: {
        problemId: problemId
      }
    });
  }

  /**
   * 根据父节点id获取题目子评论
   * @param commentId
   * @returns ResultListProblemCommentVo OK
   * @throws ApiError
   */
  public static listChild(
    commentId: number
  ): CancelablePromise<ResultListProblemCommentVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/problem/comment/listChildren',
      query: {
        problemId: commentId
      }
    });
  }

  /**
   * 根据主键删除题目评论
   * @param id 题目评论主键
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static remove1(
    id: Record<string, any>
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/problem/comment/remove/{id}',
      path: {
        id: id
      }
    });
  }
}
