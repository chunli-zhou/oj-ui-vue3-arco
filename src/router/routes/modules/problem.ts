import type { AppRouteRecordRaw } from '@/router/routes/types.ts';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';

const PROBLEM: AppRouteRecordRaw = {
  path: '/problem',
  name: 'Problem',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '题目管理',
    icon: 'icon-select-all',
    requiresAuth: true,
    order: 4,
    hideInMenu: true,
    noAffix: true
  }
};

export default PROBLEM;
