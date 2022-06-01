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
              EVENTOS UPEA &nbsp;<span class="badge bg-info fs-4">{{
                Eventos.length
              }}</span>
            </h1>
          </div>
          <div>
            <button class="btn btn-primary" @click="nuevoE()">
              Crear nuevo
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div v-if="Eventos.length == 0">
            <h1 class="text-center">Sin eventos</h1>
          </div>
          <div
            v-else
            v-for="(ev, id_ev) of Eventos"
            :key="id_ev"
            class="col-12 col-md-4 col-xl-3 col-xxl-2"
          >
            <a
              class="card card-ev ribbon-box tipoC w-100"
              data-bs-toggle="modal"
              :data-bs-target="'#modal_ev_' + id_ev"
            >
              <div class="card-body">
                <div class="ribbon float-start ribbon-info">
                  <i class="mdi mdi-access-point me-1"></i><span>Evento</span>
                </div>
                <h5 class="text-dark float-end mt-0">{{ ev.evento_tipo }}</h5>
                <div class="ribbon-content">
                  <img
                    :src="url_api + '/Eventos/' + ev.evento_imagen"
                    alt="img"
                    class="card-img-top"
                  />
                  <div class="card-title fw-bold mt-2">titulo</div>
                  <pre
                    class="card-text contenedor"
                    style="max-height: 200px; overflow-y: scroll"
                    v-html="ev.evento_descripcion"
                  ></pre>
                </div>
              </div>
              <div class="card-footer pt-3">
                <p><b>Fecha:</b> {{ dmy(ev.evento_fecha) }}</p>
                <p><b>Hora:</b> {{ ev.evento_hora }}</p>
                <p><b>Lugar:</b> {{ ev.evento_lugar }}</p>
              </div>
            </a>

            <div
              class="modal fade"
              :id="'modal_ev_' + id_ev"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              :aria-labelledby="'modal_ev_label_' + id_ev"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" :id="'modal_ev_label_' + id_ev">
                      titulo
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-hidden="true"
                    ></button>
                  </div>
                  <!-- end modal header -->
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-12 col-md-5">
                        <a
                          :href="url_api + '/Eventos/' + ev.evento_imagen"
                          target="_blank"
                          ><img
                            :src="url_api + '/Eventos/' + ev.evento_imagen"
                            alt="img"
                            class="card-img-top h-auto img-modal"
                        /></a>
                      </div>
                      <div class="col-12 col-md-7">
                        <pre
                          class="card-text contenedor p-2"
                          style="overflow-y: scroll"
                          v-html="ev.evento_descripcion"
                        ></pre>
                      </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                      <div class="ms-3">
                        <p><b>Fecha:</b> {{ dmy(ev.evento_fecha) }}</p>
                        <p><b>Hora:</b> {{ ev.evento_hora }}</p>
                        <p><b>Lugar:</b> {{ ev.evento_lugar }}</p>
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
                              'el evento',
                              ev.evento_id,
                              ev.evento_imagen
                            )
                          "
                        >
                          <i class="mdi mdi-delete-sweep-outline"></i>&nbsp;
                          Eliminar
                        </button>
                        <button
                          data-bs-dismiss="modal"
                          class="btn btn-warning ms-2"
                          @click="editE(ev.evento_id)"
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
.card-ev {
  opacity: 0.7;
  transition: transform 0.5s;
  user-select: none;
  cursor: pointer;
  color: var(--ct-body-color);
}
.card-ev:hover {
  transform: scale(107%);
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
  name: "eventos",
  data() {
    return {
      Eventos: [],
    };
  },
  computed: {
    ...mapState(["Institucion", "getter", "ev", "evTitle", "evMsg", "url_api"]),
  },
  methods: {
    async getEventos() {
      try {
        let res = await this.axios.get(
          "/api/eventoAll/" + this.Institucion.institucion_id
        );
        this.Eventos = res.data;
        this.cargando();
      } catch (error) {
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
    editE(idE) {
      this.$store.state.idPGE = idE;
      this.$router.push("/edit_e/" + idE);
    },
    async deleteE(id, img) {
      try {
        let res = await this.axios.delete("/api/evento/" + id + "/" + img);
        this.getEventos();
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        console.log('error deleteE');
        // console.log(error);
        if (error.response.status == 500) {
          this.getEventos();
          this.cargando()
          this.$swal({
            title: error.response.data.message,
            icon: 'error',
            showConfirmButton: true
          })
        }
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
          this.deleteE(id, img);
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
    nuevoE() {
      this.$router.push("/new_e/" + this.Institucion.institucion_id);
    },
  },
  created() {
    if (this.getter) {
      this.getEventos();
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
    // this.getEventos();
  },
};
</script>