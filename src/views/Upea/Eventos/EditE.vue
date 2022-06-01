<template>
  <div class="container-fluid">
    <h1>Editar publicacion</h1>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center">{{ Evento.evento_titulo }}</h2>
          <div class="row">
            <img
              :src="url_api + '/Eventos/' + Evento.evento_imagen"
              alt="Portada"
              class="col-12 col-md-5 h-100"
            />
            <div class="col-12 col-md-7">
              <div class="form-group mt-2">
                <label for="evento_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="evento_titulo"
                  placeholder="Titulo de publicacion"
                  v-model="evento_titulo"
                />
              </div>
              <div class="form-group mt-2">
                <label for="evento_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="evento_descripcion"
                  class="form-control"
                  rows="10"
                  placeholder="Descripcion de la publicacion"
                  v-model="evento_descripcion"
                ></textarea>
              </div>
              <div class="form-group mt-2">
                <label for="evento_imagen" class="form-label"
                  >Imagen portada:</label
                >
                <input
                  type="file"
                  id="evento_imagen"
                  class="form-control"
                  @change="onFileChange()"
                />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-label" for="con_fecha_inicio">Fecha:</label>
                <input
                  type="date"
                  id="evento_fecha"
                  class="form-control"
                  v-model="evento_fecha"
                  placeholder="Fecha del evento"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-label" for="evento_hora">Hora:</label>
                <input
                  type="time"
                  id="evento_hora"
                  class="form-control"
                  v-model="evento_hora"
                  placeholder="Hora del evento"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-label" for="evento_tipo">Tipo:</label>
                <input
                  type="text"
                  id="evento_tipo"
                  class="form-control"
                  v-model="evento_tipo"
                  placeholder="Nombre del autor"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-label" for="evento_lugar">Lugar:</label>
                <input
                  type="text"
                  id="evento_lugar"
                  class="form-control"
                  v-model="evento_lugar"
                  placeholder="Nombre del lugar"
                />
              </div>
            </div>
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
      Evento: {},
      evento_titulo: "",
      evento_descripcion: "",
      evento_fecha: "",
      evento_hora: "",
      evento_tipo: "",
      evento_lugar: "",
      evento_imagen: null,
      ev_img: false,
    };
  },
  computed: {
    ...mapState(["idPGE", "url_api"]),
  },
  methods: {
    async getEventos() {
      try {
        let res = await this.axios.get("/api/evento/" + this.idPGE);
        this.Evento = res.data.Descripcion;
        this.evento_titulo = this.Evento.evento_titulo;
        this.evento_descripcion = this.Evento.evento_descripcion;
        let fecha = this.Evento.evento_fecha.substr(0, 10);
        this.evento_fecha = fecha;
        this.evento_hora = this.Evento.evento_hora;
        this.evento_tipo = this.Evento.evento_tipo;
        this.evento_lugar = this.Evento.evento_lugar;
      } catch (error) {
        console.log(error);
      }
    },
    onFileChange() {
      let img = document.querySelector("#evento_imagen");
      this.evento_imagen = img.files[0];
      this.ev_img = true;
    },
    validar() {
      if (this.evento_titulo != "") {
        if (this.evento_descripcion != "") {
          if (this.evento_fecha != "") {
            if (this.evento_hora != "") {
              if (this.evento_tipo != "") {
                if (this.evento_lugar != "") {
                  if (this.ev_img) {
                    this.updateImageEvento();
                  }
                  this.updateEvento();
                } else {
                  this.alertDisplay("Lugar vacio", "warning", 1500);
                }
              } else {
                this.alertDisplay("Tipo vacio", "warning", 1500);
              }
            } else {
              this.alertDisplay("Hora vacio", "warning", 1500);
            }
          } else {
            this.alertDisplay("Fecha vacio", "warning", 1500);
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
      this.$router.push("/eventos");
    },
    async updateEvento() {
      let putEvento = {
        evento_titulo: this.evento_titulo,
        evento_descripcion: this.evento_descripcion,
        evento_fecha: this.evento_fecha,
        evento_hora: this.evento_hora,
        evento_tipo: this.evento_tipo,
        evento_lugar: this.evento_lugar,
      };
      try {
        let res = await this.axios.put("/api/evento/" + this.idPGE, putEvento);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Actualizado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickInstitucion();
      } catch (error) {
        console.log(error);
      }
    },
    async updateImageEvento() {
      let putImage = {
        evento_imagen: this.evento_imagen,
      };
      try {
        let res = await this.axios.put(
          "/api/evento/" + this.idPGE + "/" + this.Evento.evento_imagen,
          putImage,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } catch (error) {
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
    this.getEventos();
  },
};
</script>