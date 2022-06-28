<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center text-dark">{{ nombreCarr }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="ofertas_titulo" class="form-label"
                  >Titulo oferta academica:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="ofertas_titulo"
                  placeholder="Titulo"
                  v-model="ofertas_titulo"
                />
              </div>
              <div class="form-group mt-2">
                <label for="ofertas_descripcion" class="form-label"
                  >Descripcion oferta:</label
                >
                <textarea
                  id="ofertas_descripcion"
                  class="form-control"
                  rows="12"
                  placeholder="Descripcion"
                  v-model="ofertas_descripcion"
                ></textarea>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="ofertas_imagen" class="form-label"
                  >Imagen portada:</label
                >
                <input
                  type="file"
                  id="ofertas_imagen"
                  class="form-control"
                  @change="onFileChange()"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="ofertas_inscripciones_ini"
                  >Fecha inscripciones inicio:</label
                >
                <input
                  type="date"
                  id="ofertas_inscripciones_ini"
                  class="form-control"
                  v-model="ofertas_inscripciones_ini"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="ofertas_inscripciones_fin"
                  >Fecha inscripciones final:</label
                >
                <input
                  type="date"
                  id="ofertas_inscripciones_fin"
                  class="form-control"
                  v-model="ofertas_inscripciones_fin"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="ofertas_fecha_examen"
                  >Fecha de examen:</label
                >
                <input
                  type="date"
                  id="ofertas_fecha_examen"
                  class="form-control"
                  v-model="ofertas_fecha_examen"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="oferta_referencia"
                  >Referencia:</label
                >
                <input
                  type="text"
                  id="oferta_referencia"
                  class="form-control"
                  placeholder="Referencia oferta academica"
                  v-model="oferta_referencia"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex flex-row-reverse">
          <button type="button" class="btn btn-success ms-2" @click="validar()">
            Crear nuevo
          </button>
          <button class="btn btn-secondary" @click="clickCarrera()">
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
  name: "new_cca",
  data() {
    return {
      ofertas_titulo: "",
      ofertas_descripcion: "",
      ofertas_inscripciones_ini: "",
      ofertas_inscripciones_fin: "",
      ofertas_fecha_examen: "",
      oferta_referencia: "",
      ofertas_imagen: null,
    };
  },
  computed: {
    ...mapState(["idCarr", "nombreCarr"]),
  },
  methods: {
    async getTipoCon() {
      try {
        let res = await this.axios.get("/api/Tipoconvocatorias/");
        this.tipoC = res.data;
      } catch (error) {
        // console.log(error);
      }
    },
    clickCarrera() {
      this.$store.state.getter = true;
      this.$router.push("/ofer/" + this.idCarr);
    },
    validar() {
      // console.log("validar");
      if (this.ofertas_titulo != "") {
        if (this.ofertas_descripcion != "") {
          if (this.ofertas_inscripciones_ini != "") {
            if (this.ofertas_inscripciones_fin != "") {
              if (this.ofertas_fecha_examen != "") {
                if (this.oferta_referencia != "") {
                  if (this.ofertas_imagen != null) {
                    this.createOfer()
                  } else {
                    this.alertDisplay("Imagen servicio vacio", "warning", 1500);
                  }
                } else {
                  this.alertDisplay("Referencia vacio", "warning", 1500);
                }
              } else {
                this.alertDisplay("Tipo convocatoria vacio", "warning", 1500);
              }
            } else {
              this.alertDisplay("Fecha fin vacio", "warning", 1500);
            }
          } else {
            this.alertDisplay("Fecha inicio vacio", "warning", 1500);
          }
        } else {
          this.alertDisplay("Descripcion vacio", "warning", 1500);
        }
      } else {
        this.alertDisplay("Titulo vacio", "warning", 1500);
      }
    },
    onFileChange() {
      let img = document.querySelector("#ofertas_imagen");
      this.ofertas_imagen = img.files[0];
    },
    async createOfer() {
      let postOfer = {
        ofertas_titulo: this.ofertas_titulo,
        ofertas_descripcion: this.ofertas_descripcion,
        ofertas_inscripciones_ini: this.ofertas_inscripciones_ini,
        ofertas_inscripciones_fin: this.ofertas_inscripciones_fin,
        ofertas_fecha_examen: this.ofertas_fecha_examen,
        oferta_referencia: this.oferta_referencia,
        ofertas_imagen: this.ofertas_imagen,
      };
      try {
        let res = await this.axios.post(
          "/api/OfertasAcademicasAll/" + this.idCarr,
          postOfer,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // console.log(res);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Creado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickCarrera();
      } catch (error) {
        // console.log("error createOfer");
        console.error(error);
        if (error.response.status == 500) {
          location.reload();
        }
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
    this.getTipoCon();
  },
};
</script>