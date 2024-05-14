import { request as __request } from '../core/request.ts';
import type { CancelablePromise, Paging, ResultBoolean } from '@/api/gen-api';
import { OpenAPI } from '@/api/gen-api';
import type { ResultPageOjPostVo } from '@/api/gen-api/models/post/ResultPageOjPostVo.ts';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OjFavourPostService {
  /**
   * 收藏帖子
   * @param id
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static favour(id: number): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/oj/post/favour/do/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 取消收藏
   * @param id 帖子id
   * @returns ResultBoolean OK
   * @throws ApiError
   */
  public static cancel(id: number): CancelablePromise<ResultBoolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/oj/post/favour/cancel/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * 根据用户id获取收藏过的帖子
   * @param page 分页信息
   * @param id
   * @returns ResultPageOjPostVo OK
   * @throws ApiError
   */
  public static getFavourPost(
    page: Paging,
    id: number
  ): CancelablePromise<ResultPageOjPostVo> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/oj/post/favour/get/post/{id}',
      path: {
        id: id
      },
      query: {
        page: page
      }
    });
  }
}
