import type { AppRouteRecordRaw } from '@/router/routes/types.ts';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';

const SYS: AppRouteRecordRaw = {
  path: '/sys',
  name: 'Sys',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '系统管理',
    icon: 'icon-user',
    requiresAuth: true,
    order: 1
  },
  children: [
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/sys/role/index.vue'),
      meta: {
        locale: '角色管理',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'user',
      name: 'UserManage',
      component: () => import('@/views/sys/user/index.vue'),
      meta: {
        locale: '用户管理',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
};
export default SYS;
