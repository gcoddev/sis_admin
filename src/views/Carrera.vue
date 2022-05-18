<template>
  <div>
    <div id="loading_carrera">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container" id="cont_carr_error">
      <h1>Error al retornar datos de la carrera</h1>
    </div>
    <div class="container" id="cont_carr">
      <h1 class="text-uppercase">Carrera {{ getCarr }}</h1>
      <div class="container-fluid">
        <div class="row">
          <!-- nav -->
          <ul class="col-12 nav nav-tabs mb-3">
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
          </ul>
        </div>
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
            <div class="comunicados_carrera container-fluid">
              <div class="row">
                <div
                  class="col-12 col-md-6 col-xl-4 col-xxl-3 card ribbon-box"
                  v-for="(con, id_con) of convocatoriasAll"
                  :key="id_con"
                >
                  <div class="card-body">
                    <div
                      class="ribbon float-start"
                      :class="[
                        con.con_estado == '1'
                          ? 'ribbon-success'
                          : 'ribbon-danger',
                      ]"
                    >
                      <i class="mdi mdi-access-point me-1"></i
                      ><span v-if="con.con_estado == '1'"> Activo</span
                      ><span v-if="con.con_estado != '1'"> Inactivo</span>
                    </div>
                    <h5 class="text-dark float-end mt-0">
                      {{ con.tipo_conv_comun.tipo_conv_comun_titulo }}
                    </h5>
                    <div class="ribbon-con">
                      <a style="cursor: pointer">
                        <img
                          :src="
                            'https://serviciopagina.upea.bo/Convocatorias/' +
                            con.con_foto_portada
                          "
                          alt="img"
                          class="card-img-top"
                        />
                      </a>

                      <div class="card-title fw-bold mt-2">
                        {{ con.con_titulo }}
                      </div>
                      <pre
                        class="card-text contenedor"
                        v-html="con.con_descripcion"
                        style="max-height: 200px; overflow-y: scroll"
                      ></pre>
                    </div>
                  </div>
                  <div class="card-footer text-muted pt-3">
                    <p><b>Inicio:</b> {{ con.con_fecha_inicio }}</p>
                    <p><b>Fin:</b> {{ con.con_fecha_fin }}</p>
                  </div>
                </div>
              </div>
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
.contenedor {
  overflow: auto;
  box-sizing: border-box;
  padding: 5px;
}
.contenedor::-webkit-scrollbar {
  -webkit-appearance: none;
}
.contenedor::-webkit-scrollbar:vertical {
  width: 10px;
}
.contenedor::-webkit-scrollbar-button:increment,
.contenedor::-webkit-scrollbar-button {
  display: none;
}
.contenedor::-webkit-scrollbar:horizontal {
  height: 10px;
}
.contenedor::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid var(--ct-card-bg);
}
.contenedor::-webkit-scrollbar-track {
  border-radius: 10px;
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
      setTimeout(() => {
        document.getElementById("loading_carrera").style.display = "none";
      }, 3000);
    }
  },
  updated() {
    if (this.getter) {
      this.getCarrera(this.getID);
      this.getConvocatoriasAll(this.getID);
      this.$store.state.getter = false;
      document.getElementById("loading_carrera").style.display = "block";
      setTimeout(() => {
        document.getElementById("loading_carrera").style.display = "none";
      }, 3000);
    }
  },
};
setTimeout(() => {
  document.getElementById("loading_carrera").style.visibility = "hidden";
}, 3000);
</script>