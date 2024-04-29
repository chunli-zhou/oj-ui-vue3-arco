import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { appRoutes } from './routes';
import { NOT_FOUND_ROUTE, REDIRECT_MAIN } from './routes/base';
import { LOGIN_ROUTE_NAME } from './constants';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'user/setting'
    },
    {
      path: '/login',
      name: LOGIN_ROUTE_NAME,
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false
      }
    },
    ...appRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

createRouteGuard(router);

export default router;
