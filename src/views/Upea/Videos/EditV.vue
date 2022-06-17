<template>
  <div class="container-fluid">
    <h1>Editar Video</h1>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center">Editar video</h2>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="video_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="video_titulo"
                  placeholder="Titulo video"
                  v-model="video_titulo"
                  aria-placeholder="Titulo del video"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="video_enlace"
                  >Enlace video:</label
                >
                <div class="input-group flex-nowrap">
                  <input
                    type="text"
                    class="form-control"
                    id="video_enlace"
                    placeholder="https://www.youtube.com/watch?v="
                    aria-label="enlace"
                    aria-describedby="basic-addon1"
                    v-model="enlace"
                  />
                  <span class="input-group-text" id="basic-addon1"
                    ><i class="mdi mdi-youtube"></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="video_breve_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="video_breve_descripcion"
                  class="form-control"
                  rows="5"
                  placeholder="Descripcion del video"
                  v-model="video_breve_descripcion"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="ratio ratio-16x9">
                <iframe :src="Video.video_enlace" allowfullscreen />
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
        <div class="card-footer d-flex flex-row-reverse">
          <button type="button" class="btn btn-success ms-2" @click="validar()">
            Actualizar
          </button>
          <button class="btn btn-secondary" @click="clickInstitucion()">
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "edit_p",
  data() {
    return {
      Video: {},
      video_titulo: "",
      video_breve_descripcion: "",
      enlace: "https://www.youtube.com/watch?v=",
      video_enlace: "",
    };
  },
  computed: {
    ...mapState(["idPGEVM", "url_api"]),
  },
  methods: {
    async getVideo() {
      try {
        let res = await this.axios.get("/api/Videos/" + this.idPGEVM);
        this.Video = res.data.Descripcion;
        this.video_titulo = this.Video.video_titulo;
        this.video_breve_descripcion = this.Video.video_breve_descripcion;
        this.enlace = this.enlace + this.Video.video_enlace.substr(-11, 11);
      } catch (error) {
        console.log("error getVideo");
        console.log(error);
      }
    },
    validar() {
      if (this.video_titulo != "") {
        if (this.video_breve_descripcion != "") {
          if (this.enlace != "") {
            if (this.enlace.substr(12, 7) == "youtube") {
              let sep = this.enlace.split("watch?v=");
              if (sep[1].length == 11) {
                this.video_enlace = "https://www.youtube.com/embed/" + sep[1];
                this.updateVideo();
              } else {
                this.alertDisplay("No es un video de youtube", "warning", 1500);
              }
            } else {
              this.alertDisplay("No es un video de youtube", "warning", 1500);
            }
          } else {
            this.alertDisplay("Enlace vacio", "warning", 1500);
          }
        } else {
          this.alertDisplay("Descripcion vacio", "warning", 1500);
        }
      } else {
        this.alertDisplay("Titulo vacio", "warning", 1500);
      }
    },
    clickInstitucion() {
      this.$store.state.getter = true;
      this.$router.push("/videos");
    },
    async updateVideo() {
      let putVideo = {
        video_titulo: this.video_titulo,
        video_breve_descripcion: this.video_breve_descripcion,
        video_enlace: this.video_enlace,
      };
      try {
        let res = await this.axios.put("/api/Videos/" + this.idPGEVM, putVideo);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Actualizado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickInstitucion();
      } catch (error) {
        console.log("error updateVideo");
        console.log(error);
      }
    },
    alertDisplay(msg, icon, time) {
      this.$swal({
        title: msg,
        icon: icon,
        showConfirmButton: true,
        timer: time,
      });
    },
  },
  created() {
    this.getVideo();
  },
};
</script>