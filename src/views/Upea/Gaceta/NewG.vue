<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center text-dark">Nueva gaceta</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="gaceta_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="gaceta_titulo"
                  placeholder="Titulo"
                  v-model="gaceta_titulo"
                  aria-placeholder="Titulo de la gaceta"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label class="form-label" for="gaceta_fecha">Fecha:</label>
                <input
                  type="date"
                  id="gaceta_fecha"
                  class="form-control"
                  v-model="gaceta_fecha"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group mt-2">
                <label for="gaceta_documento" class="form-label"
                  >Documento Gaceta:</label
                >
                <input
                  type="file"
                  id="gaceta_documento"
                  class="form-control"
                  @change="onFileChange()"
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
  name: "new_g",
  data() {
    return {
      gaceta_titulo: "",
      gaceta_fecha: "",
      gaceta_documento: null,
    };
  },
  computed: {
    ...mapState(["Institucion"]),
  },
  methods: {
    validar() {
      if (this.gaceta_titulo != "") {
        if (this.gaceta_fecha != "") {
          if (this.gaceta_documento != null) {
            // this.createGaceta();
            if (this.gaceta_documento.type == "application/pdf") {
              this.createGaceta();
            } else {
              this.alertDisplay(
                "Tipo de documento no admitido",
                "warning",
                1500
              );
            }
          } else {
            this.alertDisplay("Documento vacio", "warning", 1500);
          }
        } else {
          this.alertDisplay("Fecha vacio", "warning", 1500);
        }
      } else {
        this.alertDisplay("Titulo vacio", "warning", 1500);
      }
    },
    clickInstitucion() {
      this.$store.state.getter = true;
      this.$router.push("/gaceta");
    },
    onFileChange() {
      let doc = document.querySelector("#gaceta_documento");
      this.gaceta_documento = doc.files[0];
    },
    async createGaceta() {
      let postGaceta = {
        gaceta_titulo: this.gaceta_titulo,
        gaceta_fecha: this.gaceta_fecha,
        gaceta_documento: this.gaceta_documento,
      };
      try {
        let res = await this.axios.post(
          "/api/gacetaunivAll/" + this.Institucion.institucion_id,
          postGaceta,
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