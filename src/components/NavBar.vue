<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <ul class="list-unstyled topbar-menu float-end mb-0">

      <!-- light dark -->
      <li class="notification-list">
        <a class="nav-link" href="#" role="button" @click="changeTheme()">
          <i class="mdi mdi-theme-light-dark noti-icon"></i>
        </a>
      </li>
      <!-- light dark -->

      <li class="dropdown notification-list">
        <a
          class="nav-link dropdown-toggle nav-user arrow-none me-0"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <span class="account-user-avatar">
            <img
              :src="url_api + '/UsuarioAdmin/' + userAdminData.imagen"
              alt="user-image"
              class="rounded-circle"
              width="50px"
            />
          </span>
          <span>
            <span class="account-user-name"
              >{{ userAdminData.nombre }} {{ userAdminData.apellido }}</span
            >
            <span class="account-position"><b>ROL: </b>{{ userAdminData.roles }}</span>
          </span>
        </a>
        <div
          class="
            dropdown-menu dropdown-menu-end dropdown-menu-animated
            topbar-dropdown-menu
            profile-dropdown
          "
        >
          <!-- item-->
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0 text-dark">{{ msg }}</h6>
          </div>

          <!-- item-->
          <router-link to="/profile" class="dropdown-item notify-item">
            <i class="mdi mdi-account-circle me-1"></i>
            <span>Mi cuenta</span>
          </router-link>

          <!-- item-->
          <a
            href="javascript:void(0);"
            @click="logoutMsg()"
            class="dropdown-item notify-item"
          >
            <i class="mdi mdi-logout me-1"></i>
            <span>Cerrar sesion</span>
          </a>
        </div>
      </li>
    </ul>
    <button class="button-menu-mobile open-left">
      <i class="mdi mdi-menu"></i>
    </button>
    <!-- <div class="app-search dropdown d-none d-lg-block">
      <div class="form">
        <div class="input-group">
          <input
            type="text"
            class="form-control dropdown-toggle"
            placeholder="Search..."
            id="top-search"
          />
          <span class="mdi mdi-magnify search-icon"></span>
          <button class="input-group-text btn-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      msg: localStorage.msg,
    };
  },
  methods: {
    changeTheme() {
      if (localStorage.theme == "light") {
        localStorage.theme = "dark";
        document.getElementsByTagName("body")[0].dataset.layoutColor =
          localStorage.theme;
        document.getElementsByTagName("body")[0].dataset.leftbarTheme =
          localStorage.theme;
      } else {
        localStorage.theme = "light";
        document.getElementsByTagName("body")[0].dataset.layoutColor =
          localStorage.theme;
        document.getElementsByTagName("body")[0].dataset.leftbarTheme =
          localStorage.theme;
      }
    },
    cerrarSesion() {
      let theme = localStorage.theme;
      let un = localStorage.username;
      localStorage.clear();
      localStorage.theme = theme;
      localStorage.username = un;
      localStorage.auth = "3";
      location.reload();
    },
    logoutMsg() {
      this.$swal({
        title: "Cerrar sesion",
        text: "Esta seguro de cerrar la sesion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si. cerrar sesion",
      }).then((result) => {
        if (result.isConfirmed) {
          this.cerrarSesion();
        }
      });
    },
  },
  computed: {
    ...mapState(["userAdminData", "url_api"]),
  },
};
</script>