<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center">{{ nombreCarr }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="det_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="det_titulo"
                  placeholder="Titulo"
                  v-model="det_titulo"
                />
              </div>
              <div class="form-group mt-2">
                <label for="det_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="det_descripcion"
                  class="form-control"
                  rows="10"
                  placeholder="Descripcion"
                  v-model="det_descripcion"
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
                  id="det_img_portada"
                  class="form-control"
                  @change="onFileChange()"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="det_fecha_ini"
                  >Fecha de inicio:</label
                >
                <input
                  type="date"
                  id="det_fecha_ini"
                  class="form-control"
                  v-model="det_fecha_ini"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="det_fecha_fin"
                  >Fecha de final:</label
                >
                <input
                  type="date"
                  id="det_fecha_fin"
                  class="form-control"
                  v-model="det_fecha_fin"
                />
              </div>
              <div class="form-group mt-2">
                <label for="tipoCS" class="form-label">Tipo:</label>
                <select
                  id="tipoCS"
                  class="form-control"
                  v-model="idtipo_curso_otros"
                >
                  <option value="">-- Seleccione tipo --</option>
                  <option
                    v-if="rol == 'CENTRO_ESTUDIANTES'"
                    :value="tipoCentro.idtipo_curso_otros"
                  >
                    {{ tipoCentro.tipo_conv_curso_nombre }}
                  </option>
                  <option
                    v-else
                    v-for="(tipo, id_tipo) of tipoC"
                    :key="id_tipo"
                    :value="tipo.idtipo_curso_otros"
                  >
                    {{ tipo.tipo_conv_curso_nombre }}
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
  name: "new_cs",
  data() {
    return {
      tipoC: {},
      tipoCentro: {},
      det_img_portada: null,
      det_titulo: "",
      det_descripcion: "",
      det_fecha_ini: "",
      det_fecha_fin: "",
      idtipo_curso_otros: "",
    };
  },
  computed: {
    ...mapState(["idCarr", "nombreCarr", "userAdminData"]),
    rol() {
      return this.userAdminData.roles;
    },
  },
  methods: {
    async getTipoCur() {
      try {
        let res = await this.axios.get("/api/TipoCurso");
        if (this.rol == "CENTRO_ESTUDIANTES") {
          res.data.forEach((tipo) => {
            if (tipo.tipo_conv_curso_nombre == "CURSOS") {
              this.tipoCentro = tipo;
            }
          });
        } else {
          this.tipoC = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    clickCarrera() {
      this.$store.state.getter = true;
      this.$router.push("/cs/" + this.idCarr);
    },
    validar() {
      // console.log("validar");
      if (this.con_titulo != "") {
        if (this.con_descripcion != "") {
          if (this.con_fecha_inicio != "") {
            if (this.con_fecha_fin != "") {
              if (this.idtipo_conv_comun != "") {
                if (this.con_foto_portada != null) {
                  this.createCS();
                } else {
                  this.alertDisplay("Imagen portada vacio", "warning", 1500);
                }
              } else {
                this.alertDisplay("Tipo curso vacio", "warning", 1500);
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
      let img = document.querySelector("#det_img_portada");
      this.det_img_portada = img.files[0];
    },
    createCS() {
      // let postCS = {
      //   det_img_portada: this.det_img_portada,
      //   det_titulo: this.det_titulo,
      //   det_descripcion: this.det_descripcion,
      //   det_fecha_inicio: this.det_fecha_inicio,
      //   det_fecha_fin: this.det_fecha_fin,
      //   idtipo_curso_otros: this.idtipo_curso_otros,
      // };
      // try {
      //   let res = await this.axios.post(
      //     "/api/cursosAll/" + this.idCarr,
      //     postCS,
      //     { headers: { "Content-Type": "multipart/form-data" } }
      //   );
      //   // console.log(res);
      this.$store.state.ev = 1;
      this.$store.state.evTitle = "Creado";
      this.$store.state.evMsg = "res.data.mensaje";
      this.clickCarrera();
      // } catch (error) {
      //   console.log("error createCCA");
      //   console.log(error);
      // }
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
    this.getTipoCur();
  },
};
</script>