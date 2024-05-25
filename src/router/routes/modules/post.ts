import type { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';

const POST: AppRouteRecordRaw = {
  path: '/post',
  name: 'post',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '帖子',
    icon: 'icon-file',
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
        roles: ['*'],
        hideInMenu: true
      }
    },
    {
      path: 'info',
      name: 'PostInfo',
      component: () => import('@/views/post/info/index.vue'),
      meta: {
        locale: '帖子详情',
        hideInMenu: true
      }
    },
    {
      path: 'control',
      name: 'PostControl',
      component: () => import('@/views/post/control/index.vue'),
      meta: {
        locale: '帖子管理',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'edit',
      name: 'EditPost',
      component: () => import('@/views/post/control/components/edit-post.vue'),
      meta: {
        locale: '编辑帖子',
        requiresAuth: true,
        hideInMenu: true,
        roles: ['*']
      }
    }
  ]
};

export default POST;
