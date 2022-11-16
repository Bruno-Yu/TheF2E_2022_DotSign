import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'upload',
    component: () => import('../views/UploadView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import('../views/ConfirmView.vue'),
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/EditView.vue'),
  },
  {
    path: '/final',
    name: 'final',
    component: () => import('../views/FinalView.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotfoundView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
