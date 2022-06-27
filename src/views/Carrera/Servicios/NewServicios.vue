<template>
  <div class="container-fluid" @keyup.enter="validar()">
    <div class="container">
      <h2 class="text-center">{{ nombreCarr }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="serv_imagen" class="form-label"
                  >Imagen portada:</label
                >
                <input
                  type="file"
                  id="serv_imagen"
                  class="form-control"
                  @change="onFileChange()"
                />
              </div>
              <div class="form-group mt-2">
                <label for="serv_nombre" class="form-label">Nombre:</label>
                <input
                  type="text"
                  class="form-control"
                  id="serv_nombre"
                  placeholder="Nombre del servicio"
                  v-model="serv_nombre"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="serv_nro_celular"
                  >N° celular del servicio:</label
                >
                <input
                  type="text"
                  id="serv_nro_celular"
                  class="form-control"
                  v-model="serv_nro_celular"
                  placeholder="N° celular"
                />
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="serv_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="serv_descripcion"
                  class="form-control"
                  rows="8"
                  placeholder="Descripcion"
                  v-model="serv_descripcion"
                ></textarea>
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
      serv_nombre: "",
      serv_descripcion: "",
      serv_nro_celular: "",
      serv_imagen: null,
    };
  },
  computed: {
    ...mapState(["idCarr", "nombreCarr"]),
  },
  methods: {
    clickCarrera() {
      this.$store.state.getter = true;
      this.$router.push("/serv/" + this.idCarr);
    },
    validar() {
      if (this.serv_nombre != "") {
        if (this.serv_descripcion != "") {
          if (this.serv_nro_celular != "") {
            if (this.serv_imagen != null) {
              this.createServ();
            } else {
              this.alertDisplay("Imagen vacio", "warning", 1500);
            }
          } else {
            this.alertDisplay("N° celular vacio", "warning", 1500);
          }
        } else {
          this.alertDisplay("Descripcion vacio", "warning", 1500);
        }
      } else {
        this.alertDisplay("Nombre vacio", "warning", 1500);
      }
    },
    onFileChange() {
      let img = document.querySelector("#serv_imagen");
      this.serv_imagen = img.files[0];
    },
    async createServ() {
      let putServ = {
        serv_nombre: this.serv_nombre,
        serv_descripcion: this.serv_descripcion,
        serv_nro_celular: this.serv_nro_celular,
        serv_imagen: this.serv_imagen,
      };
      try {
        let res = await this.axios.post(
          "/api/ServicioAll/" + this.idCarr,
          putServ,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // console.log(res);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Creado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickCarrera();
      } catch (error) {
        // console.log("error createCCA");
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
    //
  },
};
</script>