<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center">{{ getCarr }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="con_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
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
                  placeholder="Descripcion"
                ></textarea>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="con_foto_portada" class="form-label"
                  >Imagen portada:</label
                >
                <input type="file" id="con_foto_portada" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="fecha_inicio"
                  >Fecha de inicio:</label
                >
                <input type="date" id="fecha_inicio" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="fecha_final"
                  >Fecha de final:</label
                >
                <input type="date" id="fecha_final" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <label for="tipoCCA" class="form-label">Tipo:</label>
                <select id="tipoCCA" class="form-control">
                  <option value="">-- Seleccione tipo --</option>
                  <option
                    v-for="(tipo, id_tipo) of tipoC"
                    :key="id_tipo"
                    :value="tipo.idtipo_conv_comun"
                  >
                    {{ tipo.tipo_conv_comun_titulo }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex flex-row-reverse">
          <button type="button" class="btn btn-success ms-2">
            Crear nuevo
          </button>
          <router-link
            :to="{
              path: '/carrera/' + getID,
              name: 'carrera',
              params: {
                id_car: getID,
                carrera: getCarr,
              },
            }"
            class="btn btn-secondary"
            @click="clickCarrera()"
            >Volver</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "new",
  data() {
    return {
      tipoC: {},
    };
  },
  computed: {
    getID() {
      return this.$route.params.id_car;
    },
    getCarr() {
      return this.$route.params.carrera;
    },
  },
  methods: {
    async getTipoCon() {
      try {
        let res = await this.axios.get("/api/Tipoconvocatorias/");
        this.tipoC = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    clickCarrera() {
      this.$store.state.getter = true;
    },
  },
  created() {
    this.getTipoCon();
  },
};
</script>