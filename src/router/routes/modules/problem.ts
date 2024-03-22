import type { AppRouteRecordRaw } from '@/router/routes/types.ts';

const PROBLEM: AppRouteRecordRaw = {
  path: '/problem',
  name: 'Problem',
  component: () => import('@/views/problem/index.vue'),
  meta: {
    locale: '题目管理',
    icon: 'icon-select-all',
    requiresAuth: true,
    roles: ['*'],
    order: 4
  }
};

export default PROBLEM;
