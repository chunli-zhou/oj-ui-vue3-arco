import { DEFAULT_LAYOUT } from '../base';
import type { AppRouteRecordRaw } from '../types';

const FORM: AppRouteRecordRaw = {
  path: '/form',
  name: 'form',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '表单页',
    icon: 'icon-settings',
    requiresAuth: true,
    order: 1
  },
  children: [
    {
      path: 'step',
      name: 'Step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: '分步表单',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
};

export default FORM;
