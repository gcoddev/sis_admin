import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'https://serviciopagina.upea.bo/'
axios.defaults.headers = {
  'Content-type' : 'application/json'
}

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
