<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <ul class="list-unstyled topbar-menu float-end mb-0">
      <!-- <li class="dropdown notification-list d-lg-none">
        <a
          class="nav-link dropdown-toggle arrow-none"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <i class="dripicons-search noti-icon"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
          <div class="p-3 form">
            <input
              type="text"
              class="form-control"
              placeholder="Search ..."
              aria-label="Recipient's username"
            />
          </div>
        </div>
      </li> -->

      <!-- light dark -->
      <li class="notification-list">
        <a class="nav-link" href="#" role="button" @click="changeTheme()">
          <i class="mdi mdi-theme-light-dark noti-icon"></i>
        </a>
      </li>
      <!-- light dark -->

      <!-- <li class="dropdown notification-list d-none d-sm-inline-block">
        <a
          class="nav-link dropdown-toggle arrow-none"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <i class="dripicons-view-apps noti-icon"></i>
        </a>
        <div
          class="
            dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg
            p-0
          "
        >
          <div class="p-2">
            <div class="row g-0">
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/slack.png" alt="slack" />
                  <span>Slack</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/github.png" alt="Github" />
                  <span>GitHub</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img
                    src="@/assets/images/brands/dribbble.png"
                    alt="dribbble"
                  />
                  <span>Dribbble</span>
                </a>
              </div>
            </div>

            <div class="row g-0">
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img
                    src="@/assets/images/brands/bitbucket.png"
                    alt="bitbucket"
                  />
                  <span>Bitbucket</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/dropbox.png" alt="dropbox" />
                  <span>Dropbox</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/g-suite.png" alt="G Suite" />
                  <span>G Suite</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li> -->

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
              :src="
                'https://serviciopagina.upea.bo/UsuarioAdmin/' +
                userAdminData.imagen
              "
              alt="user-image"
              class="rounded-circle"
              width="50px"
            />
          </span>
          <span>
            <span class="account-user-name"
              >{{ userAdminData.nombre }} {{ userAdminData.apellido }}</span
            >
            <span class="account-position">{{ userAdminData.roles }}</span>
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
            <h6 class="text-overflow m-0">{{ msg }}</h6>
          </div>

          <!-- item-->
          <router-link to="/profile" class="dropdown-item notify-item">
            <i class="mdi mdi-account-circle me-1"></i>
            <span>Mi cuenta</span>
          </router-link>

          <!-- item-->
          <a
            href="https://sie.upea.bo/"
            target="_blank"
            class="dropdown-item notify-item"
          >
            <i class="mdi mdi-lifebuoy me-1"></i>
            <span>Soporte</span>
          </a>

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
  <!-- end Topbar -->
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
    ...mapState(["userAdminData"]),
  },
};
</script>