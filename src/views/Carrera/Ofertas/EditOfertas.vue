<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center">{{ nombreCarr }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <img
              :src="
                url_api + '/Carrera/OfertasAcademicas/' + Oferta.ofertas_imagen
              "
              alt="Imagen oferta"
              class="col-12 col-md-5 h-100"
            />
            <div class="col-12 col-md-7">
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
                  rows="7"
                  placeholder="Descripcion"
                  v-model="ofertas_descripcion"
                ></textarea>
              </div>
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
            </div>

            <div class="col-12 col-md-6">
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
            </div>
            <div class="col-12 col-md-6">
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
            </div>
            <div class="col-12 col-md-6">
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
            </div>
            <div class="col-12 col-md-6">
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
            Editar oferta academica
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
      Oferta: {},
      ofertas_titulo: "",
      ofertas_descripcion: "",
      ofertas_inscripciones_ini: "",
      ofertas_inscripciones_fin: "",
      ofertas_fecha_examen: "",
      oferta_referencia: "",
      ofertas_imagen: null,
      oi: false,
    };
  },
  computed: {
    ...mapState(["url_api", "idCarr", "nombreCarr", "idSOV"]),
  },
  methods: {
    async getOferta() {
      try {
        let res = await this.axios.get("/api/OfertasAcademicas/" + this.idSOV);
        this.Oferta = res.data.Descripcion;
        let fecha;
        this.ofertas_titulo = this.Oferta.ofertas_titulo;
        this.ofertas_descripcion = this.Oferta.ofertas_descripcion;
        fecha = this.Oferta.ofertas_inscripciones_ini.substr(0, 10);
        this.ofertas_inscripciones_ini = fecha;
        fecha = this.Oferta.ofertas_inscripciones_fin.substr(0, 10);
        this.ofertas_inscripciones_fin = fecha;
        fecha = this.Oferta.ofertas_fecha_examen.substr(0, 10);
        this.ofertas_fecha_examen = fecha;
      } catch (error) {
        console.log("error getOferta");
        console.error(error);
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
                  if (this.oi) {
                    this.editImg();
                  }
                  this.editOfer()
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
    async editOfer() {
      let putOfer = {
        ofertas_titulo: this.ofertas_titulo,
        ofertas_descripcion: this.ofertas_descripcion,
        ofertas_inscripciones_ini: this.ofertas_inscripciones_ini,
        ofertas_inscripciones_fin: this.ofertas_inscripciones_fin,
        ofertas_fecha_examen: this.ofertas_fecha_examen,
        oferta_referencia: this.oferta_referencia,
      };
      try {
        let res = await this.axios.put(
          "/api/OfertasAcademicas/" + this.idSOV,
          putOfer
        );
        // console.log(res);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Editado";
        this.$store.state.evMsg = res.data.message;
        this.clickCarrera();
      } catch (error) {
        console.log("error editOfer");
        console.error(error);
        if (error.response.status == 500) {
          location.reload();
        }
      }
    },
    async editImgOfer() {
      let putImgOfer = {
        ofertas_imagen: this.ofertas_imagen,
      };
      try {
        let res = await this.axios.put(
          "/api/OfertasAcademicas/" +
            this.idSOV +
            "/" +
            this.Oferta.ofertas_imagen,
          putImgOfer,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } catch (error) {
        console.log("error editImgOfer");
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
    this.getOferta();
  },
};
</script>