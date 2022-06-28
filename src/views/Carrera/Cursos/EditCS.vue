<template>
  <div class="container-fluid">
    <h1 class="text-dark">{{ nombreCarr }}</h1>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center text-dark">{{ CS.tipo_conv_curso_nombre }}</h2>
          <div class="row">
            <img
              :src="url_api + '/Cursos/' + CS.det_img_portada"
              alt="Portada"
              class="col-12 col-md-5 h-100"
            />
            <div class="col-12 col-md-7">
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
                  rows="10"
                  v-model="det_descripcion"
                ></textarea>
              </div>
              <div class="form-group mt-2">
                <label for="det_img_portada" class="form-label"
                  >Imagen portada:</label
                >
                <input
                  type="file"
                  id="det_img_portada"
                  class="form-control"
                  @change="onFileChange()"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-3 mt-3">
              <div class="form-group">
                <label class="form-label" for="fecha_inicio"
                  >Fecha de inicio:</label
                >
                <input
                  type="date"
                  id="fecha_inicio"
                  class="form-control"
                  v-model="det_fecha_ini"
                />
              </div>
            </div>
            <div class="col-12 col-md-3 mt-3">
              <div class="form-group">
                <label class="form-label" for="fecha_final">Fecha final:</label>
                <input
                  type="date"
                  id="fecha_final"
                  class="form-control"
                  v-model="det_fecha_fin"
                />
              </div>
            </div>
            <div class="col-12 col-md-4 mt-3">
              <div class="form-group">
                <label class="form-label" for="hora_ini">Hora de inicio:</label>
                <input
                  type="time"
                  id="hora_ini"
                  class="form-control"
                  placeholder="Hora inicio"
                  v-model="det_hora_ini"
                />
              </div>
            </div>
            <div class="col-12 col-md-2 d-flex mt-3">
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
                  <a :href="det_grupo_whatssap" target="_blank">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="mdi mdi-whatsapp"></i
                    ></span>
                  </a>
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
            Actualizar
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
  name: "edit",
  data() {
    return {
      CS: {},
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
      det_estado: "",
      estado: false,
      det_img_portada: null,
      dip: false,
    };
  },
  computed: {
    ...mapState(["idCCACS", "nombreCarr", "idCarr", 'url_api']),
    mod() {
      if (this.det_modalidad == "PRESENCIAL") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async getCS() {
      // console.log("getCS");
      try {
        let res = await this.axios.get("/api/cursos/" + this.idCCACS);
        this.CS = res.data.Descripcion;
        this.det_titulo = this.CS.det_titulo;
        this.det_descripcion = this.CS.det_descripcion;
        let fi = this.CS.det_fecha_ini;
        this.det_fecha_ini = fi.substr(0, 10);
        let ff = this.CS.det_fecha_fin;
        this.det_fecha_fin = ff.substr(0, 10);
        this.det_hora_ini = this.CS.det_hora_ini;
        this.det_grupo_whatssap = this.CS.det_grupo_whatssap;
        this.det_costo = this.CS.det_costo;
        this.det_costo_ext = this.CS.det_costo_ext;
        this.det_costo_profe = this.CS.det_costo_profe;
        this.det_cupo_max = this.CS.det_cupo_max;
        this.det_carga_horaria = this.CS.det_carga_horaria;
        this.det_version = this.CS.det_version;
        this.det_modalidad = this.CS.det_modalidad;
        this.det_lugar_curso = this.CS.det_lugar_curso;
        if (this.CS.det_estado == "1") {
          this.estado = true;
        } else {
          this.estado = false;
        }

        // console.log(this.CS);
      } catch (error) {
        // console.log("error getCS");
        // console.log(error);
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
                if (this.det_grupo_whatssap != "") {
                  if (this.det_costo != "") {
                    if (this.det_costo_ext != "") {
                      if (this.det_costo_profe != "") {
                        if (this.det_cupo_max != "") {
                          if (this.det_carga_horaria != "") {
                            if (this.det_version != "") {
                              if (this.det_modalidad != "") {
                                if (this.mod) {
                                  if (this.estado) {
                                    this.det_estado = "1";
                                  } else {
                                    this.det_estado = "0";
                                  }
                                  if (this.dip) {
                                    this.updateImageCS();
                                  }
                                  this.updateCS();
                                } else {
                                  if (this.det_lugar_curso == "") {
                                    this.alertDisplay(
                                      "Lugar del curso vacio",
                                      "warning",
                                      1500
                                    );
                                  } else {
                                    if (this.estado) {
                                      this.det_estado = "1";
                                    } else {
                                      this.det_estado = "0";
                                    }
                                    if (this.dip) {
                                      this.updateImageCS();
                                    }
                                    this.updateCS();
                                  }
                                }
                              } else {
                                this.alertDisplay(
                                  "Modalidad vacio",
                                  "warning",
                                  1500
                                );
                              }
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
                this.alertDisplay("Hora inicio vacio", "warning", 1500);
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
      this.dip = true;
    },
    async updateCS() {
      let putCS = {
        det_titulo: this.det_titulo,
        det_descripcion: this.det_descripcion,
        det_costo: this.det_costo,
        det_costo_ext: this.det_costo_ext,
        det_costo_profe: this.det_costo_profe,
        det_cupo_max: this.det_cupo_max,
        det_carga_horaria: this.det_carga_horaria,
        det_lugar_curso: this.det_lugar_curso,
        det_modalidad: this.det_modalidad,
        det_fecha_ini: this.det_fecha_ini,
        det_fecha_fin: this.det_fecha_fin,
        det_hora_ini: this.det_hora_ini,
        det_grupo_whatssap: this.det_grupo_whatssap,
        det_version: this.det_version,
        det_estado: this.det_estado,
      };
      try {
        let res = await this.axios.put("/api/cursos/" + this.idCCACS, putCS);
        // console.log(res);
        this.$store.state.ev = 1;
        this.$store.state.evTitle = "Actualizado";
        this.$store.state.evMsg = res.data.message;
        this.clickCarrera();
      } catch (error) {
        // console.log("error putCS");
        // console.log(error);
        if (error.response.status == 500) {
          location.reload();
        }
      }
    },
    async updateImageCS() {
      let putImageCS = {
        det_img_portada: this.det_img_portada,
      };
      try {
        let res = await this.axios.put(
          "/api/cursos/" + this.idCCACS + "/" + this.CCA.det_img_portada,
          putImageCS,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } catch (error) {
        // console.log("error updateImageCS");
        // console.log(error);
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
    this.getCS();
  },
};
</script>