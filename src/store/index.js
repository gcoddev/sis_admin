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

    // id de Convocatorias/Comunicados/Avisos/Cursos/Seminarios/Ofertas
    idCCACS: '',
    idSOV: '',
    idF: '',

    // Mensajes
    ev: 0,
    evTitle: '',
    evMsg: '',

    // Al
    CarreraU: {},

    // id de Publicaciones/Gaceta/Eventos
    idPGEVM: '',
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
