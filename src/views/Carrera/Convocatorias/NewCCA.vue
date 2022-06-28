<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center text-dark">{{ nombreCarr }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
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
            </div>

            <div class="col-12 col-md-6">
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
              <div class="form-group mt-2">
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
              <div class="form-group mt-2">
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
              <div class="form-group mt-2">
                <label for="tipoCCA" class="form-label">Tipo:</label>
                <select
                  id="tipoCCA"
                  class="form-control"
                  v-model="idtipo_conv_comun"
                >
                  <option value="">-- Seleccione tipo --</option>
                  <option
                    v-for="(tipo, id_tipo) of tipoC"
                    :key="id_tipo"
                    :value="tipo.idtipo_conv_comun"
                  >
                    {{ tipo.tipo_conv_comun_titulo }}
                  </option>
                </select>
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
      tipoC: {},
      con_foto_portada: null,
      con_titulo: "",
      con_descripcion: "",
      con_fecha_inicio: "",
      con_fecha_fin: "",
      idtipo_conv_comun: "",
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
      this.$router.push("/cca/" + this.idCarr);
    },
    validar() {
      // console.log("validar");
      if (this.con_titulo != "") {
        if (this.con_descripcion != "") {
          if (this.con_fecha_inicio != "") {
            if (this.con_fecha_fin != "") {
              if (this.idtipo_conv_comun != "") {
                if (this.con_foto_portada != null) {
                  this.createCCA();
                } else {
                  this.alertDisplay("Imagen portada vacio", "warning", 1500);
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
      let img = document.querySelector("#con_foto_portada");
      this.con_foto_portada = img.files[0];
    },
    async createCCA() {
      let postCCA = {
        con_foto_portada: this.con_foto_portada,
        con_titulo: this.con_titulo,
        con_descripcion: this.con_descripcion,
        con_fecha_inicio: this.con_fecha_inicio,
        con_fecha_fin: this.con_fecha_fin,
        idtipo_conv_comun: this.idtipo_conv_comun,
      };
      try {
        let res = await this.axios.post(
          "/api/convocatoriasAll/" + this.idCarr,
          postCCA,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // console.log(res);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Creado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickCarrera();
      } catch (error) {
        // console.log("error createCCA");
        if (error.response.status == 500) {
          location.reload();
        }
        // console.log(error);
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