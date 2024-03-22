import type { AppRouteRecordRaw } from '@/router/routes/types.ts';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';

const PROBLEM: AppRouteRecordRaw = {
  path: '/problem',
  name: 'Problem',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '题库',
    icon: 'icon-select-all',
    requiresAuth: true,
    roles: ['*'],
    order: 4
  },
  children: [
    {
      path: 'manage',
      name: 'Manage',
      component: () => import('@/views/problem/components/problem-manage.vue'),
      meta: {
        locale: '题目管理',
        requiresAuth: true,
        roles: ['*'],
        order: 1
      }
    }
  ]
};

export default PROBLEM;
