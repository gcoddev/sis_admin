import { createStore } from 'vuex'

export default createStore({
  state: {   
    url_api: 'https://serviciopagina.upea.bo',
    // Datos generales de usuario
    userAdminData: {},
    Institucion: {},
    Area: {},

    // clickCarrera
    idCarr: '',
    nombreCarr: '',

    // getter Carrera / Institucion
    getter: false,

    // id de Convocatorias/Comunicados/Avisos/Cursos/Seminarios
    idCCACS: '',

    // Mensajes
    ev: 0,
    evTitle: '',
    evMsg: '',

    // Al
    CarreraU: {},

    // id de Publicaciones/Gaceta/Eventos
    idPGE: '',
    idINS: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
