<template>
  <div class="leftside-menu">
    <!-- LOGO -->
    <a @click="changeSide()" style="cursor: pointer" class="logo text-center">
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
    </a>

    <!-- LOGO -->
    <!-- <a
      @click="changeSide()"
      style="cursor: pointer"
      class="logo text-center logo-dark"
    >
      <span class="logo-lg">
        <img src="@/assets/images/logo-dark.png" alt="" height="16" />
      </span>
      <span class="logo-sm">
        <img src="@/assets/images/logo_sm_dark.png" alt="" height="16" />
      </span>
    </a> -->

    <div class="h-100" id="leftside-menu-container" data-simplebar>
      <!--- Sidemenu -->
      <ul class="side-nav">
        <li class="side-nav-title side-nav-item" style="font-size: 1rem">
          Administracion de Publicaciones UPEA
        </li>

        <li class="side-nav-item">
          <router-link to="/" class="side-nav-link">
            <i class="uil-calender"></i>
            <span> Inicio </span>
          </router-link>
        </li>
        <li class="side-nav-item">
          <router-link to="/upea" class="side-nav-link">
            <i class="uil-calender"></i>
            <span> UPEA </span>
          </router-link>
        </li>

        <li class="side-nav-title side-nav-item">Carreras - Areas</li>
        <li class="side-nav-item" v-for="(area, id) of Area" :key="id">
          <a
            data-bs-toggle="collapse"
            :href="'#sub_' + id"
            aria-expanded="false"
            aria-controls="sidebarTasks"
            class="side-nav-link"
          >
            <i class="uil-clipboard-alt"></i>
            <span> {{ area.area }} </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" :id="'sub_' + id">
            <ul class="side-nav-second-level">
              <li v-for="(carrera, id_car) of area.carreras" :key="id_car">
                <router-link
                  :to="{
                    path: '/carrera/' + carrera.car_id,
                    name: 'carrera',
                    params: {
                      id_car: carrera.car_id,
                      carrera: carrera.carrera,
                      sede: carrera.sede,
                      direccion: carrera.direccion,
                    },
                  }"
                  @click="clickCarrera()"
                  >{{ carrera.carrera }}</router-link
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <!-- Help Box -->
      <div class="help-box text-white text-center">
        <a href="javascript: void(0);" class="float-end close-btn text-white">
          <i class="mdi mdi-close"></i>
        </a>
        <img
          src="@/assets/images/help-icon.svg"
          height="90"
          alt="Helper Icon Image"
        />
        <h5 class="mt-3">Unlimited Access</h5>
        <p class="mb-3">Upgrade to plan to get access to unlimited reports</p>
        <a href="javascript: void(0);" class="btn btn-secondary btn-sm"
          >Upgrade</a
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
  created() {
    if (localStorage.themeSide) {
      document.getElementsByTagName("body")[0].dataset.leftbarTheme =
        localStorage.themeSide;
    } else {
      localStorage.themeSide = "dark";
    }
  },
  methods: {
    changeSide() {
      if (localStorage.themeSide == "dark") {
        localStorage.themeSide = "light";
        document.getElementsByTagName("body")[0].dataset.leftbarTheme =
          localStorage.themeSide;
      } else {
        localStorage.themeSide = "dark";
        document.getElementsByTagName("body")[0].dataset.leftbarTheme =
          localStorage.themeSide;
      }
    },
    clickCarrera() {
      this.$store.state.getter = true
    }
  },
  computed: {
    ...mapState(["Area"]),
  },
};
</script>