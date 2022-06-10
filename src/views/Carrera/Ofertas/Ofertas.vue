<template>
  <div>
    <div id="loading_carrera">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container-fluid pt-2" id="cont_carr_error">
      <h1>Error al retornar datos de la carrera</h1>
    </div>
    <div class="container-fluid pt-2" id="cont_carr">
      <h1 class="text-uppercase">Carrera {{ nombreCarr }}</h1>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card border-info border ribbon-box">
              <div class="card-body">
                <div class="ribbon ribbon-info float-start">
                  &nbsp; {{ Carrera.carrera }}
                  <i class="mdi mdi-access-point me-1"></i>
                </div>
                <button
                  class="btn btn-info float-end mt-0 mb-3"
                  @click="newOfer()"
                >
                  Crear nuevo
                </button>
                <ul class="fs-4">
                  <div class="ribbon-content text-info">
                    Total ofertas academicas: <b>{{ Ofertas.length }}</b>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div v-if="Ofertas.length == 0">
              <h1 class="text-center">Sin ofertas academicas</h1>
            </div>
            <div
              v-else
              v-for="(ofer, id_of) of Ofertas"
              :key="id_of"
              class="col-12 col-md-4 col-xl-3 col-xxl-2"
            >
              <a
                class="card card-cca tipoC w-100"
                data-bs-toggle="modal"
                :data-bs-target="'#modal_of_' + id_of"
              >
                <div class="card-body">
                  <h5 class="text-dark float-end mt-0">Oferta academica</h5>
                  <div class="ribbon-content">
                    <img
                      :src="
                        url_api +
                        '/Carrera/OfertasAcademicas/' +
                        ofer.ofertas_imagen
                      "
                      alt="img"
                      class="card-img-top"
                    />

                    <div class="card-title fw-bold mt-2">
                      {{ ofer.ofertas_titulo }}
                    </div>
                    <pre
                      class="card-text contenedor"
                      v-html="ofer.ofertas_descripcion"
                      style="max-height: 200px; overflow-y: scroll"
                    ></pre>
                  </div>
                </div>
                <div class="card-footer pt-3">
                  <p>
                    <b>Creado el:</b>
                    {{ dmy(ofer.ofertas_fecha_creacion) }}
                  </p>
                  <p>
                    <b>Actualizado el:</b>
                    {{ dmy(ofer.ofertas_fecha_update) }}
                  </p>
                  <p>
                    <b>Fecha de examen:</b>
                    {{ dmy(ofer.ofertas_fecha_examen) }}
                  </p>
                  <p>
                    <b>Fecha inscripcion inicio:</b>
                    {{ dmy(ofer.ofertas_inscripciones_ini) }}
                  </p>
                  <p>
                    <b>Fecha inscripcion final:</b>
                    {{ dmy(ofer.ofertas_inscripciones_fin) }}
                  </p>
                </div>
              </a>

              <div
                class="modal fade"
                :id="'modal_of_' + id_of"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                :aria-labelledby="'modal_of_label_' + id_of"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" :id="'modal_of_label_' + id_of">
                        {{ ofer.ofertas_titulo }}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-hidden="true"
                      ></button>
                    </div>
                    <!-- end modal header -->
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-12 col-md-5">
                          <a
                            :href="
                              url_api +
                              '/Carrera/OfertasAcademicas/' +
                              ofer.ofertas_imagen
                            "
                            target="_blank"
                            ><img
                              :src="
                                url_api +
                                '/Carrera/OfertasAcademicas/' +
                                ofer.ofertas_imagen
                              "
                              alt="img"
                              class="card-img-top h-auto img-modal"
                          /></a>
                        </div>
                        <div class="col-12 col-md-7">
                          <pre
                            class="card-text contenedor p-2"
                            v-html="ofer.ofertas_descripcion"
                            style="overflow-y: scroll"
                          ></pre>
                        </div>
                      </div>
                      <div class="modal-footer d-flex justify-content-between">
                        <div class="ms-3">
                          <p>
                            <b>Creado el:</b>
                            {{ dmy(ofer.ofertas_fecha_creacion) }}
                          </p>
                          <p>
                            <b>Actualizado el:</b>
                            {{ dmy(ofer.ofertas_fecha_update) }}
                          </p>
                          <p>
                            <b>Fecha de examen:</b>
                            {{ dmy(ofer.ofertas_fecha_examen) }}
                          </p>
                          <p>
                            <b>Fecha inscripcion inicio:</b>
                            {{ dmy(ofer.ofertas_inscripciones_ini) }}
                          </p>
                          <p>
                            <b>Fecha inscripcion final:</b>
                            {{ dmy(ofer.ofertas_inscripciones_fin) }}
                          </p>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger ms-2"
                            data-bs-dismiss="modal"
                            @click="
                              deleteMsg(
                                'la oferta',
                                ofer.ofertas_id,
                                ofer.ofertas_imagen
                              )
                            "
                          >
                            <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                            Eliminar
                          </button>
                          <button
                            data-bs-dismiss="modal"
                            class="btn btn-warning ms-2"
                            @click="editOfer(ofer.ofertas_id)"
                          >
                            <i class="mdi mdi-clipboard-edit-outline"></i>&nbsp;
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.tipoC {
  float: left;
}
.card-cca {
  opacity: 0.7;
  transition: transform 0.5s;
  user-select: none;
  cursor: pointer;
  color: var(--ct-body-color);
}
.card-cca:hover {
  transform: scale(107%);
  opacity: 1;
}
.img-modal {
  transform: scale(100%);
  transition: transform 0.5s;
}
.img-modal:hover {
  transform: scale(95%);
}
.img-modal:active {
  transform: scale(90%);
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Carrera: {},
      Ofertas: {},
    };
  },
  computed: {
    ...mapState([
      "idCarr",
      "nombreCarr",
      "getter",
      "idCCACS",
      "ev",
      "evMsg",
      "evTitle",
      "url_api",
    ]),
  },
  methods: {
    async getCarrera() {
      try {
        let res = await this.axios.get("/api/UpeaCarrera/" + this.idCarr);
        this.Carrera = res.data.Descripcion;
        document.getElementById("cont_carr_error").style.display = "none";
        document.getElementById("cont_carr").style.display = "block";
        this.getOfertas();
      } catch (error) {
        if (error.response.status == 500) {
          document.getElementById("cont_carr").style.display = "none";
          document.getElementById("cont_carr_error").style.display = "block";
        }
      }
    },
    async getOfertas() {
      try {
        let res = await this.axios.get(
          "/api/OfertasAcademicasAll/" + this.idCarr
        );
        this.Ofertas = res.data;
        this.cargando();
      } catch (error) {
        console.log("error getOfertas");
        // console.error(error);
      }
    },
    editOfer(idO) {
      this.$store.state.idSO = idO;
      this.$router.push("/edit_ofer/" + idO);
    },
    async deleteOfer(id, img) {
      try {
        let res = await this.axios.delete(
          "/api/OfertasAcademicas/" + id + "/" + img
        );
        this.getOfertas(this.idCarr);
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        console.log("error deleteOfer");
        // console.log(error);
        if (error.response.status == 500) {
          this.getOfertas();
          this.cargando();
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        }
      }
    },
    deleteMsg(title, id, img) {
      this.$swal({
        title: "Eliminar " + title,
        text: "Esta seguro de eliminar " + title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteOfer(id, img);
        }
      });
    },
    newOfer() {
      this.$router.push("/new_ofer/" + this.idCarr);
    },
    alertDisplay(msg, icon, time) {
      this.$swal({
        title: msg,
        icon: icon,
        showConfirmButton: false,
        timer: time,
      });
    },
    dmy(fecha) {
      let meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
      let dia = fecha.substr(8, 2);
      let mes = parseInt(fecha.substr(5, 2));
      let anio = fecha.substr(0, 4);
      return dia + " de " + meses[mes - 1] + " de " + anio;
    },
    cargando() {
      document.getElementById("loading_carrera").style.visibility = "hidden";
      if (this.ev == 1) {
        this.$swal(this.evTitle, this.evMsg, "success");
        this.$store.state.ev = 0;
        this.$store.state.evTitle = "";
        this.$store.state.evMsg = "";
      }
    },
  },
  created() {
    if (this.getter) {
      this.getCarrera();
      this.$store.state.getter = false;
    }
  },
  updated() {
    if (this.getter) {
      document.getElementById("loading_carrera").style.visibility = "visible";
      this.getCarrera();
      this.$store.state.getter = false;
    }
  },
};
</script>