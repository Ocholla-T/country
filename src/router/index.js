import { createRouter, createWebHistory } from 'vue-router';

function lazyImport(route) {
  return () => import(`../views/${route}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: lazyImport('Home'),
  },
  {
    path: '/detail/:name',
    name: 'Detail',
    component: lazyImport('Detail'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
