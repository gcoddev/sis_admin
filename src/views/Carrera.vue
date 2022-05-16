<template>
  <div>
    <!-- <div id="loading_carrera">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div> -->
    <div class="container-fluid" id="cont_carr_error">
      <h1>Error al retornar datos de la carrera</h1>
    </div>
    <div class="container-fluid" id="cont_carr">
      <h1 class="text-uppercase">Carrera {{ getCarr }}</h1>
      <div class="container">
        <!-- nav -->
        <ul class="nav nav-tabs mb-3">
          <li class="nav-item">
            <a
              href="#inicio"
              data-bs-toggle="tab"
              aria-expanded="true"
              class="nav-link active"
            >
              <span class="d-none d-md-block">Inicio</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#comunicados"
              data-bs-toggle="tab"
              aria-expanded="false"
              class="nav-link"
            >
              <span class="d-none d-md-block">Comunicados</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#convocatorias"
              data-bs-toggle="tab"
              aria-expanded="false"
              class="nav-link"
            >
              <span class="d-none d-md-block">Convocatorias</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#cursos"
              data-bs-toggle="tab"
              aria-expanded="false"
              class="nav-link"
            >
              <span class="d-none d-md-block">Cursos</span>
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane show active" id="inicio">
            <div class="container-fluid">
              <div class="row">
                <div
                  class="col-12 col-md-6"
                  v-for="(frase, id_frase) of Carrera.frases"
                  :key="id_frase"
                >
                  <div class="card ribbon-box">
                    <div class="card-body">
                      <div class="ribbon ribbon-primary float-start">
                        <i class="mdi mdi-access-point me-1"></i
                        >{{ Carrera.carrera }}
                      </div>
                      <h5 class="text-primary float-end mt-0">
                        Frase {{ id_frase }}
                      </h5>
                      <div class="ribbon-content">{{ frase.frase }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <h2>Links</h2>
                  <div class="list-group">
                    <a
                      :href="link.url_links"
                      target="_blank"
                      class="list-group-item list-group-item-action"
                      v-for="(link, id_link) of Carrera.links"
                      :key="id_link"
                      >{{ link.nombre_links }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="comunicados">
            <div class="comunicados_carrera">
              <div
                id="carouselExampleInterval"
                class="carousel slide card-img-top"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div
                    class="carousel-item card"
                    v-bind:class="[id_conv == 0 ? 'active' : '']"
                    v-for="(conv, id_conv) of convocatoriasAll"
                    :key="id_conv"
                  >
                    <img
                      class="d-block w-100 img-fluid ribbon-content"
                      src="@/assets/images/small/small-4.jpg"
                      alt="First slide"
                    />
                    <div class="card-body">
                      <div class="card-title">{{ conv.con_titulo }}</div>
                      <pre
                        class="card-text mio"
                        v-html="conv.con_descripcion"
                      ></pre>
                      <!-- <div class="card-text mio" v-html="conv.con_descripcion"></div> -->
                    </div>
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleInterval"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon text-primary"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleInterval"
                  role="button"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="convocatorias">
            <div class="convocatorias_carrera">
              <h1>Convocatorias</h1>
            </div>
          </div>
          <div class="tab-pane" id="cursos">
            <div class="cursos_carrera">
              <h1>Cursos</h1>
            </div>
          </div>
        </div>
        <!-- nav end -->
      </div>
    </div>
  </div>
</template>

<style scoped>
#loading_carrera {
  position: fixed;
  background-color: var(--ct-body-bg);
  width: 100vw;
  height: 100vh;
  z-index: 2000;
}
#loading_carrera > div {
  position: absolute;
  left: 35%;
  top: 40%;
}
.mio {
  word-wrap: break-word;
  word-break: break-all;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Carrera: {},
      convocatoriasAll: {},
    };
  },
  computed: {
    getID() {
      return this.$route.params.id_car;
    },
    getSede() {
      return this.$route.params.sede;
    },
    getDireccion() {
      return this.$route.params.direccion;
    },
    getCarr() {
      return this.$route.params.carrera;
    },
    ...mapState(["getter"]),
  },
  methods: {
    async getCarrera(id) {
      console.log("getCarrera");
      try {
        let res = await this.axios.get("/api/UpeaCarrera/" + id);
        this.Carrera = res.data.Descripcion;
        document.getElementById("cont_carr_error").style.display = "none";
        document.getElementById("cont_carr").style.display = "block";
        console.log(this.Carrera);
      } catch (error) {
        if (error.response.status == 500) {
          document.getElementById("cont_carr").style.display = "none";
          document.getElementById("cont_carr_error").style.display = "block";
          console.log("Error al retornar datos de la carrera");
        }
      }
    },
    async getConvocatoriasAll(id) {
      console.log("getConvocatoriasAll");
      try {
        let res = await this.axios.get("/api/convocatoriasAll/" + id);
        this.convocatoriasAll = res.data;
        console.log(this.convocatoriasAll);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.getter) {
      this.getCarrera(this.getID);
      this.getConvocatoriasAll(this.getID);
      // setTimeout(() => {
      //   document.getElementById("loading_carrera").style.display = "none";
      // }, 2500);
    }
  },
  updated() {
    if (this.getter) {
      this.getCarrera(this.getID);
      this.getConvocatoriasAll(this.getID);
      this.$store.state.getter = false;
      // document.getElementById("loading_carrera").style.display = "block";
      // setTimeout(() => {
      //   document.getElementById("loading_carrera").style.display = "none";
      // }, 2500);
    }
  },
};
// setTimeout(() => {
//   document.getElementById("loading_carrera").style.visibility = "hidden";
// }, 2500);
</script>