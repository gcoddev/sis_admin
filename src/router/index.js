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
            component: () => import('@/views/Upea/Publicaciones/Publicaciones.vue')
          },
          {
            path: '/edit_p/:idPGE',
            name: 'edit_p',
            component: () => import('@/views/Upea/Publicaciones/EditP.vue')
          },
          {
            path: '/new_p/:idINS',
            name: 'new_p',
            component: () => import('@/views/Upea/Publicaciones/NewP.vue')
          },
          {
            path: '/gaceta',
            name: 'gaceta',
            component: () => import('@/views/Upea/Gaceta/Gaceta.vue')
          },
          {
            path: '/edit_g/:idPGE',
            name: 'edit_g',
            component: () => import('@/views/Upea/Gaceta/EditG.vue')
          },
          {
            path: '/new_g/:idINS',
            name: 'new_g',
            component: () => import('@/views/Upea/Gaceta/NewG.vue')
          },
          {
            path: '/eventos',
            name: 'eventos',
            component: () => import('@/views/Upea/Eventos/Eventos.vue')
          },
          {
            path: '/edit_e/:idPGE',
            name: 'edit_e',
            component: () => import('@/views/Upea/Eventos/EditE.vue')
          },
          {
            path: '/new_e/:idINS',
            name: 'new_e',
            component: () => import('@/views/Upea/Eventos/NewE.vue')
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
        path: '/edit_cca/:idCCA/',
        name: 'edit_cca',
        props: true,
        component: () => import('@/views/Carrera/Convocatorias/EditCCA.vue')
      },
      {
        path: '/new_cca/:id_car/',
        name: 'new_cca',
        props: true,
        component: () => import('@/views/Carrera/Convocatorias/NewCCA.vue')
      },
      {
        path: '/cs/:id_car/',
        name: 'cs',
        props: true,
        component: () => import('@/views/Carrera/Cursos/CS.vue'),
      },
      {
        path: '/edit_cs/:idCCA/',
        name: 'edit_cs',
        props: true,
        component: () => import('@/views/Carrera/Cursos/EditCS.vue')
      },
      {
        path: '/new_cs/:id_car/',
        name: 'new_cs',
        props: true,
        component: () => import('@/views/Carrera/Cursos/NewCS.vue')
      },
      {
        path: '/facilitador/:idCS',
        name: 'facilitador',
        props: true,
        component: () => import('@/views/Carrera/Cursos/Facilitador.vue')
      },
      {
        path: '/edit_f/:idF',
        name: 'edit_f',
        props: true,
        component: () => import('@/views/Carrera/Cursos/EditF.vue')
      },
      {
        path: '/ofer/:id_car',
        name: 'ofer',
        component: () => import('@/views/Carrera/Ofertas/Ofertas.vue')
      },
      {
        path: '/new_ofer/:id_car',
        name: 'new_ofer',
        component: () => import('@/views/Carrera/Ofertas/NewOfertas.vue')
      },
      {
        path: '/edit_ofer/:id_ofer',
        name: 'edit_ofer',
        component: () => import('@/views/Carrera/Ofertas/EditOfertas.vue')
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
