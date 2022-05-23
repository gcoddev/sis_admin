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
              class="side-nav-link"
              data-bs-toggle="collapse"
              aria-expanded="true"
              href="#upea"
              aria-controls="upea"
            >
              <i class="mdi mdi-home-city"></i>
              <span> UPEA </span>
              <span class="menu-arrow"></span>
            </a>
          </li>

          <div class="collapse show" id="upea">
            <ul class="side-nav-second-level">
              <li>
                <router-link to="/upea"
                  ><i class="mdi mdi-home-outline"></i>&nbsp; INICIO
                </router-link>
              </li>

              <li>
                <router-link to="/publicaciones">
                  <i class="mdi mdi-book-edit"></i>&nbsp; PUBLICACIONES
                </router-link>
              </li>

              <li>
                <router-link to="/gaceta"
                  ><i class="mdi mdi-periodic-table"></i>&nbsp; GACETA
                </router-link>
              </li>

              <li>
                <router-link to="/eventos"
                  ><i class="mdi mdi-card-text"></i>&nbsp; EVENTOS
                </router-link>
              </li>
            </ul>
          </div>
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
                    <i class="mdi mdi-school"></i>
                    <span> {{ carrera.carrera }} </span>
                    <span class="menu-arrow"></span>
                  </a>
                  <div class="collapse" :id="'sub2_' + id_car">
                    <ul class="side-nav-third-level">
                      <li class="side-nav-item" v-if="showConv">
                        <router-link
                          :to="{
                            path: '/cca/' + carrera.car_id,
                            name: 'cca',
                            params: {
                              id_car: carrera.car_id,
                              carrera: carrera.carrera,
                            },
                          }"
                          @click="clickCarrera()"
                        >
                          <span> CONVOCATORIAS </span>
                        </router-link>
                      </li>
                      <li class="side-nav-item">
                        <router-link
                          :to="{
                            path: '/cs/' + carrera.car_id,
                            name: 'cs',
                            params: {
                              id_car: carrera.car_id,
                              carrera: carrera.carrera,
                            },
                          }"
                          @click="clickCarrera()"
                        >
                          <span> CURSOS </span>
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
              <i class="mdi mdi-school"></i>
              <span> {{ Carrera.carrera }} </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse show" id="sub_carrera">
              <ul class="side-nav-second-level">
                <li class="side-nav-item" v-if="showConv">
                  <a href="##">
                    <span> CONVOCATORIAS </span>
                  </a>
                </li>
                <li class="side-nav-item">
                  <a href="##">
                    <span> CURSOS </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <!-- <li class="side-nav-item">
            <a
              data-bs-toggle="collapse"
              href="#sub_"
              aria-expanded="false"
              aria-controls="sidebarTasks"
              class="side-nav-link"
            >
              <i class="mdi mdi-school"></i>
              <span> Area </span>
              <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sub_">
              <ul class="side-nav-second-level">
                <li class="side-nav-item">
                  <a
                    data-bs-toggle="collapse"
                    href="#sub2_"
                    aria-expanded="false"
                    aria-controls="sidebarTasks"
                  >
                    <i class="mdi mdi-school-outline"></i>
                    <span> Carrera </span>
                    <span class="menu-arrow"></span>
                  </a>
                  <div class="collapse" id="sub2_">
                    <ul class="side-nav-third-level">
                      <li class="side-nav-item" v-if="showConv">
                        <a href="##">
                          <span> CONVOCATORIAS </span>
                        </a>
                      </li>
                      <li class="side-nav-item">
                        <a href="##">
                          <span> CURSOS </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li> -->
        </div>
        <!-- END CARRERA -->
      </ul>

      <!-- Help Box -->
      <div class="help-box text-white text-center">
        <a href="javascript: void(0);" class="float-end close-btn text-white">
          <i class="mdi mdi-close"></i>
        </a>
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          height="70"
          alt="Helper Icon Image"
        />
        <h5 class="mt-3">GitHub</h5>
        <p class="mb-3">UAccede a mi cuenta de GitHub</p>
        <a
          href="https://github.com/gcoddev/"
          target="_blank"
          class="btn btn-secondary btn-sm"
          >Ver</a
        >
      </div>
      <!-- end Help Box -->
      <!-- End Sidebar -->

      <div class="clearfix"></div>
    </div>
    <!-- Sidebar -left -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    clickCarrera() {
      this.$store.state.getter = true;
    },
  },
  computed: {
    ...mapState(["Area", "userAdminData", "Carrera"]),
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
    showConv() {
      if (this.rol == "ADMINISTRADOR" || this.rol == "DIRECTOR") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>