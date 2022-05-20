<template>
  <div>
    <div
      class="d-flex justify-content-center align-items-center"
      id="loading_wrapper"
    >
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div>
      <div class="wrapper">
        <!-- side bar left -->
        <SideBar />

        <div class="content-page">
          <div class="content">
            <NavBar />
            <!-- content -->
            <router-view />

            <!-- foooter -->
            <Footer />
          </div>
        </div>
      </div>
      <div class="rightbar-overlay"></div>
    </div>
  </div>
</template>

<style scoped>
#loading_wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.777);
  z-index: 2000;
}
</style>

<script>
// import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/NavBar.vue";
import { mapState } from "vuex";

export default {
  name: "appWrapper",
  data() {
    return {
    };
  },
  components: {
    // Header,
    SideBar,
    Footer,
    NavBar,
  },
  computed: {
    ...mapState(["userAdminData", "Institucion"]),
  },
  methods: {
    async getAdminData() {
      console.log("getAdminData");
      if (localStorage.credentialP) {
        try {
          let res = await this.axios.get(
            "/api/DatosUsuarioAdmin/" + localStorage.credentialP
          );
          this.$store.state.userAdminData = res.data;

          this.getInstitucion();
          this.getArea();
        } catch (error) {
          if (error.response.status == 401) {
            this.getAdminData();
          } else {
            if (error.response.status == 500) {
              localStorage.clear()
              localStorage.auth = '4'
              location.reload()
            }
          }
        }
      } else {
        console.log("no credentialP");
      }
    },
    async getInstitucion() {
      console.log("getInstitucion");
      try {
        let res = await this.axios.get(
          this.userAdminData.rutas[0].tab_link_funcion
        );
        this.$store.state.Institucion = res.data[0];
        // if (Object.keys(this.Institucion).length === 0) {
        //   console.log("vacio");
        // }
      } catch (error) {
        this.getInstitucion();
      }
    },
    async getArea() {
      console.log("getArea");
      try {
        let res = await this.axios.get("/api/area/");
        this.$store.state.Area = res.data;
      } catch (error) {
        // console.log(error);
        this.getArea();
      }
    },
  },
  created() {
    if (localStorage.auth) {
      if (localStorage.auth == 1) {
        console.log("iniciado sesion");
        this.getAdminData();
      } else {
        this.$router.push("/login");
      }
    } else {
      console.log("no local auth");
    }
  },
};
</script>