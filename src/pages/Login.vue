<template>
  <div
    class="authentication-bg pb-0"
    data-layout-config='{"darkMode":false}'
    @keyup.enter="iniciarSesion()"
  >
    <div class="auth-fluid">
      <!--Auth fluid left content -->
      <div class="auth-fluid-form-box">
        <div class="align-items-center d-flex h-100">
          <div class="card-body">
            <!-- Logo -->
            <div class="auth-brand text-center">
              <div class="d-flex justify-content-center align-items-center">
                <img
                  src="@/assets/images/upea_logo.png"
                  alt="Logo upea"
                  height="50"
                />
                <h1 style="user-select: none">UPEA</h1>
              </div>
            </div>

            <!-- Toast error -->
            <div v-if="alert">
              <div
                class="alert alert-dismissible fade show"
                :class="'alert-' + alert_color"
                role="alert"
              >
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  @click="changeError()"
                ></button>
                <strong>{{ alert_msg }}</strong>
              </div>
            </div>
            <!-- Toast end -->

            <!-- title-->
            <h4 class="mt-5">Iniciar sesion</h4>
            <p class="text-muted mb-4">
              Ingrese su nombre de usuario y su contraseña para acceder a su
              cuenta.
            </p>

            <!-- form -->
            <div class="form">
              <div class="mb-3">
                <label for="username" class="form-label"
                  >Nombre de usuario</label
                >
                <input
                  class="form-control"
                  type="text"
                  id="username"
                  required=""
                  placeholder="Ingrese su nombre de usuario"
                  v-model="username"
                />
              </div>
              <div class="mb-3">
                <a href="pages-recoverpw-2.html" class="text-muted float-end"
                  ><small>Forgot your password?</small></a
                >
                <label for="password" class="form-label">Contraseña</label>
                <input
                  class="form-control"
                  type="password"
                  required=""
                  id="password"
                  placeholder="Ingrese su contraseña"
                  v-model="password"
                />
              </div>
              <div class="d-grid mb-0 text-center">
                <button class="btn btn-primary" @click="iniciarSesion()">
                  <i class="mdi mdi-login"></i> Iniciar sesion
                </button>
              </div>
            </div>
            <!-- end form-->

            <!-- Footer-->
            <!-- <footer class="footer footer-alt">
              <p class="text-muted">
                Don't have an account?
                <a href="pages-register-2.html" class="text-muted ms-1"
                  ><b>Sign Up</b></a
                >
              </p>
            </footer> -->
          </div>
          <!-- end .card-body -->
        </div>
        <!-- end .align-items-center.d-flex.h-100-->
      </div>
      <!-- end auth-fluid-form-box-->

      <!-- Auth fluid right content -->
      <div class="auth-fluid-right text-center">
        <div class="auth-user-testimonial">
          <h2 class="mb-3">UNIVERSISDAD PUBLICA DE EL ALTO</h2>
          <p class="lead">
            <i class="mdi mdi-format-quote-open"></i> Sistema de Administracion
            de Publicaciones <i class="mdi mdi-format-quote-close"></i>
          </p>
          <p>- Development by Gary - SIE 2022</p>
        </div>
        <!-- end auth-user-testimonial-->
      </div>
      <!-- end Auth fluid right content -->
    </div>
    <!-- end auth-fluid-->

    <!-- bundle -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "Juan Pablo Valencia",
      password: "JuanPa#1998",
    };
  },
  methods: {
    changeError() {
      this.$store.state.alert = false;
      this.$store.state.alert_msg = "";
      this.$store.state.alert_color = "";
      localStorage.auth = 0;
    },
    verificar() {
      if (this.username != "") {
        if (this.password != "") {
          this.iniciarSesion();
        }
      }
    },
    async iniciarSesion() {
      try {
        let res = await this.axios.post("/api/Login-Api/", {
          username: this.username,
          password: this.password,
        });
        if (res.status == 200) {
          localStorage.token = res.data.token;
          localStorage.credentialP = res.data.credentialP;
          localStorage.msg = res.data.message;
          this.$router.push('/')
          location.reload();
        } else {
          this.$store.state.alert = true;
          this.$store.state.alert_msg = "Error de inicio de sesion";
          this.$store.state.alert_color = "warning";
        }
      } catch (error) {
        if (error.response.status == 400 || error.response.status == 401) {
          this.$store.state.alert = true;
          this.$store.state.alert_msg = error.response.data.message;
          this.$store.state.alert_color = "danger";
          console.log("error 400");
        }
      }
    },
  },
  computed: {
    ...mapState(["alert", "alert_msg", "alert_color"]),
  },
  created() {
    if (localStorage.auth) {
      if (localStorage.auth == "0") {
        this.$store.state.alert = false;
        this.$store.state.alert_msg = null;
        this.$store.state.alert_color = null;
      } else {
        if (localStorage.auth == "1") {
          this.$router.push("/");
        } else {
          if (localStorage.auth == "2") {
            this.$store.state.alert = true;
            this.$store.state.alert_msg = "Inicio de sesion expirado";
            this.$store.state.alert_color = "warning";
            localStorage.auth = '0';
          } else {
            if (localStorage.auth == "3") {
              this.$store.state.alert = true;
              this.$store.state.alert_msg = "Sesion cerrada con exito";
              this.$store.state.alert_color = "success";
              localStorage.auth = '0';
            }
          }
        }
        // this.$router.push("/login");
      }
    } else {
      localStorage.clear();
      localStorage.auth = '0';
    }
  },
};
</script>
