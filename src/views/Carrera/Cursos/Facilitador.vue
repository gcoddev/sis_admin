<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center">Facilitador</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="nombre_facilitador" class="form-label"
                  >Nombre:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nombre_facilitador"
                  placeholder="Nombre del facilitador"
                  v-model="nombre_facilitador"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="foto_facilitador" class="form-label">Foto:</label>
                <input
                  type="file"
                  class="form-control"
                  id="foto_facilitador"
                  @change="onFileChange()"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="cargo_facilitador" class="form-label">Cargo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="cargo_facilitador"
                  placeholder="Cargo del facilitador"
                  v-model="cargo_facilitador"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="descripcion_facilitador" class="form-label"
                  >Descripcion:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="descripcion_facilitador"
                  placeholder="Descripcion del facilitador"
                  v-model="descripcion_facilitador"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label class="form-label" for="celular_facilitador"
                  >Celular:</label
                >
                <div class="input-group">
                  <span id="basic-addon1">
                    <select
                      name=""
                      id=""
                      class="form-control bg-light"
                      v-model="pc"
                    >
                      <option value="">-- Codigo --</option>
                      <option
                        v-for="(ct, id_ct) of countries"
                        :key="id_ct"
                        :value="ct.phone_code"
                      >
                        {{ ct.iso3 }} &nbsp; {{ ct.phone_code }}
                      </option>
                    </select>
                  </span>
                  <input
                    type="text"
                    id="celular_facilitador"
                    class="form-control"
                    placeholder="Numero de celular"
                    aria-label="celular_facilitador"
                    aria-describedby="basic-addon1"
                    v-model="celular_facilitador"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="facebook_facilitador" class="form-label"
                  >Facebook:</label
                >
                <div class="input-group flex-nowrap">
                  <input
                    type="text"
                    id="facebook_facilitador"
                    class="form-control"
                    placeholder="https://www.facebook.com/"
                    aria-label="facebook_facilitador"
                    aria-describedby="basic-addon1"
                    v-model="facebook_facilitador"
                  />
                  <span class="input-group-text" id="basic-addon1"
                    ><i class="mdi mdi-facebook"></i
                  ></span>
                </div>
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
import Countries from "@/views/Carrera/Cursos/Countries.json";
export default {
  name: "new_cca",
  data() {
    return {
      countries: Countries,

      nombre_facilitador: "",
      cargo_facilitador: "",
      descripcion_facilitador: "",
      pc: "",
      celular_facilitador: "",
      facebook_facilitador: "",
      foto_facilitador: null,
    };
  },
  computed: {
    ...mapState(["idCCACS", "idCarr"]),
  },
  methods: {
    clickCarrera() {
      this.$store.state.getter = true;
      this.$router.push("/cs/" + this.idCarr);
    },
    validar() {
      if (this.nombre_facilitador != "") {
        if (this.cargo_facilitador != "") {
          if (this.descripcion_facilitador != "") {
            if (this.pc != "") {
              if (this.celular_facilitador != "") {
                if (this.facebook_facilitador != "") {
                  if (this.foto_facilitador != null) {
                    console.log("vak");
                    this.createF();
                  } else {
                    this.alertDisplay("Foto del facilitador vacio");
                  }
                } else {
                  this.alertDisplay("Facebook del facilitador vacio");
                }
              } else {
                this.alertDisplay("Numero de celular vacio");
              }
            } else {
              this.alertDisplay("Codigo de pais vacio");
            }
          } else {
            this.alertDisplay("Descripcion del facilitador vacio");
          }
        } else {
          this.alertDisplay("Cargo del facilitador vacio");
        }
      } else {
        this.alertDisplay("Nombre del facilitador");
      }
    },
    onFileChange() {
      let img = document.querySelector("#foto_facilitador");
      this.foto_facilitador = img.files[0];
    },
    async createF() {
      console.log("createF");
      let postF = {
        nombre_facilitador: this.nombre_facilitador,
        cargo_facilitador: this.cargo_facilitador,
        descripcion_facilitador: this.descripcion_facilitador,
        celular_facilitador: this.pc + ' ' + this.celular_facilitador,
        facebook_facilitador: this.facebook_facilitador,
        foto_facilitador: this.foto_facilitador,
      };
      try {
        let res = await this.axios.post(
          "/api/Facilitadores/" + this.idCCACS,
          postF,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Creado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickCarrera();
      } catch (error) {
        console.log("error createF");
        // console.log(error);
        if (error.response.status == 500) {
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        }
      }
    },
    alertDisplay(msg) {
      this.$swal({
        title: msg,
        icon: "warning",
        showConfirmButton: true,
        timer: 1500,
      });
    },
  },
};
</script>