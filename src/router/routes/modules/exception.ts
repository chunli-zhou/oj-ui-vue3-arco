import type { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';

const EXCEPTION: AppRouteRecordRaw = {
  path: '/exception',
  name: 'Exception',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '异常页',
    icon: 'icon-exclamation-circle',
    requiresAuth: true,
    order: 6,
    hideInMenu: true,
    noAffix: true
  },
  children: [
    {
      path: '403',
      name: '403',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        locale: '403',
        hideInMenu: true
      }
    },
    {
      path: '404',
      name: '404',
      component: () => import('@/views/exception/404/index.vue'),
      meta: {
        locale: '404',
        hideInMenu: true
      }
    },
    {
      path: '500',
      name: '500',
      component: () => import('@/views/exception/500/index.vue'),
      meta: {
        locale: '500',
        hideInMenu: true
      }
    }
  ]
};

export default EXCEPTION;
