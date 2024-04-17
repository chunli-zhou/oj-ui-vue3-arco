import type { AppRouteRecordRaw } from '@/router/routes/types.ts';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';

const PROBLEM: AppRouteRecordRaw = {
  path: '/problem',
  name: 'problem',
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
      path: 'find',
      name: 'FindProblem',
      component: () => import('@/views/problem/find/index.vue'),
      meta: {
        locale: '找题',
        requiresAuth: true,
        roles: ['*'],
        order: 1
      }
    },
    {
      path: 'manage',
      name: 'Manage',
      component: () => import('@/views/problem/manage/index.vue'),
      meta: {
        hideChildrenMenu: true,
        locale: '题目管理',
        requiresAuth: true,
        roles: ['*'],
        order: 1
      }
    },
    {
      path: 'add',
      name: 'ProblemAdd',
      component: () => import('@/views/problem/add/index.vue'),
      meta: {
        hideInMenu: true,
        locale: '添加题目',
        requiresAuth: true,
        roles: ['*'],
        order: 1
      }
    },
    {
      path: 'edit',
      name: 'ProblemEdit',
      component: () => import('@/views/problem/update/index.vue'),
      meta: {
        hideInMenu: true,
        locale: '编辑题目',
        requiresAuth: true,
        roles: ['*'],
        order: 1
      }
    }
  ]
};

export default PROBLEM;
