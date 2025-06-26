import type { AppRouteRecordRaw } from '@/router/routes/types.ts';
import { DEFAULT_LAYOUT } from '@/router/routes/base.ts';
import { AUTH_CONST } from '@/router/AuthConst.ts';

const COURSE: AppRouteRecordRaw = {
  path: '/course',
  name: 'course',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '课程管理',
    icon: 'icon-book',
    requiresAuth: true,
    roles: [AUTH_CONST.SUPER_ADMIN, AUTH_CONST.ADMIN],
    order: 6
  },
  children: [
    {
      path: 'list',
      name: 'CourseList',
      component: () => import('@/views/course/list/index.vue'),
      meta: {
        locale: '课程列表',
        requiresAuth: true,
        roles: [AUTH_CONST.SUPER_ADMIN, AUTH_CONST.ADMIN]
      }
    },
    {
      path: 'appointment',
      name: 'CourseAppointment',
      component: () => import('@/views/course/appointment/index.vue'),
      meta: {
        locale: '课程预约',
        requiresAuth: true,
        roles: [AUTH_CONST.SUPER_ADMIN, AUTH_CONST.ADMIN]
      }
    },
    {
      path: 'campus',
      name: 'CourseCampus',
      component: () => import('@/views/course/campus/index.vue'),
      meta: {
        locale: '校区安排',
        requiresAuth: true,
        roles: [AUTH_CONST.SUPER_ADMIN, AUTH_CONST.ADMIN]
      }
    },
    {
      path: 'add',
      name: 'CourseAdd',
      component: () => import('@/views/course/add/index.vue'),
      meta: {
        locale: '添加课程',
        requiresAuth: true,
        roles: [AUTH_CONST.SUPER_ADMIN, AUTH_CONST.ADMIN],
        hideInMenu: true
      }
    },
    {
      path: 'edit',
      name: 'CourseEdit',
      component: () => import('@/views/course/edit/index.vue'),
      meta: {
        locale: '编辑课程',
        requiresAuth: true,
        roles: [AUTH_CONST.SUPER_ADMIN, AUTH_CONST.ADMIN],
        hideInMenu: true
      }
    }
  ]
};

export default COURSE;
