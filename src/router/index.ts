import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'applicant',
      component: () => import('../views/ApplicantView.vue')
    },
    {
      path: '/applicant-list',
      name: 'applicant-list',
      component: () => import('../views/ApplicantListView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const isAuthen = !!localStorage.getItem('authen')

  if (!isAuthen && to.name === 'applicant-list') {
    return { name: 'login' }
  }

})

export default router
