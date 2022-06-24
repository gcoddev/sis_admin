import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import loadScript from "vue-plugin-load-script";

axios.defaults.baseURL = 'https://serviciopagina.upea.bo/'
axios.defaults.headers = {
  'Accept': 'application/json',
  'content-type': 'application/json',
}

createApp(App).use(store).use(router).use(VueAxios, axios).use(VueSweetalert2).use(loadScript).mount('#app')
