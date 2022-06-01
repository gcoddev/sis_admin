<template>
  <div class="container-fluid">
    <h1>Editar publicacion</h1>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center">Editar gaceta</h2>
          <div class="row">
            <iframe
              :src="
                'http://docs.google.com/gview?url=' +
                url_api +
                '/Gaceta/' +
                Gac.gaceta_documento +
                '&embedded=true'
              "
              class="card-img-top col-12 col-md-6"
              height="500px"
            ></iframe>
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
      Gac: {},
      gaceta_titulo: "",
      gaceta_fecha: "",
      gaceta_documento: null,
      gdoc: false,
    };
  },
  computed: {
    ...mapState(["idPGE", "url_api"]),
  },
  methods: {
    async getGaceta() {
      try {
        let res = await this.axios.get("/api/gacetauniv/" + this.idPGE);
        this.Gac = res.data.Descripcion;
        // console.log(this.Pub);
        this.gaceta_titulo = this.Gac.gaceta_titulo;
        let fecha = this.Gac.gaceta_fecha.substr(0, 10);
        this.gaceta_fecha = fecha;
      } catch (error) {
        console.log(error);
      }
    },
    onFileChange() {
      let img = document.querySelector("#publicaciones_imagen");
      this.publicaciones_imagen = img.files[0];
      this.gdoc = true;
    },
    validar() {
      if (this.gaceta_titulo != "") {
        if (this.gaceta_fecha != "") {
          if (this.gdoc) {
            this.updatePDF();
          }
          this.updateGaceta();
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
    async updateGaceta() {
      console.log("updateGaceta");
      let putGaceta = {
        gaceta_titulo: this.gaceta_titulo,
        gaceta_fecha: this.gaceta_fecha,
      };
      try {
        let res = await this.axios.put(
          "/api/gacetauniv/" + this.idPGE,
          putGaceta
        );
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Actualizado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickInstitucion();
      } catch (error) {
        console.log("error updateGaceta");
        console.log(error);
      }
    },
    async updatePDF() {
      // console.log("updateImagePublicacion");
      let putPdf = {
        gaceta_documento: this.gaceta_documento,
      };
      try {
        let res = await this.axios.put(
          "/api/publicaciones/" + this.idPGE + "/" + this.Gac.gaceta_documento,
          putPdf,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } catch (error) {
        // console.log("error updateImagePublicacion");
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
    this.getGaceta();
  },
};
</script>