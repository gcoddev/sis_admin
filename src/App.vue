<template>
  <router-view />
</template>

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
          this.$router.push("/");
        } else {
          if (error.response.status == 500) {
            let theme = localStorage.theme;
            let un = localStorage.username;
            localStorage.clear();
            localStorage.theme = theme;
            localStorage.username = un;
            localStorage.auth = 2;
            this.$router.push("/login");
          }
        }
      } catch (error) {
        if (error.response.status == 500) {
          let theme = localStorage.theme;
          let un = localStorage.username;
          localStorage.clear();
          localStorage.theme = theme;
          localStorage.username = un;
          localStorage.auth = 2;
          this.$router.push("/login");
        } else {
          if (error.code == "ERR_NETWORK") {
            this.cerrarSesion()
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
    cerrarSesion() {
      let theme = localStorage.theme;
      let un = localStorage.username;
      localStorage.clear();
      localStorage.theme = theme;
      localStorage.username = un;
      localStorage.auth = "4";
      location.reload();
    },
  },
  created() {
    if (localStorage.theme) {
      document.getElementsByTagName("body")[0].dataset.layoutColor =
        localStorage.theme;
      document.getElementsByTagName("body")[0].dataset.leftbarTheme =
        localStorage.theme;
    } else {
      localStorage.theme = "light";
    }

    if (localStorage.token) {
      this.verificarToken(localStorage.token);
    } else {
      if (localStorage.auth) {
        this.$router.push("/login");
      } else {
        localStorage.auth = 0;
      }
    }
  },
};
</script>
