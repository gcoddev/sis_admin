<template>
  <div class="container-fluid">
    <div class="container">
      <h2 class="text-center">{{ nombreCarr }}</h2>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="det_titulo" class="form-label">Titulo:</label>
                <input
                  type="text"
                  class="form-control"
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
                <label for="tipoCS" class="form-label">Tipo:</label>
                <select id="tipoCS" class="form-control">
                  <option value="">-- Seleccione tipo --</option>
                  <option
                    v-if="rol == 'CENTRO_ESTUDIANTES'"
                    :value="tipoCentro.idtipo_curso_otros"
                  >
                    {{ tipoCentro.tipo_conv_curso_nombre }}
                  </option>
                  <option
                    v-else
                    v-for="(tipo, id_tipo) of tipoC"
                    :key="id_tipo"
                    :value="tipo.idtipo_curso_otros"
                  >
                    {{ tipo.tipo_conv_curso_nombre }}
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
  name: "new_cs",
  data() {
    return {
      tipoC: {},
      tipoCentro: {},
    };
  },
  computed: {
    ...mapState(["idCarr", "nombreCarr", "userAdminData"]),
    rol() {
      return this.userAdminData.roles;
    },
  },
  methods: {
    async getTipoCur() {
      try {
        let res = await this.axios.get("/api/TipoCurso");
        if (this.rol == "CENTRO_ESTUDIANTES") {
          res.data.forEach((tipo) => {
            if (tipo.tipo_conv_curso_nombre == "CURSOS") {
              this.tipoCentro = tipo;
            }
          });
        } else {
          this.tipoC = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    clickCarrera() {
      this.$store.state.getter = true;
      this.$router.push("/cs/" + this.idCarr);
    },
  },
  created() {
    this.getTipoCur();
  },
};
</script>