<template>
  <body class="authentication-bg pb-0" data-layout-config='{"darkMode":false}'>
    <div class="auth-fluid">
      <!--Auth fluid left content -->
      <div class="auth-fluid-form-box">
        <div class="align-items-center d-flex h-100">
          <div class="card-body">
            <!-- Logo -->
            <div class="auth-brand text-center text-lg-start">
              <a href="index.html" class="logo-dark">
                <span
                  ><img src="@/assets/images/logo-dark.png" alt="" height="18"
                /></span>
              </a>
              <a href="index.html" class="logo-light">
                <span
                  ><img src="@/assets/images/logo.png" alt="" height="18"
                /></span>
              </a>
            </div>

            <!-- Toast error -->
            <div v-if="alert">
              <div
                class="alert alert-dismissible fade show"
                :class="'alert-'+alert_color"
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
            <h4 class="mt-0">Sign In</h4>
            <p class="text-muted mb-4">
              Enter your email address and password to access account.
            </p>

            <!-- form -->
            <div class="form">
              <div class="mb-3">
                <label for="username" class="form-label">Email address</label>
                <input
                  class="form-control"
                  type="text"
                  id="username"
                  required=""
                  placeholder="Enter your email"
                  v-model="username"
                />
              </div>
              <div class="mb-3">
                <a href="pages-recoverpw-2.html" class="text-muted float-end"
                  ><small>Forgot your password?</small></a
                >
                <label for="password" class="form-label">Password</label>
                <input
                  class="form-control"
                  type="password"
                  required=""
                  id="password"
                  placeholder="Enter your password"
                  v-model="password"
                />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="checkbox-signin"
                  />
                  <label class="form-check-label" for="checkbox-signin"
                    >Remember me</label
                  >
                </div>
              </div>
              <div class="d-grid mb-0 text-center">
                <button class="btn btn-primary" @click="iniciarSesion()">
                  <i class="mdi mdi-login"></i> Log In
                </button>
              </div>
              <!-- social-->
              <div class="text-center mt-4">
                <p class="text-muted font-16">Sign in with</p>
                <ul class="social-list list-inline mt-3">
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item border-primary text-primary"
                      ><i class="mdi mdi-facebook"></i
                    ></a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item border-danger text-danger"
                      ><i class="mdi mdi-google"></i
                    ></a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item border-info text-info"
                      ><i class="mdi mdi-twitter"></i
                    ></a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item border-secondary text-secondary"
                      ><i class="mdi mdi-github"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- end form-->

            <!-- Footer-->
            <footer class="footer footer-alt">
              <p class="text-muted">
                Don't have an account?
                <a href="pages-register-2.html" class="text-muted ms-1"
                  ><b>Sign Up</b></a
                >
              </p>
            </footer>
          </div>
          <!-- end .card-body -->
        </div>
        <!-- end .align-items-center.d-flex.h-100-->
      </div>
      <!-- end auth-fluid-form-box-->

      <!-- Auth fluid right content -->
      <div class="auth-fluid-right text-center">
        <div class="auth-user-testimonial">
          <h2 class="mb-3">I love the color!</h2>
          <p class="lead">
            <i class="mdi mdi-format-quote-open"></i> It's a elegent templete. I
            love it very much! . <i class="mdi mdi-format-quote-close"></i>
          </p>
          <p>- Hyper Admin User</p>
        </div>
        <!-- end auth-user-testimonial-->
      </div>
      <!-- end Auth fluid right content -->
    </div>
    <!-- end auth-fluid-->

    <!-- bundle -->
  </body>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "Juan Pablo Valenci",
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
          this.$store.state.alert_color = 'danger';
          console.log("error 400");
        }
      }
    },
  },
  computed: {
    ...mapState(["alert", "alert_msg", 'alert_color']),
  },
  created() {
    if (localStorage.auth) {
      if (localStorage.auth == "1") {
        this.$router.push("/");
      } else {
        if (localStorage.auth == "2") {
          this.$store.state.alert = true;
          this.$store.state.alert_msg = "Inicio de sesion expirado";
          this.$store.state.alert_color = "warning";
        }
        // this.$router.push("/login");
      }
    } else {
      localStorage.clear();
      localStorage.auth = 0;
    }
  },
};
</script>
