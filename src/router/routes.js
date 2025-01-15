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
    path: '/questions',
    component: () => import('src/pages/QuestionsPage.vue'),
  },
  {
    path: '/question/:id',
    component: () => import('src/pages/QuestionPage.vue'),
    props: true, // передаем параметр id как пропс
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
