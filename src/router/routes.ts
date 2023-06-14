import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/Index/index.vue'),
    meta: {
      keepAlive: true,
    },
  },
];

export default routes;
