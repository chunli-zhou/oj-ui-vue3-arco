import type { CancelablePromise, ResultBoolean } from '@/api/gen-api';
import { OpenAPI } from '@/api/gen-api';
import { request as __request } from '../core/request.ts';
import type { PostCommentRequest } from '@/api/gen-api/models/post/PostCommentRequest.ts';
import type { ResultListPostCommentVo } from '@/api/gen-api/models/post/ResultListPostCommentVo.ts';
import { ResultLong } from '@/api/gen-api/models/result/ResultLong.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OjPostCommentService {
  /**
   * 评论帖子
   * @param requestBody
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static save(
    requestBody: PostCommentRequest
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/oj/post/comment/save',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * 获取根节点评论
   * @param postId
   * @returns ResultListPostCommentVo OK
   * @throws ApiError
   */
  public static list(
    postId: string
  ): CancelablePromise<ResultListPostCommentVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/oj/post/comment/list',
      query: {
        postId: postId
      }
    });
  }

  /**
   * 根据父节点id获取帖子子评论
   * @param postId
   * @returns ResultListPostCommentVo OK
   * @throws ApiError
   */
  public static listChildren(
    postId: string
  ): CancelablePromise<ResultListPostCommentVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/oj/post/comment/listChildren',
      query: {
        postId: postId
      }
    });
  }

  /**
   * 根据主键删除帖子评论
   * @param id 帖子评论主键
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static remove(
    id: Record<string, any>
  ): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/oj/post/comment/remove/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 根据帖子id获取评论数量
   * @param postId
   * @returns ResultLong OK
   * @throws ApiError
   */
  public static getNum(postId: string): CancelablePromise<ResultLong> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/oj/post/comment/get/num',
      query: {
        postId: postId
      }
    });
  }
}
