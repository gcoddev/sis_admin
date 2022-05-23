import { createStore } from 'vuex'

export default createStore({
  state: {
    alert: false,
    alert_msg: '',
    alert_color: '',
    
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
