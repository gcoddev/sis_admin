<template>
  <div>
    <div id="loading_upea">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="mt-2">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1>
              GACETA UPEA &nbsp;<span class="badge bg-info fs-4">{{
                Gaceta.length
              }}</span>
            </h1>
          </div>
          <div>
            <button class="btn btn-primary" @click="nuevaG()">
              Crear nuevo
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div v-if="Gaceta.length == 0">
            <h1 class="text-center">Sin gacetas</h1>
          </div>
          <div
            v-else
            v-for="(gac, id_gac) of Gaceta"
            :key="id_gac"
            class="col-12 col-md-6 col-xxl-4"
          >
            <a
              class="card card-gac ribbon-box tipoC w-100"
              data-bs-toggle="modal"
              :data-bs-target="'#modal_gac_' + id_gac"
            >
              <div class="card-body">
                <div class="ribbon float-start ribbon-info">
                  <i class="mdi mdi-access-point me-1"></i
                  ><span
                    v-html="[gac.gaceta_estado == '1' ? 'Activo' : 'Inactivo']"
                  ></span>
                </div>
                <h5 class="text-dark float-end mt-0">Gaceta</h5>
                <div class="ribbon-content">
                  <div class="ratio ratio-1x1">
                    <iframe
                      :src="
                        'http://docs.google.com/gview?url=https://serviciopagina.upea.bo/Gaceta/' +
                        gac.gaceta_documento +
                        '&embedded=true'
                      "
                      frameborder="0"
                      :disabled="true"
                    ></iframe>
                  </div>
                  <div class="card-title fw-bold mt-2">
                    {{ gac.gaceta_titulo }}
                  </div>
                </div>
              </div>
              <div class="card-footer pt-3">
                <p><b>Fecha:</b> {{ dmy(gac.gaceta_fecha) }}</p>
              </div>
            </a>

            <div
              class="modal fade"
              :id="'modal_gac_' + id_gac"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              :aria-labelledby="'modal_gac_label_' + id_gac"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" :id="'modal_gac_label_' + id_gac">
                      {{ gac.publicaciones_titulo }}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-hidden="true"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-12">
                        <iframe
                          :src="
                            'http://docs.google.com/gview?url=https://serviciopagina.upea.bo/Gaceta/' +
                            gac.gaceta_documento +
                            '&embedded=true'
                          "
                          class="card-img-top"
                          height="500px"
                        ></iframe>
                      </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                      <div class="ms-3">
                        <p><b>Fecha:</b> {{ dmy(gac.gaceta_fecha) }}</p>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cerrar
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger ms-2"
                          data-bs-dismiss="modal"
                          @click="
                            deleteMsg(
                              'la gaceta',
                              gac.gaceta_id,
                              gac.gaceta_documento
                            )
                          "
                        >
                          <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                          Eliminar
                        </button>
                        <button
                          data-bs-dismiss="modal"
                          class="btn btn-warning ms-2"
                          @click="editG(gac.gaceta_id)"
                        >
                          <i class="mdi mdi-clipboard-edit-outline"></i>&nbsp;
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#loading_upea {
  position: fixed;
  background-color: var(--ct-body-bg);
  width: 100vw;
  height: 100vh;
  z-index: 2000;
}
#loading_upea > div {
  position: absolute;
  left: 35%;
  top: 40%;
}
.contenedor {
  overflow: auto;
  box-sizing: border-box;
  padding: 5px;
}
.contenedor::-webkit-scrollbar {
  -webkit-appearance: none;
}
.contenedor::-webkit-scrollbar:vertical {
  width: 10px;
}
.contenedor::-webkit-scrollbar-button:increment,
.contenedor::-webkit-scrollbar-button {
  display: none;
}
.contenedor::-webkit-scrollbar:horizontal {
  height: 10px;
}
.contenedor::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid var(--ct-card-bg);
}
.contenedor::-webkit-scrollbar-track {
  border-radius: 10px;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.tipoC {
  float: left;
}
.card-gac {
  opacity: 0.7;
  transition: transform 0.5s;
  user-select: none;
  cursor: pointer;
  color: var(--ct-body-color);
}
.card-gac:hover {
  transform: scale(105%);
  opacity: 1;
}
.img-modal {
  transition: transform 0.5s;
}
.img-modal:hover {
  transform: scale(95%);
}
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "publicaciones",
  data() {
    return {
      Gaceta: [],
    };
  },
  computed: {
    ...mapState(["Institucion", "getter", "ev", "evTitle", "evMsg"]),
  },
  methods: {
    async getGaceta() {
      try {
        let res = await this.axios.get(
          "/api/gacetaunivAll/" + this.Institucion.institucion_id
        );
        this.Gaceta = res.data;
        // console.log(this.Publicaciones);
        this.cargando();
      } catch (error) {
        console.log("error getPublicaciones");
        console.log(error);
      }
    },
    dmy(fecha) {
      let meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
      let dia = fecha.substr(8, 2);
      let mes = parseInt(fecha.substr(5, 2));
      let anio = fecha.substr(0, 4);
      return dia + " de " + meses[mes - 1] + " de " + anio;
    },
    editG(idG) {
      this.$store.state.idPGE = idG;
      this.$router.push("/edit_g/" + idG);
    },
    async deleteG(id, doc) {
      try {
        let res = await this.axios.delete("/api/gacetauniv/" + id + "/" + doc);
        this.getGaceta();
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        // console.log("error deleteG");
        console.log(error);
      }
    },
    deleteMsg(title, id, img) {
      this.$swal({
        title: "Eliminar " + title,
        text: "Esta seguro de eliminar " + title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteG(id, img);
        }
      });
    },
    alertDisplay(msg, icon, time) {
      this.$swal({
        title: msg,
        icon: icon,
        showConfirmButton: false,
        timer: time,
      });
    },
    cargando() {
      document.getElementById("loading_upea").style.display = "none";
    },
    nuevaG() {
      this.$router.push("/new_g/" + this.Institucion.institucion_id);
    },
  },
  created() {
    if (this.getter) {
      this.getGaceta();
      this.$store.state.getter = false;
      if (this.ev == 1) {
        this.$swal(this.evTitle, this.evMsg, "success");
        this.$store.state.ev = 0;
        this.$store.state.evTitle = "";
        this.$store.state.evMsg = "";
      }
    }
  },
  updated() {
    // this.getPublicaciones();
  },
};
</script>