<template>
  <div class="container-fluid">
    <h1>{{ nombreCarr }}</h1>
    <div class="container">
      <div class="card">
        <div class="card-body">
      <h2 class="text-center">{{ CS.tipo_conv_curso_nombre }}</h2>
          <div class="row">
            <img
              :src="
                'https://serviciopagina.upea.bo/Cursos/' + CS.det_img_portada
              "
              alt="Portada"
              class="col-12 col-md-5 h-100"
            />
            <div class="col-12 col-md-7">
              <div class="form-group mt-2">
                <label for="det_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
                  :value="CS.det_titulo"
                  id="det_titulo"
                  placeholder="Titulo"
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
                  v-html="CS.det_descripcion"
                ></textarea>
              </div>
              <div class="form-group mt-2">
                <label for="det_img_portada" class="form-label"
                  >Imagen portada:</label
                >
                <input type="file" id="det_img_portada" class="form-control" />
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
                  data-switch="success"
                  v-model="estado"
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
        <div class="card-footer d-flex flex-row-reverse">
          <button type="button" class="btn btn-success ms-2">Actualizar</button>
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
  name: "edit",
  data() {
    return {
      CS: {},
      fi_a: null,
      ff_a: null,
      estado: true,
    };
  },
  computed: {
    ...mapState(["idCCACS", "nombreCarr", "idCarr"]),
  },
  methods: {
    async getCS() {
      try {
        let res = await this.axios.get("/api/cursos/" + this.idCCACS);
        this.CS = res.data.Descripcion;
        let fi = res.data.Descripcion.det_fecha_ini;
        this.fi_a = fi.substr(0, 10);
        let ff = res.data.Descripcion.det_fecha_fin;
        this.ff_a = ff.substr(0, 10);
        // console.log(this.CS);
      } catch (error) {
        console.log("error getCS");
        console.log(error);
      }
    },
    clickCarrera() {
      this.$store.state.getter = true;
      this.$router.push("/cs/" + this.idCarr);
    },
  },
  created() {
    this.getCS();
  },
};
</script>