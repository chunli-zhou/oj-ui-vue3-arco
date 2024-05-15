import type { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';
import { AUTH_CONST } from '@/router/AuthConst.ts';

const POST: AppRouteRecordRaw = {
  path: '/post',
  name: 'post',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '帖子',
    icon: 'icon-file',
    requiresAuth: true,
    roles: ['*'],
    order: 5
  },
  children: [
    {
      path: 'view',
      name: 'PostView',
      component: () => import('@/views/post/view/index.vue'),
      meta: {
        locale: '首页',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'create',
      name: 'CreatePost',
      component: () => import('@/views/post/create/index.vue'),
      meta: {
        locale: '发帖',
        requiresAuth: true,
        hideInMenu: true,
        roles: ['*']
      }
    },
    {
      path: 'info',
      name: 'PostInfo',
      component: () => import('@/views/post/info/index.vue'),
      meta: {
        locale: '帖子详情',
        requiresAuth: true,
        hideInMenu: true,
        roles: ['*']
      }
    },
    {
      path: 'control',
      name: 'PostControl',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        locale: '帖子管理',
        requiresAuth: true,
        roles: [AUTH_CONST.SUPER_ADMIN, AUTH_CONST.ADMIN]
      }
    }
  ]
};

export default POST;
