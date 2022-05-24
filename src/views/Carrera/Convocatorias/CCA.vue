<template>
  <div>
    <div id="loading_carrera">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container" id="cont_carr_error">
      <h1>Error al retornar datos de la carrera</h1>
    </div>
    <div class="container" id="cont_carr">
      <h1 class="text-uppercase">Carrera {{ nombreCarr }}</h1>
      <div class="container-fluid">
        <div class="row">
          <!-- nav -->
          <ul class="col-12 col-md-10 nav nav-tabs mb-3">
            <li class="nav-item">
              <a
                href="#inicio"
                data-bs-toggle="tab"
                aria-expanded="true"
                class="nav-link active"
              >
                <span class="d-none d-md-block">INICIO</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#convocatorias"
                data-bs-toggle="tab"
                aria-expanded="false"
                class="nav-link"
              >
                <span class="d-none d-md-block"
                  >CONVOCATORIAS &nbsp;<span class="badge bg-info">{{
                    filterConv.length
                  }}</span></span
                >
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#comunicados"
                data-bs-toggle="tab"
                aria-expanded="false"
                class="nav-link"
              >
                <span class="d-none d-md-block"
                  >COMUNICADOS &nbsp;<span class="badge bg-info">{{
                    filterCom.length
                  }}</span></span
                >
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#avisos"
                data-bs-toggle="tab"
                aria-expanded="false"
                class="nav-link"
              >
                <span class="d-none d-md-block"
                  >AVISOS &nbsp;<span class="badge bg-info">{{
                    filterAv.length
                  }}</span></span
                >
              </a>
            </li>
          </ul>
          <div class="col-12 col-md-2">
            <button class="btn btn-primary float-end" @click="newCCA()">
              Crear nuevo
            </button>
          </div>
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
          <div class="tab-pane" id="convocatorias">
            <div class="container-fluid">
              <div class="row">
                <div v-if="filterConv.length == 0">
                  <h1 class="text-center">Sin convocatorias</h1>
                </div>
                <div
                  v-else
                  class="
                    card
                    ribbon-box
                    tipoC
                    col-12 col-md-6 col-xl-4 col-xxl-3
                  "
                  v-for="(con, id_conv) of filterConv"
                  :key="id_conv"
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
                    <div class="ribbon-content">
                      <a
                        style="cursor: pointer"
                        data-bs-toggle="modal"
                        :data-bs-target="'#modal_conv_' + id_conv"
                      >
                        <img
                          :src="
                            'https://serviciopagina.upea.bo/Convocatorias/' +
                            con.con_foto_portada
                          "
                          alt="img"
                          class="card-img-top h-100"
                          style="max-height: 375px;"
                        />
                      </a>

                      <div class="card-title fw-bold mt-2">
                        {{ con.con_titulo }}
                      </div>
                      <div
                        class="card-text contenedor"
                        v-html="con.con_descripcion"
                        style="max-height: 200px; overflow-y: scroll"
                      ></div>
                    </div>
                  </div>
                  <div class="card-footer text-muted pt-3">
                    <p><b>Inicio:</b> {{ con.con_fecha_inicio }}</p>
                    <p><b>Fin:</b> {{ con.con_fecha_fin }}</p>
                  </div>

                  <div
                    class="modal fade"
                    :id="'modal_conv_' + id_conv"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    :aria-labelledby="'modal_conv_label_' + id_conv"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            :id="'modal_conv_label_' + id_conv"
                          >
                            {{ con.con_titulo }}
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
                              <img
                                :src="
                                  'https://serviciopagina.upea.bo/Convocatorias/' +
                                  con.con_foto_portada
                                "
                                alt="img"
                                class="card-img-top h-100"
                                style="max-height: 700px;"
                              />
                            </div>
                            <div class="col-12 col-md-7">
                              <div
                                class="card-text contenedor"
                                v-html="con.con_descripcion"
                                style="overflow-y: scroll"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="modal-footer d-flex justify-content-between"
                        >
                          <div class="text-muted ms-3">
                            <p><b>Inicio:</b> {{ con.con_fecha_inicio }}</p>
                            <p><b>Fin:</b> {{ con.con_fecha_fin }}</p>
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
                                  'aviso',
                                  con.idconvocatorias,
                                  con.con_foto_portada
                                )
                              "
                            >
                              <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                              Eliminar
                            </button>
                            <button
                              data-bs-dismiss="modal"
                              class="btn btn-warning ms-2"
                              @click="editCCA(con.idconvocatorias)"
                            >
                              <i class="mdi mdi-clipboard-edit-outline"></i
                              >&nbsp; Editar
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
          <div class="tab-pane" id="comunicados">
            <div class="container-fluid">
              <div class="row">
                <div v-if="filterCom.length == 0">
                  <h1 class="text-center">Sin comunicados</h1>
                </div>
                <div
                  v-else
                  class="
                    card
                    ribbon-box
                    tipoC
                    col-12 col-md-6 col-xl-4 col-xxl-3
                  "
                  v-for="(con, id_com) of filterCom"
                  :key="id_com"
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
                    <div class="ribbon-content">
                      <a
                        style="cursor: pointer"
                        data-bs-toggle="modal"
                        :data-bs-target="'#modal_com_' + id_com"
                      >
                        <img
                          :src="
                            'https://serviciopagina.upea.bo/Convocatorias/' +
                            con.con_foto_portada
                          "
                          alt="img"
                          class="card-img-top h-100"
                        />
                      </a>

                      <div class="card-title fw-bold mt-2">
                        {{ con.con_titulo }}
                      </div>
                      <div
                        class="card-text contenedor"
                        v-html="con.con_descripcion"
                        style="max-height: 150px; overflow-y: scroll"
                      ></div>
                    </div>
                  </div>
                  <div class="card-footer text-muted pt-3">
                    <p><b>Inicio:</b> {{ con.con_fecha_inicio }}</p>
                    <p><b>Fin:</b> {{ con.con_fecha_fin }}</p>
                  </div>

                  <div
                    class="modal fade"
                    :id="'modal_com_' + id_com"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    :aria-labelledby="'modal_com_label_' + id_com"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            :id="'modal_com_label_' + id_com"
                          >
                            {{ con.con_titulo }}
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
                              <img
                                :src="
                                  'https://serviciopagina.upea.bo/Convocatorias/' +
                                  con.con_foto_portada
                                "
                                alt="img"
                                class="card-img-top h-100"
                              />
                            </div>
                            <div class="col-12 col-md-7">
                              <div
                                class="card-text contenedor"
                                v-html="con.con_descripcion"
                                style="overflow-y: scroll"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="modal-footer d-flex justify-content-between"
                        >
                          <div class="text-muted ms-3">
                            <p><b>Inicio:</b> {{ con.con_fecha_inicio }}</p>
                            <p><b>Fin:</b> {{ con.con_fecha_fin }}</p>
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
                                  'aviso',
                                  con.idconvocatorias,
                                  con.con_foto_portada
                                )
                              "
                            >
                              <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                              Eliminar
                            </button>
                            <button
                              data-bs-dismiss="modal"
                              class="btn btn-warning ms-2"
                              @click="editCCA(con.idconvocatorias)"
                            >
                              <i class="mdi mdi-clipboard-edit-outline"></i
                              >&nbsp; Editar
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
          <div class="tab-pane" id="avisos">
            <div class="container-fluid">
              <div class="row">
                <div v-if="filterAv.length == 0">
                  <h1 class="text-center">Sin avisos</h1>
                </div>
                <div
                  v-else
                  class="
                    card
                    ribbon-box
                    tipoC
                    col-12 col-md-6 col-xl-4 col-xxl-3
                  "
                  v-for="(con, id_av) of filterAv"
                  :key="id_av"
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
                    <div class="ribbon-content">
                      <a
                        style="cursor: pointer"
                        data-bs-toggle="modal"
                        :data-bs-target="'#modal_av_' + id_av"
                      >
                        <img
                          :src="
                            'https://serviciopagina.upea.bo/Convocatorias/' +
                            con.con_foto_portada
                          "
                          alt="img"
                          class="card-img-top h-100"
                        />
                      </a>

                      <div class="card-title fw-bold mt-2">
                        {{ con.con_titulo }}
                      </div>
                      <div
                        class="card-text contenedor"
                        v-html="con.con_descripcion"
                        style="max-height: 200px; overflow-y: scroll"
                      ></div>
                    </div>
                  </div>
                  <div class="card-footer text-muted pt-3">
                    <p><b>Inicio:</b> {{ con.con_fecha_inicio }}</p>
                    <p><b>Fin:</b> {{ con.con_fecha_fin }}</p>
                  </div>

                  <div
                    class="modal fade"
                    :id="'modal_av_' + id_av"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    :aria-labelledby="'modal_av_label_' + id_av"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            :id="'modal_av_label_' + id_av"
                          >
                            {{ con.con_titulo }}
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
                              <img
                                :src="
                                  'https://serviciopagina.upea.bo/Convocatorias/' +
                                  con.con_foto_portada
                                "
                                alt="img"
                                class="card-img-top h-100"
                              />
                            </div>
                            <div class="col-12 col-md-7">
                              <div
                                class="card-text contenedor"
                                v-html="con.con_descripcion"
                                style="overflow-y: scroll"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="modal-footer d-flex justify-content-between"
                        >
                          <div class="text-muted ms-3">
                            <p><b>Inicio:</b> {{ con.con_fecha_inicio }}</p>
                            <p><b>Fin:</b> {{ con.con_fecha_fin }}</p>
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
                                  'aviso',
                                  con.idconvocatorias,
                                  con.con_foto_portada
                                )
                              "
                            >
                              <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                              Eliminar
                            </button>
                            <button
                              data-bs-dismiss="modal"
                              class="btn btn-warning ms-2"
                              @click="editCCA(con.idconvocatorias)"
                            >
                              <i class="mdi mdi-clipboard-edit-outline"></i
                              >&nbsp; Editar
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
.tipoC {
  float: left;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Carrera: {},
      filterConv: [],
      filterCom: [],
      filterAv: [],
    };
  },
  computed: {
    ...mapState(["idCarr", "nombreCarr", "getter", "idCCACS", "ev", "evMsg", "evTitle"]),
  },
  methods: {
    async getCarrera(id) {
      // console.log("getCarrera");
      try {
        let res = await this.axios.get("/api/UpeaCarrera/" + id);
        this.Carrera = res.data.Descripcion;
        document.getElementById("cont_carr_error").style.display = "none";
        document.getElementById("cont_carr").style.display = "block";
      } catch (error) {
        if (error.response.status == 500) {
          document.getElementById("cont_carr").style.display = "none";
          document.getElementById("cont_carr_error").style.display = "block";
          // console.log("Error al retornar datos de la carrera");
        }
      }
    },
    async getConvocatoriasAll(id) {
      // console.log("getConvocatoriasAll");
      try {
        let res = await this.axios.get("/api/convocatoriasAll/" + id);
        this.filterConv = [];
        this.filterCom = [];
        this.filterAv = [];
        res.data.forEach((con) => {
          if (con.tipo_conv_comun.tipo_conv_comun_titulo == "CONVOCATORIAS") {
            this.filterConv.push(con);
          } else {
            if (con.tipo_conv_comun.tipo_conv_comun_titulo == "COMUNICADOS") {
              this.filterCom.push(con);
            } else {
              if (con.tipo_conv_comun.tipo_conv_comun_titulo == "AVISOS") {
                this.filterAv.push(con);
              } else {
                //
              }
            }
          }
        });
      } catch (error) {
        // console.log("error getConvocatoriasAll: " + error);
      }
    },
    editCCA(idCCA) {
      this.$store.state.idCCACS = idCCA;
      this.$router.push("/edit_cca/" + idCCA);
    },
    async deleteCCA(id, img) {
      try {
        let res = await this.axios.delete(
          "/api/convocatorias/" + id + "/" + img
        );
        this.getConvocatoriasAll(this.idCarr);
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        // console.log("error deleteCCA: " + error);
      }
    },
    deleteMsg(title, id, img) {
      this.$swal({
        title: "Eliminar " + title,
        text: "Esta seguro de eliminar el " + title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCCA(id, img);
        }
      });
    },
    newCCA() {
      this.$router.push("/new_cca/" + this.idCarr);
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
  created() {
    if (this.getter) {
      this.getCarrera(this.idCarr);
      this.getConvocatoriasAll(this.idCarr);
      this.$store.state.getter = false;
      setTimeout(() => {
        document.getElementById("loading_carrera").style.display = "none";
        if (this.ev == 1) {
          this.$swal(this.evTitle, this.evMsg, "success");
          this.$store.state.ev = 0;
          this.$store.state.evTitle = '';
          this.$store.state.evMsg = '';
        }
      }, 3000);
    }
  },
  updated() {
    if (this.getter) {
      this.getCarrera(this.idCarr);
      this.getConvocatoriasAll(this.idCarr);
      this.$store.state.getter = false;
      document.getElementById("loading_carrera").style.display = "block";
      setTimeout(() => {
        document.getElementById("loading_carrera").style.display = "none";
      }, 3000);
    }
  },
};
setTimeout(() => {
  document.getElementById("loading_carrera").style.display = "none";
}, 3000);
</script>