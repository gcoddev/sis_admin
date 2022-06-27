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
import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/NavBar.vue";
import { mapState } from "vuex";

export default {
  name: "appWrapper",
  data() {
    return {};
  },
  components: {
    SideBar,
    Footer,
    NavBar,
  },
  computed: {
    ...mapState(["userAdminData"]),
  },
  methods: {
    async getAdminData() {
      if (localStorage.credentialP) {
        try {
          let res = await this.axios.get(
            "/api/DatosUsuarioAdmin/" + localStorage.credentialP
          );
          this.$store.state.userAdminData = res.data;

          if (res.data.roles == "ADMINISTRADOR") {
            this.getInstitucion();
            this.getArea();
          } else {
            if (
              res.data.roles == "DIRECTOR" ||
              res.data.roles == "CENTRO_ESTUDIANTES"
            ) {
              this.$store.state.idCarr = res.data.insttitucion_id;
              this.getCarreraU(res.data.insttitucion_id);
            } else {
              if (res.data.roles == "SECRETARIA") {
                this.getInstitucion();
              } else {
                this.cerrarSesion();
              }
            }
          }
        } catch (error) {
          // console.log(error);
          if (error.response.status == 401) {
            this.getAdminData();
          } else {
            if (error.response.status == 500) {
              let theme = localStorage.theme;
              let un = localStorage.userAdminData;
              localStorage.clear();
              localStorage.theme = theme;
              localStorage.username = un;
              localStorage.auth = "4";
              location.reload();
            }
          }
        }
      } else {
        //
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
    async getInstitucion() {
      try {
        let res = await this.axios.get("/api/InstitucionUPEA/");
        this.$store.state.Institucion = res.data[0];
        this.cargando();
      } catch (error) {
        // console.log(error);
      }
    },
    async getArea() {
      try {
        let res = await this.axios.get("/api/area/");
        this.$store.state.Area = res.data;
      } catch (error) {
        // console.log(error);
      }
    },
    async getCarreraU(id) {
      try {
        let res = await this.axios.get("/api/UpeaCarrera/" + id);
        this.$store.state.CarreraU = res.data.Descripcion;
        this.$store.state.nombreCarr = res.data.Descripcion.carrera;
        this.cargando();
      } catch (error) {
        // console.log(error);
      }
    },
    cargando() {
      document.getElementById("loading_wrapper").style.visibility = "hidden";
      this.$swal({
        icon: "success",
        title: localStorage.msg,
        timer: 2000,
        showConfirmButton: false,
      });
    },
  },
  created() {
    if (localStorage.auth) {
      if (localStorage.auth == 1) {
        this.getAdminData();
      } else {
        this.$router.push("/login");
      }
    } else {
      //
    }
  },
};
</script>