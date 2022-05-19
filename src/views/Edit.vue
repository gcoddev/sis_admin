<template>
  <div class="container-fluid">
    <!-- <h1>{{ idCCA }}</h1> -->
    <div class="container">
      <h2 class="text-center">{{ CCA.tipo_conv_comun_titulo }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <img
              :src="
                'https://serviciopagina.upea.bo/Convocatorias/' +
                CCA.con_foto_portada
              "
              alt="Portada"
              class="col-12 col-md-5"
            />
            <div class="col-12 col-md-7">
              <div class="form-group mt-2">
                <label for="con_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
                  :value="CCA.con_titulo"
                  id="con_titulo"
                  placeholder="Titulo"
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
                  v-html="CCA.con_descripcion"
                ></textarea>
              </div>
              <div class="form-group mt-2">
                <label for="con_foto_portada" class="form-label"
                  >Imagen portada:</label
                >
                <input type="file" id="con_foto_portada" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12 col-md-5">
              <div class="form-group">
                <label class="form-label" for="fecha_inicio"
                  >Fecha de inicio:</label
                >
                <input
                  type="date"
                  id="fecha_inicio"
                  class="form-control"
                  :value="fi_a"
                />
              </div>
            </div>
            <div class="col-12 col-md-5">
              <div class="form-group">
                <label class="form-label" for="fecha_final"
                  >Fecha de final:</label
                >
                <input
                  type="date"
                  id="fecha_final"
                  class="form-control"
                  :value="ff_a"
                />
              </div>
            </div>
            <div class="col-12 col-md-2 d-flex">
              <div class="form-group d-flex flex-column">
                <label class="form-label">Estado:</label>
                <input
                  type="checkbox"
                  id="estado"
                  checked
                  data-switch="primary"
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
        <div class="card-footer">
          <button type="button" class="btn btn-success float-end">Actualizar</button>
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
      fi_a: null,
      ff_a: null,
    };
  },
  computed: {
    ...mapState(["idCCA"]),
    fecha(fecha) {
      return fecha.substr(0, 10);
    },
  },
  methods: {
    async getCCA() {
      try {
        let res = await this.axios.get("/api/convocatorias/" + this.idCCA);
        this.CCA = res.data.Descripcion;
        let fi = res.data.Descripcion.con_fecha_inicio;
        this.fi_a = fi.substr(0, 10);
        let ff = res.data.Descripcion.con_fecha_fin;
        this.ff_a = ff.substr(0, 10);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getCCA();
  },
};
</script>