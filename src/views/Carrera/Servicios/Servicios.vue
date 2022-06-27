<template>
  <div>
    <div id="loading_carrera">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container-fluid pt-2" id="cont_carr_error">
      <h1>Error al retornar datos de la carrera</h1>
    </div>
    <div class="container-fluid pt-2" id="cont_carr">
      <h1 class="text-uppercase text-dark">Carrera {{ nombreCarr }}</h1>
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
                    Total servicios de carrera: <b>{{ Servicios.length }}</b>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <div class="row">
            <div v-if="Servicios.length == 0">
              <h1 class="text-center text-dark">Sin servicios de carrera</h1>
            </div>
            <div
              v-else
              v-for="(serv, id_serv) of Servicios"
              :key="id_serv"
              class="col-12 col-md-4 col-xl-3 col-xxl-2"
            >
              <a
                class="card card-serv ribbon-box tipoServ w-100"
                data-bs-toggle="modal"
                :data-bs-target="'#modal_serv_' + id_serv"
              >
                <div class="card-body">
                  <div
                        class="ribbon float-start"
                        :class="[
                          serv.serv_active == '1'
                            ? 'ribbon-success'
                            : 'ribbon-danger',
                        ]"
                      >
                        <i class="mdi mdi-access-point me-1"></i
                        ><span v-if="serv.serv_active == '1'"> Activo</span
                        ><span v-if="serv.serv_active != '1'"> Inactivo</span>
                      </div>
                  <h5 class="text-dark float-end mt-0">Servicio de carrera</h5>
                  <div class="ribbon-content">
                    <img
                      :src="url_api + '/Carrera/Servicios/' + serv.serv_imagen"
                      alt="img"
                      class="card-img-top"
                    />

                    <div class="card-title fw-bold mt-2">
                      {{ serv.serv_nombre }}
                    </div>
                    <pre
                      class="card-text contenedor_card"
                      v-html="serv.serv_descripcion"
                      style="max-height: 200px; overflow-y: scroll"
                    ></pre>
                  </div>
                </div>
                <div class="card-footer pt-3">
                  <p>
                    <b>Creado el:</b>
                    {{ dmy(serv.serv_registro) }}
                  </p>
                  <p>
                    <b>Actualizado el:</b>
                    {{ dmy(serv.serv_update) }}
                  </p>
                </div>
              </a>

              <div
                class="modal fade"
                :id="'modal_serv_' + id_serv"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                :aria-labelledby="'modal_serv_label_' + id_serv"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        :id="'modal_serv_label_' + id_serv"
                      >
                        {{ serv.serv_nombre }}
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
                              url_api + '/Carrera/Servicios/' + serv.serv_imagen
                            "
                            target="_blank"
                            ><img
                              :src="
                                url_api +
                                '/Carrera/Servicios/' +
                                serv.serv_imagen
                              "
                              alt="img"
                              class="card-img-top h-auto img-modal"
                          /></a>
                        </div>
                        <div class="col-12 col-md-7">
                          <div v-if="serv.imagen.length == 0">
                            <h1 class="text-dark">No hay imagenes</h1>
                          </div>
                          <div
                            v-else
                            id="galeria-servicio"
                            class="carousel slide w-100"
                            data-bs-ride="carousel"
                          >
                            <div class="carousel-inner">
                              <div
                                class="carousel-item"
                                data-bs-interval="2500"
                                v-for="(img_serv, id_is) of serv.imagen"
                                :key="id_is"
                                :class="[id_is === 0 ? 'active' : '']"
                              >
                                <div
                                  class="
                                    ev-img
                                    position-relative
                                    d-flex
                                    justify-content-center
                                    align-items-center
                                  "
                                >
                                  <div class="img-actions position-absolute">
                                    <label
                                      class="btn btn-sm btn-warning me-1"
                                      for="servicio_imagen-edit"
                                      data-bs-dismiss="modal"
                                    >
                                      <i
                                        class="mdi mdi-circle-edit-outline"
                                      ></i>
                                    </label>
                                    <input
                                      type="file"
                                      id="servicio_imagen-edit"
                                      class="d-none"
                                      @change="
                                        onFileChangeEdit(
                                          img_serv.serv_imag_id,
                                          img_serv.serv_imagen
                                        )
                                      "
                                    />
                                    <button
                                      class="btn btn-sm btn-danger ms-1"
                                      data-bs-dismiss="modal"
                                      @click="
                                        msgDeleteImg(
                                          img_serv.serv_imag_id,
                                          img_serv.serv_imagen
                                        )
                                      "
                                    >
                                      <i class="mdi mdi-delete"></i>
                                    </button>
                                  </div>

                                  <img
                                    class="d-block w-100 img-fluid"
                                    :src="
                                      url_api +
                                      '/Carrera/Servicios/Galeria/' +
                                      img_serv.serv_imagen
                                    "
                                    :alt="id_is"
                                    style="
                                      object-fit: cover;
                                      object-position: top;
                                    "
                                  />
                                </div>
                              </div>
                            </div>
                            <a
                              class="carousel-control-prev"
                              href="#galeria-servicio"
                              role="button"
                              data-bs-slide="prev"
                            >
                              <span
                                class="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span class="visually-hidden">Previous</span>
                            </a>
                            <a
                              class="carousel-control-next"
                              href="#galeria-servicio"
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
                          <pre
                            class="card-text contenedor_card p-2"
                            v-html="serv.serv_descripcion"
                            style="overflow-y: scroll"
                          ></pre>
                        </div>
                      </div>
                      <div class="modal-footer d-flex justify-content-between">
                        <div class="ms-3">
                          <p>
                            <b>Creado el:</b>
                            {{ dmy(serv.serv_registro) }}
                          </p>
                          <p>
                            <b>Actualizado el:</b>
                            {{ dmy(serv.serv_update) }}
                          </p>
                        </div>
                        <div>
                          <label
                            for="servicio_imagen"
                            class="btn btn-success"
                            data-bs-dismiss="modal"
                            >Agregar imagen a servicio</label
                          >
                          <input
                            type="file"
                            id="servicio_imagen"
                            class="d-none"
                            @change="onFileChangeImg(serv.serv_id)"
                          />
                          <button
                            type="button"
                            class="btn btn-secondary ms-2"
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
                                'el servicio',
                                serv.serv_id,
                                serv.serv_imagen
                              )
                            "
                          >
                            <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                            Eliminar
                          </button>
                          <button
                            data-bs-dismiss="modal"
                            class="btn btn-warning ms-2"
                            @click="editServ(serv.serv_id)"
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
.contenedor_card {
  overflow: auto;
  box-sizing: border-box;
  padding: 5px;
}
.contenedor_card::-webkit-scrollbar {
  -webkit-appearance: none;
}
.contenedor_card::-webkit-scrollbar:vertical {
  width: 10px;
}
.contenedor_card::-webkit-scrollbar-button:increment,
.contenedor_card::-webkit-scrollbar-button {
  display: none;
}
.contenedor_card::-webkit-scrollbar:horizontal {
  height: 10px;
}
.contenedor_card::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid var(--ct-card-bg);
}
.contenedor_card::-webkit-scrollbar-track {
  border-radius: 10px;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.tipoServ {
  float: left;
}
.card-serv {
  opacity: 0.7;
  transition: transform 0.5s;
  user-select: none;
  cursor: pointer;
  color: var(--ct-body-color);
}
.card-serv:hover {
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
.img-actions {
  opacity: 0;
  transition: opacity 0.3s;
}
.ev-img:hover .img-actions {
  opacity: 1;
  transition: opacity 0.3s;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Carrera: {},
      Servicios: {},
      servicio_imagen: null,
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
        this.getServicios();
      } catch (error) {
        if (error.response.status == 500) {
          document.getElementById("cont_carr").style.display = "none";
          document.getElementById("cont_carr_error").style.display = "block";
        }
      }
    },
    async getServicios() {
      try {
        let res = await this.axios.get("/api/ServicioAll/" + this.idCarr);
        this.Servicios = res.data;
        this.cargando();
      } catch (error) {
        // console.log("error getServicios");
        // console.error(error);
        if (error.response.status == 500) {
          this.getServicios();
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        }
      }
    },
    editServ(idS) {
      this.$store.state.idSOV = idS;
      this.$router.push("/edit_serv/" + idS);
    },
    async deleteServ(id, img) {
      try {
        let res = await this.axios.delete("/api/Servicio/" + id + "/" + img);
        this.getServicios(this.idCarr);
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        // console.log("error deleteOfer");
        // console.log(error);
        if (error.response.status == 500) {
          this.getServicios();
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
          this.deleteServ(id, img);
        }
      });
    },
    newServ() {
      this.$router.push("/new_serv/" + this.idCarr);
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
      document.querySelector("#loading_carrera").style.visibility = "hidden";

      if (this.ev == 1) {
        this.$swal(this.evTitle, this.evMsg, "success");
        this.$store.state.ev = 0;
        this.$store.state.evTitle = "";
        this.$store.state.evMsg = "";
      }
    },
    onFileChangeEdit(id, img) {
      let image = document.querySelector("#servicio_imagen-edit");
      this.servicio_imagen = image.files[0];
      this.editImg(id, img);
    },
    async editImg(id, img) {
      let putImg = {
        serv_imagen: this.servicio_imagen,
      };
      try {
        let res = await this.axios.put(
          "/api/ServicioGaleria/" + id + "/" + img,
          putImg,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        this.evento_imagen = null;
        this.$store.state.getter = true;
        this.getServicios();
        this.$swal("Editado", res.data.message, "success");
      } catch (error) {
        // console.log("error editImg");
        // console.log(error);
        if (error.response.status == 500) {
          this.getServicios();
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        }
      }
    },
    msgDeleteImg(id, img) {
      this.$swal({
        title: "Eliminar imagen",
        text: "Esta seguro de eliminar la imagen del evento",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteImg(id, img);
        }
      });
    },
    async deleteImg(id, img) {
      try {
        let res = await this.axios.delete(
          "/api/ServicioGaleria/" + id + "/" + img
        );
        this.$store.state.getter = true;
        this.getServicios();
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        // // console.log("deleteImg");
        // console.log(error);
        if (error.response.status == 500) {
          this.getServicios();
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        }
      }
    },
    onFileChangeImg(id) {
      let img = document.querySelector("#servicio_imagen");
      this.servicio_imagen = img.files[0];
      this.createImg(id);
    },
    async createImg(id) {
      let postImg = {
        serv_imagen: this.servicio_imagen,
      };
      try {
        let res = await this.axios.post(
          "/api/ServicioGaleriaAll/" + id,
          postImg,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        this.evento_imagen = null;
        this.$store.state.getter = true;
        this.getServicios();
        this.$swal("Agregado", res.data.message, "success");
      } catch (error) {
        // console.log("error postImg");
        // console.log(error);
        if (error.response.status == 500) {
          this.getServicios();
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        }
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
      this.getCarrera();
      this.$store.state.getter = false;
    }
  },
};
</script>