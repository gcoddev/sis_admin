<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center">Gaceta</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="publicaciones_titulo" class="form-label"
                  >Titulo:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="publicaciones_titulo"
                  placeholder="Titulo"
                  v-model="publicaciones_titulo"
                  aria-placeholder="Titulo de la publicacion"
                />
              </div>
              <div class="form-group mt-2">
                <label for="publicaciones_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="publicaciones_descripcion"
                  class="form-control"
                  rows="12"
                  placeholder="Descripcion de la publicacion"
                  v-model="publicaciones_descripcion"
                ></textarea>
              </div>
            </div>

            <div class="col-12 col-md-6">
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
              <div class="form-group mt-2">
                <label class="form-label" for="publicaciones_autor"
                  >Autor:</label
                >
                <input
                  type="text"
                  id="publicaciones_autor"
                  class="form-control"
                  v-model="publicaciones_autor"
                  placeholder="Autor de la publicacion"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="publicaciones_fecha"
                  >Fecha:</label
                >
                <input
                  type="date"
                  id="publicaciones_fecha"
                  class="form-control"
                  v-model="publicaciones_fecha"
                />
              </div>
              <div class="form-group mt-2">
                <label for="publicaciones_tipo" class="form-label">Tipo:</label>
                <input
                  type="text"
                  class="form-control"
                  id="publicaciones_tipo"
                  placeholder="Tipo de la publicacion"
                  v-model="publicaciones_tipo"
                />
              </div>
              <div class="form-group mt-2">
                <label for="publicaciones_documento" class="form-label"
                  >documento:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="publicaciones_documento"
                  placeholder="Documento de la publicacion"
                  v-model="publicaciones_documento"
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
  name: "name_p",
  data() {
    return {
      publicaciones_titulo: "",
      publicaciones_descripcion: "",
      publicaciones_autor: "",
      publicaciones_fecha: "",
      publicaciones_tipo: "",
      publicaciones_documento: "",
      publicaciones_imagen: null,
    };
  },
  computed: {
    ...mapState(["Institucion"]),
  },
  methods: {
    validar() {
      if (this.publicaciones_titulo != "") {
        if (this.publicaciones_descripcion != "") {
          if (this.publicaciones_autor != "") {
            if (this.publicaciones_fecha != "") {
              if (this.publicaciones_tipo != "") {
                if (this.publicaciones_documento != "") {
                  if (this.publicaciones_imagen != null) {
                    this.createPublicacion();
                  } else {
                    this.alertDisplay(
                      "Imagen publicacion vacio",
                      "warning",
                      1500
                    );
                  }
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
    onFileChange() {
      let img = document.querySelector("#publicaciones_imagen");
      this.publicaciones_imagen = img.files[0];
    },
    async createPublicacion() {
      let postPublicacion = {
        publicaciones_titulo: this.publicaciones_titulo,
        publicaciones_descripcion: this.publicaciones_descripcion,
        publicaciones_autor: this.publicaciones_autor,
        publicaciones_fecha: this.publicaciones_fecha,
        publicaciones_tipo: this.publicaciones_tipo,
        publicaciones_documento: this.publicaciones_documento,
        publicaciones_imagen: this.publicaciones_imagen,
      };
      try {
        let res = await this.axios.post(
          "/api/publicacionesAll/" + this.Institucion.institucion_id,
          postPublicacion,
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