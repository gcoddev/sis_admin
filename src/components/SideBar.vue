<template>
  <div class="leftside-menu">
    <!-- LOGO -->
    <router-link to="/" style="cursor: pointer" class="logo text-center">
      <span class="logo-lg">
        <div class="d-flex justify-content-center align-items-center">
          <img
            src="@/assets/images/upea_logo.png"
            alt="Logo upea"
            height="50"
          />
          <h1 style="user-select: none">UPEA</h1>
        </div>
      </span>
      <span class="logo-sm">
        <img src="@/assets/images/upea_logo.png" alt="" height="50" />
      </span>
    </router-link>

    <div class="h-100" id="leftside-menu-container" data-simplebar>
      <!--- Sidemenu -->
      <ul class="side-nav">
        <li class="side-nav-title side-nav-item" style="font-size: 1rem">
          Administracion de Publicaciones UPEA
        </li>

        <li class="side-nav-item">
          <router-link to="/" class="side-nav-link">
            <i class="mdi mdi-home"></i>
            <span> INICIO </span>
          </router-link>
        </li>

        <div v-if="showUpea">
          <li class="side-nav-item">
            <a
              data-bs-toggle="collapse"
              href="#upea"
              aria-expanded="true"
              aria-controls="upea"
              class="side-nav-link"
            >
              <i class="mdi mdi-home-city"></i>
              <span> UPEA </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse show" id="upea">
              <ul class="side-nav-second-level">
                <li class="side-nav-item">
                  <router-link to="/upea"
                    ><i class="mdi mdi-home-outline"></i>&nbsp; INICIO
                  </router-link>
                </li>

                <li class="side-nav-item">
                  <router-link to="/publicaciones" @click="clickInstitucion()">
                    <i class="mdi mdi-book-edit"></i>&nbsp; PUBLICACIONES
                  </router-link>
                </li>

                <li class="side-nav-item">
                  <router-link to="/gaceta" @click="clickInstitucion()"
                    ><i class="mdi mdi-periodic-table"></i>&nbsp; GACETA
                  </router-link>
                </li>

                <li class="side-nav-item">
                  <router-link to="/eventos" @click="clickInstitucion()"
                    ><i class="mdi mdi-card-text"></i>&nbsp; EVENTOS
                  </router-link>
                </li>

                <li class="side-nav-item">
                  <router-link to="/videos" @click="clickInstitucion()"
                    ><i class="mdi mdi-video"></i>&nbsp; VIDEOS
                  </router-link>
                </li>
                <!-- <li class="side-nav-item">
                  <router-link to="/eventos" @click="clickInstitucion()"
                    ><i class="mdi mdi-video"></i>&nbsp; VIDEOS
                  </router-link>
                </li> -->
              </ul>
            </div>
          </li>
        </div>

        <!-- CARRERAS -->
        <div v-if="showCarreras">
          <li class="side-nav-title side-nav-item">Carreras - Areas</li>
          <li class="side-nav-item" v-for="(area, id) of Area" :key="id">
            <a
              data-bs-toggle="collapse"
              :href="'#sub_' + id"
              aria-expanded="false"
              aria-controls="sidebarTasks"
              class="side-nav-link"
            >
              <i class="mdi mdi-school"></i>
              <span> {{ area.area }} </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" :id="'sub_' + id">
              <ul class="side-nav-second-level">
                <li
                  class="side-nav-item"
                  v-for="(carrera, id_car) of area.carreras"
                  :key="id_car"
                >
                  <a
                    data-bs-toggle="collapse"
                    :href="'#sub2_' + id_car"
                    aria-expanded="false"
                    aria-controls="sidebarTasks"
                  >
                    <i class="mdi mdi-school-outline"></i>&nbsp;
                    <span> {{ carrera.carrera }} </span>
                    <span class="menu-arrow"></span>
                  </a>
                  <div class="collapse" :id="'sub2_' + id_car">
                    <ul class="side-nav-third-level">
                      <li class="side-nav-item">
                        <router-link
                          :to="'/cca/' + carrera.car_id"
                          @click="
                            clickCarreras(carrera.car_id, carrera.carrera)
                          "
                        >
                          <i class="mdi mdi-notebook"></i>
                          <span> CONVOCATORIAS </span>
                        </router-link>
                      </li>
                      <li class="side-nav-item">
                        <router-link
                          :to="'/cs/' + carrera.car_id"
                          @click="
                            clickCarreras(carrera.car_id, carrera.carrera)
                          "
                        >
                          <i class="mdi mdi-bookmark-box-multiple"></i>
                          <span> CURSOS </span>
                        </router-link>
                      </li>
                      <li class="side-nav-item">
                        <router-link
                          :to="'/serv/' + carrera.car_id"
                          @click="
                            clickCarreras(carrera.car_id, carrera.carrera)
                          "
                        >
                          <i class="mdi mdi-bus-school"></i>
                          <span> SERVICIOS </span>
                        </router-link>
                      </li>
                      <li class="side-nav-item">
                        <router-link
                          :to="'/ofer/' + carrera.car_id"
                          @click="
                            clickCarreras(carrera.car_id, carrera.carrera)
                          "
                        >
                          <i class="mdi mdi-calendar"></i>
                          <span> OFERTAS ACADEMICAS </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </div>

        <div v-if="showCarrera">
          <li class="side-nav-title side-nav-item">Carrera</li>
          <li class="side-nav-item">
            <a
              data-bs-toggle="collapse"
              href="#sub_carrera"
              aria-expanded="true"
              aria-controls="sidebarTasks"
              class="side-nav-link"
            >
              <i class="mdi mdi-school-outline"></i>
              <span> {{ CarreraU.carrera }} </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse show" id="sub_carrera">
              <ul class="side-nav-second-level">
                <div v-if="showDir">
                  <li class="side-nav-item">
                    <router-link
                      :to="'/cca/' + CarreraU.carrera_id"
                      @click="clickCarrera()"
                    >
                      <i class="mdi mdi-notebook"></i>
                      <span> CONVOCATORIAS </span>
                    </router-link>
                  </li>
                  <li class="side-nav-item">
                    <router-link
                      :to="'/cs/' + CarreraU.carrera_id"
                      @click="clickCarrera()"
                    >
                      <i class="mdi mdi-bookmark-box-multiple"></i>
                      <span> CURSOS </span>
                    </router-link>
                  </li>
                  <li class="side-nav-item">
                    <router-link
                      :to="'/serv/' + CarreraU.carrera_id"
                      @click="clickCarrera()"
                    >
                      <i class="mdi mdi-bus-school"></i>
                      <span> SERVICIOS </span>
                    </router-link>
                  </li>
                  <li class="side-nav-item">
                    <router-link
                      :to="'/ofer/' + CarreraU.carrera_id"
                      @click="clickCarrera()"
                    >
                      <i class="mdi mdi-calendar"></i>
                      <span> OFERTAS ACADEMICAS </span>
                    </router-link>
                  </li>
                </div>
                <div v-if="showCen">
                  <li class="side-nav-item">
                    <router-link
                      :to="'/cs/' + CarreraU.carrera_id"
                      @click="clickCarrera()"
                    >
                      <i class="mdi mdi-bookmark-box-multiple"></i>
                      <span> CURSOS </span>
                    </router-link>
                  </li>
                </div>
              </ul>
            </div>
          </li>
        </div>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<style scoped>
* {
  user-select: none;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      countP: [],
    };
  },
  methods: {
    clickInstitucion() {
      this.$store.state.getter = true;
    },
    clickCarreras(car_id, carrera) {
      this.$store.state.idCarr = car_id;
      this.$store.state.nombreCarr = carrera;
      this.$store.state.getter = true;
    },
    clickCarrera() {
      this.$store.state.getter = true;
    },
  },
  computed: {
    ...mapState(["Area", "userAdminData", "CarreraU"]),
    rol() {
      return this.userAdminData.roles;
    },
    showUpea() {
      if (this.rol == "ADMINISTRADOR" || this.rol == "SECRETARIA") {
        return true;
      } else {
        return false;
      }
    },
    showCarreras() {
      if (this.rol == "ADMINISTRADOR") {
        return true;
      } else {
        return false;
      }
    },
    showCarrera() {
      if (this.rol == "CENTRO_ESTUDIANTES" || this.rol == "DIRECTOR") {
        return true;
      } else {
        return false;
      }
    },
    showDir() {
      if (this.rol == "DIRECTOR") {
        return true;
      } else {
        return false;
      }
    },
    showCen() {
      if (this.rol == "CENTRO_ESTUDIANTES") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>