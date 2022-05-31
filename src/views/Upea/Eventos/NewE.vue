<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center">Evento</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="evento_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="evento_titulo"
                  placeholder="Titulo"
                  v-model="evento_titulo"
                  aria-placeholder="Titulo del evento"
                />
              </div>
              <div class="form-group mt-2">
                <label for="evento_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="evento_descripcion"
                  class="form-control"
                  rows="12"
                  placeholder="Descripcion del evento"
                  v-model="evento_descripcion"
                ></textarea>
              </div>
            </div>

            <div class="col-12 col-md-6">
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
              <div class="form-group mt-2">
                <label class="form-label" for="evento_fecha">Fecha:</label>
                <input
                  type="date"
                  id="evento_fecha"
                  class="form-control"
                  v-model="evento_fecha"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="evento_hora">Hora:</label>
                <input
                  type="time"
                  id="evento_hora"
                  class="form-control"
                  v-model="evento_hora"
                />
              </div>
              <div class="form-group mt-2">
                <label for="evento_tipo" class="form-label">Tipo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="evento_tipo"
                  placeholder="Tipo del evento"
                  v-model="evento_tipo"
                />
              </div>
              <div class="form-group mt-2">
                <label for="evento_lugar" class="form-label">Lugar:</label>
                <input
                  type="text"
                  class="form-control"
                  id="evento_lugar"
                  placeholder="Lugar del evento"
                  v-model="evento_lugar"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex flex-row-reverse">
          <button type="button" class="btn btn-success ms-2" @click="validar()">
            Crear nuevo
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
  name: "name_p",
  data() {
    return {
      evento_titulo: "",
      evento_descripcion: "",
      evento_fecha: "",
      evento_hora: "",
      evento_tipo: "",
      evento_lugar: "",
      evento_imagen: null,
    };
  },
  computed: {
    ...mapState(["Institucion"]),
  },
  methods: {
    validar() {
      if (this.evento_titulo != "") {
        if (this.evento_descripcion != "") {
          if (this.evento_fecha != "") {
            if (this.evento_hora != "") {
              if (this.evento_tipo != "") {
                if (this.evento_lugar != "") {
                  if (this.evento_imagen != null) {
                    this.createEvento();
                  } else {
                    this.alertDisplay(
                      "Imagen de evento vacio",
                      "warning",
                      1500
                    );
                  }
                } else {
                  this.alertDisplay("Lugar del evento vacio", "warning", 1500);
                }
              } else {
                this.alertDisplay("Tipo vacio", "warning", 1500);
              }
            } else {
              this.alertDisplay("Hora del evento vacio", "warning", 1500);
            }
          } else {
            this.alertDisplay("Fecha del evento vacio", "warning", 1500);
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
    onFileChange() {
      let img = document.querySelector("#evento_imagen");
      this.evento_imagen = img.files[0];
    },
    async createEvento() {
      let postEvento = {
        evento_titulo: this.evento_titulo,
        evento_descripcion: this.evento_descripcion,
        evento_hora: this.evento_hora,
        evento_fecha: this.evento_fecha,
        evento_tipo: this.evento_tipo,
        evento_lugar: this.evento_lugar,
        evento_imagen: this.evento_imagen,
      };
      try {
        let res = await this.axios.post(
          "/api/eventoAll/" + this.Institucion.institucion_id,
          postEvento,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Creado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickInstitucion();
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
};
</script>