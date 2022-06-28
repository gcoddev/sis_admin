<template>
  <div>
    <div id="loading_upea">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-12">
          <div class="card border-info border ribbon-box">
            <div class="card-body">
              <div class="ribbon ribbon-info float-start">
                &nbsp; UNIVERSIDAD PUBLICA DE EL ALTO
                <i class="mdi mdi-access-point me-1"></i>
              </div>
              <button class="btn btn-info float-end mt-0 mb-3" @click="newP()">
                Crear nuevo
              </button>
              <ul class="fs-4">
                <div class="ribbon-content text-info">
                  Total publicaciones: <b>{{ Publicaciones.length }}</b>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div v-if="Publicaciones.length == 0">
            <h1 class="text-center text-dark">Sin publicaciones</h1>
          </div>
          <div
            v-else
            v-for="(pub, id_pub) of Publicaciones"
            :key="id_pub"
            class="col-12 col-md-4 col-xl-3 col-xxl-2"
          >
            <a
              class="card card-pub ribbon-box tipoC w-100"
              data-bs-toggle="modal"
              :data-bs-target="'#modal_pub_' + id_pub"
            >
              <div class="card-body">
                <div class="ribbon float-start ribbon-info">
                  <i class="mdi mdi-access-point me-1"></i
                  ><span>{{ pub.publicaciones_tipo }}</span>
                </div>
                <h5 class="text-dark float-end mt-0">
                  {{ pub.publicaciones_documento }}
                </h5>
                <div class="ribbon-content">
                  <img
                    :src="
                      url_api + '/Publicaciones/' + pub.publicaciones_imagen
                    "
                    alt="img"
                    class="card-img-top"
                  />
                  <div class="card-title fw-bold mt-2">
                    {{ pub.publicaciones_titulo }}
                  </div>
                  <pre
                    class="card-text contenedor_card"
                    style="max-height: 200px; overflow-y: scroll"
                    v-html="pub.publicaciones_descripcion"
                  ></pre>
                </div>
              </div>
              <div class="card-footer pt-3">
                <p><b>Autor:</b> {{ pub.publicaciones_autor }}</p>
                <p><b>Fecha:</b> {{ dmy(pub.publicaciones_fecha) }}</p>
              </div>
            </a>

            <div
              class="modal fade"
              :id="'modal_pub_' + id_pub"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              :aria-labelledby="'modal_pub_label_' + id_pub"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title text-dark" :id="'modal_pub_label_' + id_pub">
                      {{ pub.publicaciones_titulo }}
                    </h3>
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
                            '/Publicaciones/' +
                            pub.publicaciones_imagen
                          "
                          target="_blank"
                          ><img
                            :src="
                              url_api +
                              '/Publicaciones/' +
                              pub.publicaciones_imagen
                            "
                            alt="img"
                            class="card-img-top h-auto img-modal"
                        /></a>
                      </div>
                      <div class="col-12 col-md-7">
                        <pre
                          class="card-text contenedor_card p-2"
                          style="overflow-y: scroll"
                          v-html="pub.publicaciones_descripcion"
                        ></pre>
                      </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                      <div class="ms-3">
                        <p><b>Autor:</b> {{ pub.publicaciones_autor }}</p>
                        <p><b>Fecha:</b> {{ dmy(pub.publicaciones_fecha) }}</p>
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
                              'la publicacion',
                              pub.publicaciones_id,
                              pub.publicaciones_imagen
                            )
                          "
                        >
                          <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                          Eliminar
                        </button>
                        <button
                          data-bs-dismiss="modal"
                          class="btn btn-warning ms-2"
                          @click="editP(pub.publicaciones_id)"
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
</template>

<style scoped>
#loading_upea {
  position: fixed;
  background-color: var(--ct-body-bg);
  width: 100vw;
  height: 100vh;
  z-index: 2000;
}
#loading_upea > div {
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
.tipoC {
  float: left;
}
.card-pub {
  opacity: 0.7;
  transition: transform 0.5s;
  user-select: none;
  cursor: pointer;
  color: var(--ct-body-color);
}
.card-pub:hover {
  transform: scale(107%);
  opacity: 1;
}
.img-modal {
  transition: transform 0.5s;
}
.img-modal:hover {
  transform: scale(95%);
}
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "publicaciones",
  data() {
    return {
      Publicaciones: [],
    };
  },
  computed: {
    ...mapState(["Institucion", "getter", "ev", "evTitle", "evMsg", "url_api"]),
  },
  methods: {
    async getPublicaciones() {
      try {
        let res = await this.axios.get(
          "/api/publicacionesAll/" + this.Institucion.institucion_id
        );
        this.Publicaciones = res.data;
        // console.log(this.Publicaciones);
        this.cargando();
      } catch (error) {
        console.log("error getPublicaciones");
        console.log(error);
      }
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
    editP(idP) {
      this.$store.state.idPGEVM = idP;
      this.$router.push("/edit_p/" + idP);
    },
    async deleteP(id, img) {
      try {
        let res = await this.axios.delete(
          "/api/publicaciones/" + id + "/" + img
        );
        this.getPublicaciones();
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        console.log("error deleteCCA");
        // console.log(error);
        if (error.response.status == 500) {
          this.getPublicaciones();
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
          this.deleteP(id, img);
        }
      });
    },
    alertDisplay(msg, icon, time) {
      this.$swal({
        title: msg,
        icon: icon,
        showConfirmButton: false,
        timer: time,
      });
    },
    cargando() {
      document.getElementById("loading_upea").style.visibility = "hidden";
    },
    newP() {
      this.$router.push("/new_p/" + this.Institucion.institucion_id);
    },
  },
  created() {
    if (this.getter) {
      this.getPublicaciones();
      this.$store.state.getter = false;
      if (this.ev == 1) {
        this.$swal(this.evTitle, this.evMsg, "success");
        this.$store.state.ev = 0;
        this.$store.state.evTitle = "";
        this.$store.state.evMsg = "";
      }
    }
  },
  updated() {
    // this.getPublicaciones();
  },
};
</script>