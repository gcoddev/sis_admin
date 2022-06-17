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
              <button
                class="btn btn-info float-end mt-0 mb-3"
                @click="nuevoV()"
              >
                Crear nuevo
              </button>
              <ul class="fs-4">
                <div class="ribbon-content text-info">
                  Total videos: <b>{{ Videos.length }}</b>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div v-if="Videos.length == 0">
            <h1 class="text-center">Sin videos</h1>
          </div>
          <div
            v-else
            v-for="(vid, id_vid) of Videos"
            :key="id_vid"
            class="col-12 col-md-6 col-xxl-4"
          >
            <a
              class="card card-gac ribbon-box tipoC w-100"
              data-bs-toggle="modal"
              :data-bs-target="'#modal_vid_' + id_vid"
            >
              <div class="card-body">
                <div
                  class="ribbon float-start"
                  :class="[
                    vid.video_estado == '1'
                      ? 'ribbon-success'
                      : 'ribbon-danger',
                  ]"
                >
                  <i class="mdi mdi-access-point me-1"></i
                  ><span
                    v-html="[vid.video_estado == '1' ? 'Activo' : 'Inactivo']"
                  ></span>
                </div>
                <h5 class="text-dark float-end mt-0">Videos</h5>
                <div class="ribbon-content">
                  <div style="position: relative">
                    <div class="ratio ratio-16x9" style="position: absolute">
                      <iframe :src="vid.video_enlace" controls="false"></iframe>
                    </div>
                    <div
                      class="ratio ratio-16x9"
                      style="background-color: transparent"
                    ></div>
                  </div>
                  <div class="card-title fw-bold mt-2">
                    {{ vid.video_titulo }}
                  </div>
                  <pre
                    class="card-text contenedor"
                    v-html="vid.video_breve_descripcion"
                    style="max-height: 100px; overflow-y: scroll"
                  ></pre>
                </div>
              </div>
            </a>

            <div
              class="modal fade"
              :id="'modal_vid_' + id_vid"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              :aria-labelledby="'modal_vid_label_' + id_vid"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" :id="'modal_vid_label_' + id_vid">
                      {{ vid.video_titulo }}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-hidden="true"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="ratio ratio-16x9">
                          <iframe
                            :src="vid.video_enlace"
                            class="card-img-top"
                            :id="'vid_' + id_vid"
                            allowfullscreen
                          />
                        </div>
                        <pre
                          class="card-text contenedor p-2"
                          v-html="vid.video_breve_descripcion"
                          style="overflow-y: scroll"
                        ></pre>
                      </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-end">
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
                          @click="deleteMsg('el video', vid.video_id)"
                        >
                          <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                          Eliminar
                        </button>
                        <button
                          data-bs-dismiss="modal"
                          class="btn btn-warning ms-2"
                          @click="editV(vid.video_id)"
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
.card-gac {
  opacity: 0.7;
  transition: transform 0.5s;
  user-select: none;
  cursor: pointer;
  color: var(--ct-body-color);
}
.card-gac:hover {
  transform: scale(105%);
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
  name: "videos",
  data() {
    return {
      Videos: [],
    };
  },
  computed: {
    ...mapState(["Institucion", "getter", "ev", "evTitle", "evMsg", "url_api"]),
  },
  methods: {
    async getVideos() {
      try {
        let res = await this.axios.get(
          "/api/VideosAll/" + this.Institucion.institucion_id
        );
        this.Videos = res.data;
        this.cargando();
      } catch (error) {
        console.log("error getVideos");
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
    editV(idV) {
      this.$store.state.idPGEVM = idV;
      this.$router.push("/edit_v/" + idV);
    },
    async deleteV(id) {
      try {
        let res = await this.axios.delete("/api/Videos/" + id);
        this.getVideos();
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        // console.log("error deleteV");
        console.log(error);
        if (error.response.status == 500) {
          this.getVideos();
          this.cargando();
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        }
      }
    },
    deleteMsg(title, id) {
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
          this.deleteV(id);
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
    nuevoV() {
      this.$router.push("/new_v/" + this.Institucion.institucion_id);
    },
  },
  created() {
    if (this.getter) {
      this.getVideos();
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