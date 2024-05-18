import type { CancelablePromise, Paging, ResultBoolean } from '@/api/gen-api';
import { OpenAPI } from '@/api/gen-api';
import type { ResultPageOjPostVo } from '@/api/gen-api/models/post/ResultPageOjPostVo.ts';
import { request as __request } from '../core/request.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OjThumbPostService {
  /**
   * 点赞帖子
   * @param id
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static thumb(id: number): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/oj/post/thumb/do/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 取消点赞
   * @param id 帖子id
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static cancel(id: number): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/oj/post/thumb/cancel/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 根据用户id获取点赞过的帖子
   * @param page 分页信息
   * @param id
   * @returns ResultPageOjPostVo OK
   * @throws ApiError
   */
  public static getThumbPost(
    page: Paging,
    id: string
  ): CancelablePromise<ResultPageOjPostVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/oj/post/thumb/get/post/{id}',
      path: {
        id: id
      },
      query: {
        page: page
      }
    });
  }
}
