import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'appWrapper',
    component: () => import('@/pages/AppWrapper.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/upea',
        name: 'upea',
        component: () => import('@/views/Upea.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: '/carrera/:id_car/',
        name: 'carrera',
        props: true,
        component: () => import('@/views/Carrera.vue'),
      },
      {
        path: '/edit/:idCCA',
        name: 'edit',
        component: () => import('@/views/Edit.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
