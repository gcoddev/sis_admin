<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center">{{ nombreCarr }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <img
              :src="url_api + '/Carrera/Servicios/' + Servicio.serv_imagen"
              alt="Imagen oferta"
              class="col-12 col-md-5 h-100"
            />
            <div class="col-12 col-md-7">
              <div class="form-group mt-2">
                <label for="serv_nombre" class="form-label"
                  >Titulo servicio:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="serv_nombre"
                  placeholder="Titulo"
                  v-model="serv_nombre"
                />
              </div>
              <div class="form-group mt-2">
                <label for="serv_descripcion" class="form-label"
                  >Descripcion servicio:</label
                >
                <textarea
                  id="serv_descripcion"
                  class="form-control"
                  rows="7"
                  placeholder="Descripcion"
                  v-model="serv_descripcion"
                ></textarea>
              </div>
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
  name: "new_serv",
  data() {
    return {
      Servicio: {},
      serv_nombre: "",
      serv_descripcion: "",
      serv_nro_celular: "",
      serv_imagen: null,
      si: false,
    };
  },
  computed: {
    ...mapState(["url_api", "idCarr", "nombreCarr", "idSOV"]),
  },
  methods: {
    async getServicio() {
      try {
        let res = await this.axios.get("/api/Servicio/" + this.idSOV);
        this.Servicio = res.data.Descripcion;
        this.serv_nombre = this.Servicio.serv_nombre;
        this.serv_descripcion = this.Servicio.serv_descripcion;
        this.serv_nro_celular = this.Servicio.serv_nro_celular;
      } catch (error) {
        console.log("error getServicio");
        console.error(error);
      }
    },
    clickCarrera() {
      this.$store.state.getter = true;
      this.$router.push("/serv/" + this.idCarr);
    },
    validar() {
      if (this.serv_nombre != "") {
        if (this.serv_descripcion != "") {
          if (this.serv_nro_celular != "") {
            if (this.serv_imagen != null) {
              this.editImgServ();
            }
            this.editServ();
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
    async editServ() {
      let putServ = {
        serv_nombre: this.serv_nombre,
        serv_descripcion: this.serv_descripcion,
        serv_nro_celular: this.serv_nro_celular,
      };
      try {
        let res = await this.axios.put("/api/Servicio/" + this.idSOV, putServ);
        // console.log(res);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Editado";
        this.$store.state.evMsg = res.data.message;
        this.clickCarrera();
      } catch (error) {
        console.log("error editServ");
        console.error(error);
        if (error.response.status == 500) {
          location.reload();
        }
      }
    },
    async editImgServ() {
      let putImgServ = {
        serv_imagen: this.serv_imagen,
      };
      try {
        let res = await this.axios.put(
          "/api/Servicio/" + this.idSOV + "/" + this.Servicio.serv_imagen,
          putImgServ,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } catch (error) {
        console.log("error editImgServ");
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
    this.getServicio();
  },
};
</script>