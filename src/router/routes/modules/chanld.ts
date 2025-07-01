import type { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';

const POST: AppRouteRecordRaw = {
  path: '/chatId',
  name: 'chanId',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'Ai + 客服',
    icon: 'icon-user',
    order: 7
  },
  children: [
    {
      path: 'chat',
      name: 'chat',
      component: () => import('@/views/chatId/chat.vue'),
      meta: {
        locale: 'ai会话',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'service',
      name: 'service',
      component: () => import('@/views/chatId/service.vue'),
      meta: {
        locale: '智能客服',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
};

export default POST;
