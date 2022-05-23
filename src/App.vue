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
        }
      }
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
      console.log("yes token");
      this.verificarToken(localStorage.token);
    } else {
      console.log("no token");
      if (localStorage.auth) {
        this.$router.push("/login");
      } else {
        localStorage.auth = 0;
      }
    }
  },
};
</script>
