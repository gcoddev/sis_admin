<template>
  <div
    class="authentication-bg pb-0"
    data-layout-config='{"darkMode":false}'
    @keyup.enter="iniciarSesion()"
  >
    <div class="auth-fluid">
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
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Ingrese su contraseña"
                    v-model="password"
                  />
                  <div
                    class="input-group-text"
                    data-password="false"
                    @click="showPassword()"
                    id="eye"
                  >
                    <span class="password-eye"></span>
                  </div>
                </div>
              </div>
              <div class="d-grid mb-0 text-center">
                <button class="btn btn-primary" @click="verificar()">
                  <i class="mdi mdi-login"></i> Iniciar sesion
                </button>
              </div>
            </div>

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
        </div>
      </div>

      <div class="auth-fluid-right text-center">
        <div class="auth-user-testimonial">
          <h2 class="mb-3">UNIVERSIDAD PUBLICA DE EL ALTO</h2>
          <p class="lead">
            <i class="mdi mdi-format-quote-open"></i> Sistema de Administracion
            de Publicaciones <i class="mdi mdi-format-quote-close"></i>
          </p>
          <p>- Development by Gary - SIE 2022</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#eye {
  cursor: pointer;
}
</style>

<script>
// import { mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    showPassword() {
      let inputPassword = document.querySelector("#password");
      let eye = document.querySelector("#eye");
      if (eye.getAttribute("data-password") == "false") {
        eye.setAttribute("data-password", "true");
        eye.classList.add("show-password");
        inputPassword.setAttribute("type", "text");
      } else {
        eye.setAttribute("data-password", "false");
        eye.classList.remove("show-password");
        inputPassword.setAttribute("type", "password");
      }
    },
    verificar() {
      if (this.username != "") {
        if (this.password != "") {
          this.iniciarSesion();
        } else {
          // console.log("password vacio");
          this.alertDisplay("Contraseña vacia", "warning", 1000);
        }
      } else {
        this.alertDisplay("Nombre de usuario vacio", "warning", 1000);
        this.password = "";
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
          localStorage.username = this.username;
          this.$router.push("/");
          location.reload();
        } else {
          this.alertDisplay("Error de inicio de sesion", "warning", 1500);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 401) {
          this.alertDisplay(error.response.data.message, "error", 1500);
          this.password = "";
        } else {
          if (error.code == "ERR_NETWORK") {
            this.$swal({
              title:
                "Estamos teniendo problemas con el servidor, porfavor vuelva mas tarde.",
              icon: "error",
              showConfirmButton: true,
            });
          }
        }
      }
    },
    alertDisplay(msg, icon, time) {
      this.$swal({
        title: msg,
        icon: icon,
        showConfirmButton: false,
        timer: time,
      });
    },
  },
  computed: {},
  created() {
    if (localStorage.auth) {
      if (localStorage.auth == "0") {
      } else {
        if (localStorage.auth == "1") {
          this.$router.push("/");
        } else {
          if (localStorage.auth == "2") {
            this.alertDisplay("Inicio de sesion expirado", "warning", 2500);
            localStorage.auth = "0";
          } else {
            if (localStorage.auth == "3") {
              this.alertDisplay("Sesion cerrada con exito", "success", 2500);
              localStorage.auth = "0";
            } else {
              if (localStorage.auth == "4") {
                this.alertDisplay("Error al iniciar sesion", "error", 1500);
                localStorage.auth = "0";
              }
            }
          }
        }
        // this.$router.push("/login");
      }
    } else {
      localStorage.clear();
      localStorage.auth = "0";
    }

    if (localStorage.username) {
      this.username = localStorage.username;
    } else {
      localStorage.username = "";
    }
  },
};
</script>
