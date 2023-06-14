import updateDocumentTitle from '@/utils/updateDocumentTitle';
import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routes';

const history = createWebHistory();

const router: Router = createRouter({
  history: history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  updateDocumentTitle(to.meta.title as string);

  next();
});

export default router;
