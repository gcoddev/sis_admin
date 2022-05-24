import { createStore } from 'vuex'

export default createStore({
  state: {   
    // Datos generales de usuario
    userAdminData: {},
    Institucion: {},
    Area: {},

    // clickCarrera
    idCarr: '',
    nombreCarr: '',
    getter: false,

    // id de Convocatorias/Comunicados/Avisos/Cursos/Seminarios
    idCCACS: '',
    ev: 0,
    evTitle: '',
    evMsg: '',

    // Al
    CarreraU: {}
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
