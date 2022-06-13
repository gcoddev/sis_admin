<template>
  <div class="container-fluid">
    <h1>Editar publicacion</h1>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center">{{ Pub.publicaciones_titulo }}</h2>
          <div class="row">
            <img
              :src="url_api + '/Publicaciones/' + Pub.publicaciones_imagen"
              alt="Portada"
              class="col-12 col-md-5 h-100"
            />
            <div class="col-12 col-md-7">
              <div class="form-group mt-2">
                <label for="publicaciones_titulo" class="form-label"
                  >Titulo:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="publicaciones_titulo"
                  placeholder="Titulo de publicacion"
                  v-model="publicaciones_titulo"
                />
              </div>
              <div class="form-group mt-2">
                <label for="publicaciones_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="publicaciones_descripcion"
                  class="form-control"
                  rows="10"
                  placeholder="Descripcion de la publicacion"
                  v-model="publicaciones_descripcion"
                ></textarea>
              </div>
              <div class="form-group mt-2">
                <label for="publicaciones_imagen" class="form-label"
                  >Imagen portada:</label
                >
                <input
                  type="file"
                  id="publicaciones_imagen"
                  class="form-control"
                  @change="onFileChange()"
                />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-label" for="publicaciones_autor"
                  >Autor:</label
                >
                <input
                  type="text"
                  id="publicaciones_autor"
                  class="form-control"
                  v-model="publicaciones_autor"
                  placeholder="Nombre del autor"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-label" for="con_fecha_inicio">Fecha:</label>
                <input
                  type="date"
                  id="publicaciones_fecha"
                  class="form-control"
                  v-model="publicaciones_fecha"
                  placeholder="Fecha de la publicacion"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-label" for="publicaciones_tipo">Tipo:</label>
                <input
                  type="text"
                  id="publicaciones_tipo"
                  class="form-control"
                  v-model="publicaciones_tipo"
                  placeholder="Tipo de publicacion"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-label" for="publicaciones_documento"
                  >Documento:</label
                >
                <input
                  type="text"
                  id="publicaciones_documento"
                  class="form-control"
                  v-model="publicaciones_documento"
                  placeholder="Documento de publicacion"
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
      Pub: {},
      publicaciones_titulo: "",
      publicaciones_descripcion: "",
      publicaciones_autor: "",
      publicaciones_fecha: "",
      publicaciones_tipo: "",
      publicaciones_documento: "",
      publicaciones_imagen: null,
      pub_img: false,
    };
  },
  computed: {
    ...mapState(["idPGEVM", "url_api"]),
  },
  methods: {
    async getPublicacion() {
      try {
        let res = await this.axios.get("/api/publicaciones/" + this.idPGEVM);
        this.Pub = res.data.Descripcion;
        // console.log(this.Pub);
        this.publicaciones_titulo = this.Pub.publicaciones_titulo;
        this.publicaciones_descripcion = this.Pub.publicaciones_descripcion;
        this.publicaciones_autor = this.Pub.publicaciones_autor;
        let fecha = this.Pub.publicaciones_fecha.substr(0, 10);
        this.publicaciones_fecha = fecha;
        this.publicaciones_tipo = this.Pub.publicaciones_tipo;
        this.publicaciones_documento = this.Pub.publicaciones_documento;
      } catch (error) {
        console.log(error);
      }
    },
    onFileChange() {
      let img = document.querySelector("#publicaciones_imagen");
      this.publicaciones_imagen = img.files[0];
      this.pub_img = true;
    },
    validar() {
      if (this.publicaciones_titulo != "") {
        if (this.publicaciones_descripcion != "") {
          if (this.publicaciones_autor != "") {
            if (this.publicaciones_fecha != "") {
              if (this.publicaciones_tipo != "") {
                if (this.publicaciones_documento != "") {
                  if (this.pub_img) {
                    this.updateImagePublicacion();
                  }
                  this.updatePublicacion();
                } else {
                  this.alertDisplay("Documento vacio", "warning", 1500);
                }
              } else {
                this.alertDisplay("Tipo vacio", "warning", 1500);
              }
            } else {
              this.alertDisplay("Fecha vacio", "warning", 1500);
            }
          } else {
            this.alertDisplay("Autor vacio", "warning", 1500);
          }
        } else {
          this.alertDisplay("Descripcion vacio", "warning", 1500);
        }
      } else {
        this.alertDisplay("Titulo vacio", "warning", 1500);
      }
    },
    clickInstitucion() {
      this.$store.state.getter = true;
      this.$router.push("/publicaciones");
    },
    async updatePublicacion() {
      console.log("updatePublicacion");
      let putPublicacion = {
        publicaciones_titulo: this.publicaciones_titulo,
        publicaciones_descripcion: this.publicaciones_descripcion,
        publicaciones_autor: this.publicaciones_autor,
        publicaciones_fecha: this.publicaciones_fecha,
        publicaciones_tipo: this.publicaciones_tipo,
        publicaciones_documento: this.publicaciones_documento,
      };
      try {
        let res = await this.axios.put(
          "/api/publicaciones/" + this.idPGEVM,
          putPublicacion
        );
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Actualizado";
        this.$store.state.evMsg = res.data.mensaje;
        this.clickInstitucion();
      } catch (error) {
        console.log("error updatePublicacion");
        console.log(error);
      }
    },
    async updateImagePublicacion() {
      // console.log("updateImagePublicacion");
      let putImage = {
        publicaciones_imagen: this.publicaciones_imagen,
      };
      try {
        let res = await this.axios.put(
          "/api/publicaciones/" +
            this.idPGEVM +
            "/" +
            this.Pub.publicaciones_imagen,
          putImage,
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
    this.getPublicacion();
  },
};
</script>