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
        path: '/upeahome/',
        name: 'upeahome',
        component: () => import('@/views/UpeaHome.vue'),
        children: [
          {
            path: '/upea',
            name: 'upea',
            component: () => import('@/views/Upea/Upea.vue')
          },
          {
            path: '/publicaciones',
            name: 'publicaciones',
            component: () => import('@/views/Upea/Publicaciones.vue')
          },
          {
            path: '/gaceta',
            name: 'gaceta',
            component: () => import('@/views/Upea/Gaceta.vue')
          },
          {
            path: '/eventos',
            name: 'eventos',
            component: () => import('@/views/Upea/Eventos.vue')
          },
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: '/cca/:id_car/',
        name: 'cca',
        props: true,
        component: () => import('@/views/Carrera/Convocatorias/CCA.vue'),
      },
      {
        path: '/cs/:id_car/',
        name: 'cs',
        props: true,
        component: () => import('@/views/Carrera/Cursos/CS.vue'),
      },
      {
        path: '/edit_cca/:idCCA/',
        name: 'edit_cca',
        props: true,
        component: () => import('@/views/Carrera/Convocatorias/EditCCA.vue')
      },
      {
        path: '/edit_cs/:idCCA/',
        name: 'edit_cs',
        props: true,
        component: () => import('@/views/Carrera/Cursos/EditCS.vue')
      },
      {
        path: '/new_cca/:id_car/',
        name: 'new_cca',
        props: true,
        component: () => import('@/views/Carrera/Convocatorias/NewCCA.vue')
      },
      {
        path: '/new_cs/:id_car/',
        name: 'new_cs',
        props: true,
        component: () => import('@/views/Carrera/Cursos/NewCS.vue')
      },
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
