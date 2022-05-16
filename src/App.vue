<template>
  <router-view />
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    async verificarToken(tokenRes) {
      try {
        let res = await this.axios.post("/api/VerificarToken/", {
          token: tokenRes,
        });
        if (res.status == 200) {
          console.log("token valido");
          this.axios.defaults.headers = {
            Authorization: "Bearer " + tokenRes,
          };
          localStorage.auth = 1;
          this.$router.push('/')
        } else {
          if (error.response.status == 500) {
            localStorage.clear();
            localStorage.auth = 2;
            this.$router.push("/login");
            // location.reload();
          }
        }
      } catch (error) {
        if (error.response.status == 500) {
          localStorage.clear();
          localStorage.auth = 2;
          this.$router.push("/login");
          // location.reload();
        }
      }
    },
  },
  created() {
    if (localStorage.themeBody) {
      document.getElementsByTagName("body")[0].dataset.layoutColor =
        localStorage.themeBody;
    } else {
      localStorage.themeBody = "light";
    }

    if (localStorage.token) {
      console.log("yes token");
      this.verificarToken(localStorage.token);
    } else {
      console.log("no token");
      // localStorage.clear();
      localStorage.auth = 0;
    }
  },
  // updated() {
  //   if (localStorage.auth == 1) {
  //     console.log("/");
  //     this.$router.push("/");
  //   } else {
  //     console.log("auth no 1");
  //     if (localStorage.auth == 2) {
  //       console.log("auth 2");
  //       this.$store.state.alert = true;
  //       this.$store.state.alert_msg = "Inicio de sesion expirado";
  //     }
  //     console.log("/login");
  //     this.$router.push("/login");
  //   }
  // },
};
</script>
