<template>
  <div class="container-fluid">
    <h1>{{ nombreCarr }}</h1>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center">{{ CCA.tipo_conv_comun_titulo }}</h2>
          <div class="row">
            <img
              :src="url_api + '/Convocatorias/' + CCA.con_foto_portada"
              alt="Portada"
              class="col-12 col-md-5 h-100"
            />
            <div class="col-12 col-md-7">
              <div class="form-group mt-2">
                <label for="con_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="con_titulo"
                  placeholder="Titulo"
                  v-model="con_titulo"
                />
              </div>
              <div class="form-group mt-2">
                <label for="con_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="con_descripcion"
                  class="form-control"
                  rows="10"
                  placeholder="Descripcion"
                  v-model="con_descripcion"
                ></textarea>
              </div>
              <div class="form-group mt-2">
                <label for="con_foto_portada" class="form-label"
                  >Imagen portada:</label
                >
                <input
                  type="file"
                  id="con_foto_portada"
                  class="form-control"
                  @change="onFileChange()"
                />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12 col-md-5">
              <div class="form-group">
                <label class="form-label" for="con_fecha_inicio"
                  >Fecha de inicio:</label
                >
                <input
                  type="date"
                  id="con_fecha_inicio"
                  class="form-control"
                  v-model="con_fecha_inicio"
                />
              </div>
            </div>
            <div class="col-12 col-md-5">
              <div class="form-group">
                <label class="form-label" for="con_fecha_fin"
                  >Fecha de final:</label
                >
                <input
                  type="date"
                  id="con_fecha_fin"
                  class="form-control"
                  v-model="con_fecha_fin"
                />
              </div>
            </div>
            <div class="col-12 col-md-2 d-flex">
              <div class="form-group d-flex flex-column">
                <label class="form-label">Estado:</label>
                <input
                  type="checkbox"
                  id="estado"
                  data-switch="success"
                  v-model="estado"
                />
                <label
                  for="estado"
                  data-on-label="On"
                  data-off-label="Off"
                ></label>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex flex-row-reverse">
          <button type="button" class="btn btn-success ms-2" @click="validar()">
            Actualizar
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
  name: "edit",
  data() {
    return {
      CCA: {},
      con_titulo: "",
      con_descripcion: "",
      estado: false,
      con_estado: false,
      con_fecha_inicio: "",
      con_fecha_fin: "",
      con_foto_portada: null,
      cfp: false,
    };
  },
  computed: {
    ...mapState(["idCCACS", "nombreCarr", "idCarr", "url_api"]),
  },
  methods: {
    async getCCA() {
      try {
        let res = await this.axios.get("/api/convocatorias/" + this.idCCACS);
        this.CCA = res.data.Descripcion;
        this.con_titulo = this.CCA.con_titulo;
        this.con_descripcion = this.CCA.con_descripcion;
        let fi = this.CCA.con_fecha_inicio;
        this.con_fecha_inicio = fi.substr(0, 10);
        let ff = this.CCA.con_fecha_fin;
        this.con_fecha_fin = ff.substr(0, 10);
        if (this.CCA.con_estado == "1") {
          this.estado = true;
        } else {
          this.estado = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    clickCarrera() {
      this.$store.state.getter = true;
      this.$router.push("/cca/" + this.idCarr);
    },
    validar() {
      // console.log("validar");
      if (this.con_titulo != "") {
        if (this.con_descripcion != "") {
          if (this.con_fecha_inicio != "") {
            if (this.con_fecha_fin != "") {
              // console.log("put");
              if (this.estado == true) {
                this.con_estado = "1";
              } else {
                this.con_estado = "0";
              }

              if (this.cfp) {
                this.updateImageCCA();
              }
              this.updateCCA();
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
      let img = document.querySelector("#con_foto_portada");
      this.con_foto_portada = img.files[0];
      this.cfp = true;
    },
    async updateCCA() {
      let putCCA = {
        con_titulo: this.con_titulo,
        con_descripcion: this.con_descripcion,
        con_estado: this.con_estado,
        con_fecha_inicio: this.con_fecha_inicio,
        con_fecha_fin: this.con_fecha_fin,
      };
      try {
        let res = await this.axios.put(
          "/api/convocatorias/" + this.idCCACS,
          putCCA
        );
        // console.log(res);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Actualizado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickCarrera();
      } catch (error) {
        // console.log("error putCCA");
        // console.log(error);
        if (error.response.status == 500) {
          location.reload();
        }
      }
    },
    async updateImageCCA() {
      let putImageCCA = {
        con_foto_portada: this.con_foto_portada,
      };
      try {
        let res = await this.axios.put(
          "/api/convocatorias/" +
            this.idCCACS +
            "/" +
            this.CCA.con_foto_portada,
          putImageCCA,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } catch (error) {
        // console.log("errror updateImageCCA");
        // console.log(error);
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
    this.getCCA();
  },
};
</script>