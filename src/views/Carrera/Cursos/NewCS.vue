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
                  v-model="det_titulo"
                />
              </div>
              <div class="form-group mt-2">
                <label for="det_descripcion" class="form-label"
                  >Descripcion:</label
                >
                <textarea
                  id="det_descripcion"
                  class="form-control"
                  rows="12"
                  placeholder="Descripcion"
                  v-model="det_descripcion"
                ></textarea>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="form-group mt-2">
                <label for="con_foto_portada" class="form-label"
                  >Imagen portada:</label
                >
                <input
                  type="file"
                  id="det_img_portada"
                  class="form-control"
                  @change="onFileChange()"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="det_fecha_ini"
                  >Fecha de inicio:</label
                >
                <input
                  type="date"
                  id="det_fecha_ini"
                  class="form-control"
                  v-model="det_fecha_ini"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="det_fecha_fin"
                  >Fecha de final:</label
                >
                <input
                  type="date"
                  id="det_fecha_fin"
                  class="form-control"
                  v-model="det_fecha_fin"
                />
              </div>
              <div class="form-group mt-2">
                <label class="form-label" for="det_hora_ini"
                  >Hora de inicio:</label
                >
                <input
                  type="time"
                  id="det_hora_ini"
                  class="form-control"
                  v-model="det_hora_ini"
                />
              </div>
              <div class="form-group mt-2">
                <label for="tipoCS" class="form-label">Tipo:</label>
                <select
                  id="tipoCS"
                  class="form-control"
                  v-model="idtipo_curso_otros"
                >
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
            <div class="col-12 col-md-3 mt-3">
              <div class="form group">
                <label for="modalidad" class="form-label">Modalidad:</label>
                <select
                  id="modalidad"
                  class="form-control"
                  v-model="det_modalidad"
                >
                  <option value="">-- Seleccione opcion --</option>
                  <option value="VIRTUAL">VIRTUAL</option>
                  <option value="PRESENCIAL">PRESENCIAL</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-4 mt-3">
              <div class="form group">
                <label for="lugar" class="form-label">Lugar:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Lugar"
                  v-model="det_lugar_curso"
                  :disabled="mod"
                />
              </div>
            </div>
            <div class="col-12 col-md-5 mt-3">
              <div class="form group">
                <label class="form-label" for="whatsapp">Grupo WhatsApp:</label>
                <div class="input-group flex-nowrap">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="https://chat.whatsapp.com/"
                    aria-label="whatsapp"
                    aria-describedby="basic-addon1"
                    id="whatsapp"
                    v-model="det_grupo_whatssap"
                  />
                  <span class="input-group-text" id="basic-addon1"
                    ><i class="mdi mdi-whatsapp"></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 mt-3">
              <div class="form-group">
                <label class="form-label" for="det_costo">Costo:</label>
                <div class="input-group flex-nowrap">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Costo"
                    aria-label="costo"
                    aria-describedby="basic-addon1"
                    v-model="det_costo"
                  />
                  <span class="input-group-text" id="basic-addon1">bs.</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 mt-3">
              <div class="form-group">
                <label class="form-label" for="det_costo"
                  >Costo exterior:</label
                >
                <div class="input-group flex-nowrap">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Costo exterior"
                    aria-label="costo_ext"
                    aria-describedby="basic-addon1"
                    v-model="det_costo_ext"
                  />
                  <span class="input-group-text" id="basic-addon1">bs.</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 mt-3">
              <div class="form-group">
                <label class="form-label" for="det_costo"
                  >Costo profesional:</label
                >
                <div class="input-group flex-nowrap">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Costo profesional"
                    aria-label="costo_profe"
                    aria-describedby="basic-addon1"
                    v-model="det_costo_profe"
                  />
                  <span class="input-group-text" id="basic-addon1">bs.</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 mt-3">
              <div class="form-group">
                <label class="form-label" for="det_costo">Cupos:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Cupos"
                  v-model="det_cupo_max"
                />
              </div>
            </div>
            <div class="col-12 col-md-2 mt-3">
              <div class="form-group">
                <label class="form-label" for="det_costo">Carga horaria:</label>
                <div class="input-group flex-nowrap">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Carga horaria"
                    aria-label="carga_horaria"
                    aria-describedby="basic-addon1"
                    v-model="det_carga_horaria"
                  />
                  <span class="input-group-text" id="basic-addon1">hrs.</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 mt-3">
              <div class="form-group">
                <label class="form-label" for="det_costo">Version:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Version"
                  v-model="det_version"
                />
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
  name: "new_cs",
  data() {
    return {
      tipoC: {},
      tipoCentro: {},

      det_titulo: "",
      det_descripcion: "",
      det_fecha_ini: "",
      det_fecha_fin: "",
      det_hora_ini: "",
      det_lugar_curso: "",
      det_modalidad: "",
      det_grupo_whatssap: "",
      det_costo: "",
      det_costo_ext: "",
      det_costo_profe: "",
      det_cupo_max: "",
      det_carga_horaria: "",
      det_version: "",
      det_img_portada: null,
      idtipo_curso_otros: "",
    };
  },
  computed: {
    ...mapState(["idCarr", "nombreCarr", "userAdminData"]),
    rol() {
      return this.userAdminData.roles;
    },
    mod() {
      if (this.det_modalidad == "PRESENCIAL") {
        return false;
      } else {
        return true;
      }
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
    validar() {
      if (this.det_titulo != "") {
        if (this.det_descripcion != "") {
          if (this.det_fecha_ini != "") {
            if (this.det_fecha_fin != "") {
              if (this.det_hora_ini != "") {
                if (this.idtipo_curso_otros != "") {
                  if (this.det_grupo_whatssap != "") {
                    if (this.det_costo != "") {
                      if (this.det_costo_ext != "") {
                        if (this.det_costo_profe != "") {
                          if (this.det_cupo_max != "") {
                            if (this.det_carga_horaria != "") {
                              if (this.det_version != "") {
                                if (this.det_img_portada != null) {
                                  if (this.det_modalidad != "") {
                                    if (this.mod) {
                                      this.createCS();
                                    } else {
                                      if (this.det_lugar_curso == "") {
                                        this.alertDisplay(
                                          "Lugar del curso vacio",
                                          "warning",
                                          1500
                                        );
                                      } else {
                                        this.createCS();
                                      }
                                    }
                                  } else {
                                    this.alertDisplay(
                                      "Modalidad vacio",
                                      "warning",
                                      1500
                                    );
                                  }
                                } else {
                                  this.alertDisplay(
                                    "Imagen portada vacio",
                                    "warning",
                                    1500
                                  );
                                }
                              } else {
                                this.alertDisplay(
                                  "Version vacio",
                                  "warning",
                                  1500
                                );
                              }
                            } else {
                              this.alertDisplay(
                                "Carga horaria vacio",
                                "warning",
                                1500
                              );
                            }
                          } else {
                            this.alertDisplay(
                              "Cupo maximo vacio",
                              "warning",
                              1500
                            );
                          }
                        } else {
                          this.alertDisplay(
                            "Costo profesional vacio",
                            "warning",
                            1500
                          );
                        }
                      } else {
                        this.alertDisplay(
                          "Costo exterior vacio",
                          "warning",
                          1500
                        );
                      }
                    } else {
                      this.alertDisplay("Costo vacio", "warning", 1500);
                    }
                  } else {
                    this.alertDisplay("Grupo WhatsApp vacio", "warning", 1500);
                  }
                } else {
                  this.alertDisplay("Tipo vacio", "warning", 1500);
                }
              } else {
                this.alertDisplay("Hora de inicio vacio", "warning", 1500);
              }
            } else {
              this.alertDisplay("Fecha fin vacio", "warning", 1500);
            }
          } else {
            this.alertDisplay("Fecha inicio vacio", "warning", 1500);
          }
        } else {
          this.alertDisplay("Descripcion vacio", "warning", 1500);
        }
      } else {
        this.alertDisplay("Titulo vacio", "warning", 1500);
      }
    },
    onFileChange() {
      let img = document.querySelector("#det_img_portada");
      this.det_img_portada = img.files[0];
    },
    async createCS() {
      let postCS = {
        det_titulo: this.det_titulo,
        det_descripcion: this.det_descripcion,
        det_fecha_ini: this.det_fecha_ini,
        det_fecha_fin: this.det_fecha_fin,
        det_hora_ini: this.det_hora_ini,
        det_lugar_curso: this.det_lugar_curso,
        det_modalidad: this.det_modalidad,
        det_grupo_whatssap: this.det_grupo_whatssap,
        det_costo: this.det_costo,
        det_costo_ext: this.det_costo_ext,
        det_costo_profe: this.det_costo_profe,
        det_cupo_max: this.det_cupo_max,
        det_carga_horaria: this.det_carga_horaria,
        det_version: this.det_version,
        idtipo_curso_otros: this.idtipo_curso_otros,
        det_img_portada: this.det_img_portada,
      };
      console.log(postCS);
      try {
        let res = await this.axios.post(
          "/api/cursosAll/" + this.idCarr,
          postCS,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        //   // console.log(res);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Creado";
        this.$store.state.evMsg = res.data.message;
        this.clickCarrera();
      } catch (error) {
        // console.log("error createCCA");
        console.log(error);
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
    this.getTipoCur();
  },
};
</script>