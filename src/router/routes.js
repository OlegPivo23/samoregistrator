const routes = [
  {
    path: '/',
    component: () => import('src/pages/AuthPage.vue'),
  },
  {
    path: '/home',
    component: () => import('src/pages/HomePage.vue'),
  },
  {
    path: '/cabinet',
    component: () => import('src/pages/CabinetPage.vue'),
  },
  {
    path: '/:catchAll(.*)*', // Обработчик ошибок
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
