<template>
  <div>
    <div id="loading_carrera">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container-fluid pt-2" id="cont_carr_error">
      <h1>Error al retornar datos de la carrera</h1>
    </div>
    <div class="container-fluid pt-2" id="cont_carr">
      <h1 class="text-uppercase">Carrera {{ nombreCarr }}</h1>
      <div class="container-fluid">
        <div class="row">
          <!-- nav -->
          <ul class="col-12 col-md-10 nav nav-tabs mb-3">
            <li class="nav-item">
              <a
                href="#inicio"
                data-bs-toggle="tab"
                aria-expanded="true"
                class="nav-link active"
              >
                <span class="d-none d-md-block">INICIO</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#cursos"
                data-bs-toggle="tab"
                aria-expanded="false"
                class="nav-link"
              >
                <span class="d-none d-md-block"
                  >CURSOS &nbsp;<span class="badge bg-info">{{
                    filterCur.length
                  }}</span></span
                >
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#seminarios"
                data-bs-toggle="tab"
                aria-expanded="false"
                class="nav-link"
              >
                <span class="d-none d-md-block"
                  >SEMINARIOS &nbsp;<span class="badge bg-info">{{
                    filterSem.length
                  }}</span></span
                >
              </a>
            </li>
          </ul>
          <div class="col-12 col-md-2">
            <button class="btn btn-primary float-end" @click="newCS()">
              Crear nuevo
            </button>
          </div>
        </div>
        <div class="tab-content">
          <div class="tab-pane show active" id="inicio">
            <div class="container-fluid">
              <div class="row">
                <div
                  class="col-12 col-md-6"
                  v-for="(frase, id_frase) of Carrera.frases"
                  :key="id_frase"
                >
                  <div class="card ribbon-box">
                    <div class="card-body">
                      <div class="ribbon ribbon-primary float-start">
                        <i class="mdi mdi-access-point me-1"></i
                        >{{ Carrera.carrera }}
                      </div>
                      <h5 class="text-primary float-end mt-0">
                        Frase {{ id_frase }}
                      </h5>
                      <div class="ribbon-content">{{ frase.frase }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <h2>Links</h2>
                  <div class="list-group">
                    <a
                      :href="link.url_links"
                      target="_blank"
                      class="list-group-item list-group-item-action"
                      v-for="(link, id_link) of Carrera.links"
                      :key="id_link"
                      >{{ link.nombre_links }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="cursos">
            <div class="container-fluid">
              <div class="row">
                <div v-if="filterCur.length == 0">
                  <h1 class="text-center">Sin cursos</h1>
                </div>
                <div
                  v-else
                  v-for="(cur, id_cur) of filterCur"
                  :key="id_cur"
                  class="col-12 col-md-4 col-xl-3 col-xxl-2"
                >
                  <a
                    class="card card-cs ribbon-box tipoC w-100"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modal_cur_' + id_cur"
                  >
                    <div class="card-body">
                      <div
                        class="ribbon float-start"
                        :class="[
                          cur.det_estado == '1'
                            ? 'ribbon-success'
                            : 'ribbon-danger',
                        ]"
                      >
                        <i class="mdi mdi-access-point me-1"></i
                        ><span v-if="cur.det_estado == '1'"> Activo</span
                        ><span v-if="cur.det_estado != '1'"> Inactivo</span>
                      </div>
                      <h5 class="text-dark float-end mt-0">
                        {{ cur.tipo_curso_otro.tipo_conv_curso_nombre }}
                      </h5>
                      <div class="ribbon-content">
                        <img
                          :src="url_api + '/Cursos/' + cur.det_img_portada"
                          alt="img"
                          class="card-img-top"
                        />

                        <div class="card-title fw-bold mt-2">
                          {{ cur.det_titulo }}
                        </div>
                        <pre
                          class="card-text contenedor"
                          v-html="cur.det_descripcion"
                          style="max-height: 200px; overflow-y: scroll"
                        ></pre>
                      </div>
                    </div>
                    <div class="card-footer p-3">
                      <div class="col-12">
                        <p><b>Inicio:</b> {{ dmy(cur.det_fecha_ini) }}</p>
                      </div>
                      <div class="col-12">
                        <p><b>Fin:</b> {{ dmy(cur.det_fecha_fin) }}</p>
                      </div>
                      <div class="col">
                        <p><b>Costo:</b> {{ cur.det_costo }} bs.</p>
                      </div>
                    </div>
                    <div class="card-footer p-3">
                      <div class="row">
                        <div class="col-12 col-md-6">
                          <b>Costo exterior:</b><br />
                          {{ cur.det_costo_ext }} bs.
                        </div>
                        <div class="col-12 col-md-6">
                          <b>Costo profesional:</b><br />
                          {{ cur.det_costo_profe }} bs.
                        </div>
                        <div class="col-12 col-md-6">
                          <b>Modalidad:</b><br />
                          {{ cur.det_modalidad }}
                        </div>
                        <div class="col-12 col-md-6">
                          <b>Carga horaria:</b><br />
                          {{ cur.det_carga_horaria }} hrs.
                        </div>
                      </div>
                    </div>
                  </a>

                  <div
                    class="modal fade"
                    :id="'modal_cur_' + id_cur"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    :aria-labelledby="'modal_cur_label_' + id_cur"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            :id="'modal_cur_label_' + id_cur"
                          >
                            {{ cur.det_titulo }}
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
                                :href="
                                  url_api + '/Cursos/' + cur.det_img_portada
                                "
                                target="_blank"
                              >
                                <img
                                  :src="
                                    url_api + '/Cursos/' + cur.det_img_portada
                                  "
                                  alt="img"
                                  class="card-img-top h-100 img-modal"
                              /></a>
                            </div>
                            <div class="col-12 col-md-7">
                              <pre
                                class="card-text contenedor p-2"
                                v-html="cur.det_descripcion"
                                style="overflow-y: scroll"
                              ></pre>
                              <h5>Facilitadores</h5>
                              <ul>
                                <li
                                  class="
                                    d-flex
                                    justify-content-between
                                    flex-wrap
                                    mb-2
                                  "
                                  v-for="(faci, id_faci) of cur.facilitadores"
                                  :key="id_faci"
                                >
                                  <div>
                                    &bull; &nbsp;
                                    {{ faci.nombre_facilitador }}
                                    &nbsp;<span class="badge bg-info">{{
                                      faci.cargo_facilitador
                                    }}</span>
                                  </div>
                                  <div class="text-muted">
                                    {{ faci.descripcion_facilitador }}
                                  </div>
                                  <div>
                                    <a
                                      class="btn btn-sm btn-success"
                                      :href="faci.celular_facilitador"
                                      target="_blank"
                                    >
                                      <i class="mdi mdi-whatsapp"></i>
                                    </a>
                                    <a
                                      class="btn btn-sm ms-1 text-white"
                                      style="background-color: var(--ct-blue)"
                                      :href="faci.facebook_facilitador"
                                      target="_blank"
                                    >
                                      <i class="mdi mdi-facebook"></i>
                                    </a>
                                    <div class="btn btn-sm btn-warning ms-1">
                                      <i class="mdi mdi-account-edit"></i>
                                    </div>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-danger ms-1"
                                      data-bs-dismiss="modal"
                                      @click="
                                        deleteMsgFacilitador(
                                          faci.id_facilitador,
                                          foto_facilitador
                                        )
                                      "
                                    >
                                      <i class="mdi mdi-delete"></i>
                                    </button>
                                  </div>
                                  <hr />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <div class="ms-3 row">
                              <div class="col-12 col-md-6">
                                <b>Fecha inicio:</b>
                                {{ dmy(cur.det_fecha_ini) }}
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Fecha fin:</b> {{ dmy(cur.det_fecha_fin) }}
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Hora inicio:</b> {{ cur.det_hora_ini }}
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Costo:</b> {{ cur.det_costo }} bs.<br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Costo exterior:</b>
                                {{ cur.det_costo_ext }} bs.
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Costo profesional:</b>
                                {{ cur.det_costo_profe }} bs.<br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Carga horaria:</b>
                                {{ cur.det_carga_horaria }} hrs.
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Modalidad:</b> {{ cur.det_modalidad }} <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Lugar:</b> {{ cur.det_lugar_curso }} <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Estado:</b
                                ><span v-if="cur.det_estado == '1'">
                                  Activo </span
                                ><span v-else> Inactivo </span><br />
                              </div>
                            </div>
                          </div>
                          <div
                            class="
                              card-footer
                              d-flex
                              justify-content-end
                              flex-wrap
                            "
                          >
                            <div>
                              <button
                                type="button"
                                class="btn btn-secondary ms-2"
                                data-bs-dismiss="modal"
                              >
                                Cerrar
                              </button>
                              <a
                                :href="cur.det_grupo_whatssap"
                                target="_blank"
                                class="btn btn-success ms-2"
                              >
                                <i class="mdi mdi-whatsapp"></i>&nbsp; Grupo
                                WhatsApp
                              </a>
                              <button
                                data-bs-dismiss="modal"
                                class="btn btn-info ms-2 text-dark"
                                @click="
                                  newFacilitador(
                                    cur.iddetalle_cursos_academicos
                                  )
                                "
                              >
                                <i class="mdi mdi-account-plus"></i>&nbsp;
                                Agregar facilitador
                              </button>
                              <button
                                type="button"
                                class="btn btn-danger ms-2"
                                data-bs-dismiss="modal"
                                @click="
                                  deleteMsg(
                                    'el curso',
                                    cur.iddetalle_cursos_academicos,
                                    cur.det_img_portada
                                  )
                                "
                              >
                                <i class="mdi mdi-delete-sweep-outline"></i
                                >&nbsp; Eliminar
                              </button>
                              <button
                                data-bs-dismiss="modal"
                                class="btn btn-warning ms-2"
                                @click="editCS(cur.iddetalle_cursos_academicos)"
                              >
                                <i class="mdi mdi-clipboard-edit-outline"></i
                                >&nbsp; Editar
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
          <div class="tab-pane" id="seminarios">
            <div class="container-fluid">
              <div class="row">
                <div v-if="filterSem.length == 0">
                  <h1 class="text-center">Sin seminarios</h1>
                </div>
                <div
                  v-else
                  v-for="(sem, id_sem) of filterSem"
                  :key="id_sem"
                  class="col-12 col-md-4 col-xl-3 col-xxl-2"
                >
                  <a
                    class="card card-cs ribbon-box tipoC w-100"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modal_sem_' + id_sem"
                  >
                    <div class="card-body">
                      <div
                        class="ribbon float-start"
                        :class="[
                          sem.det_estado == '1'
                            ? 'ribbon-success'
                            : 'ribbon-danger',
                        ]"
                      >
                        <i class="mdi mdi-access-point me-1"></i
                        ><span v-if="sem.det_estado == '1'"> Activo</span
                        ><span v-if="sem.det_estado != '1'"> Inactivo</span>
                      </div>
                      <h5 class="text-dark float-end mt-0">
                        {{ sem.tipo_curso_otro.tipo_conv_curso_nombre }}
                      </h5>
                      <div class="ribbon-content">
                        <img
                          :src="url_api + '/Cursos/' + sem.det_img_portada"
                          alt="img"
                          class="card-img-top"
                        />

                        <div class="card-title fw-bold mt-2">
                          {{ sem.det_titulo }}
                        </div>
                        <pre
                          class="card-text contenedor"
                          v-html="sem.det_descripcion"
                          style="max-height: 200px; overflow-y: scroll"
                        ></pre>
                      </div>
                    </div>
                    <div class="card-footer p-3">
                      <div class="col-12">
                        <p><b>Inicio:</b> {{ dmy(sem.det_fecha_ini) }}</p>
                      </div>
                      <div class="col-12">
                        <p><b>Fin:</b> {{ dmy(sem.det_fecha_fin) }}</p>
                      </div>
                      <div class="col">
                        <p><b>Costo:</b> {{ sem.det_costo }} bs.</p>
                      </div>
                    </div>
                    <div class="card-footer p-3">
                      <div class="row">
                        <div class="col-12 col-md-6">
                          <b>Costo exterior:</b><br />
                          {{ sem.det_costo_ext }} bs.
                        </div>
                        <div class="col-12 col-md-6">
                          <b>Costo profesional:</b><br />
                          {{ sem.det_costo_profe }} bs.
                        </div>
                        <div class="col-12 col-md-6">
                          <b>Modalidad:</b><br />
                          {{ sem.det_modalidad }}
                        </div>
                        <div class="col-12 col-md-6">
                          <b>Carga horaria:</b><br />
                          {{ sem.det_carga_horaria }} hrs.
                        </div>
                      </div>
                    </div>
                  </a>

                  <div
                    class="modal fade"
                    :id="'modal_sem_' + id_sem"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    :aria-labelledby="'modal_sem_label_' + id_sem"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            :id="'modal_sem_label_' + id_sem"
                          >
                            {{ sem.det_titulo }}
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
                                :href="
                                  url_api + '/Cursos/' + sem.det_img_portada
                                "
                                target="_blank"
                              >
                                <img
                                  :src="
                                    url_api + '/Cursos/' + sem.det_img_portada
                                  "
                                  alt="img"
                                  class="card-img-top h-100 img-modal"
                              /></a>
                            </div>
                            <div class="col-12 col-md-7">
                              <pre
                                class="card-text contenedor p-2"
                                v-html="sem.det_descripcion"
                                style="overflow-y: scroll"
                              ></pre>
                              <h5>Facilitadores</h5>
                              <ul>
                                <li
                                  class="
                                    d-flex
                                    justify-content-between
                                    flex-wrap
                                    mb-2
                                  "
                                  v-for="(faci, id_faci) of sem.facilitadores"
                                  :key="id_faci"
                                >
                                  <div>
                                    &bull; &nbsp;
                                    {{ faci.nombre_facilitador }}
                                    &nbsp;<span class="badge bg-info">{{
                                      faci.cargo_facilitador
                                    }}</span>
                                  </div>
                                  <div class="text-muted">
                                    {{ faci.descripcion_facilitador }}
                                  </div>
                                  <div>
                                    <a
                                      class="btn btn-sm btn-success"
                                      :href="faci.celular_facilitador"
                                      target="_blank"
                                    >
                                      <i class="mdi mdi-whatsapp"></i>
                                    </a>
                                    <a
                                      class="btn btn-sm ms-1 text-white"
                                      style="background-color: var(--ct-blue)"
                                      :href="faci.facebook_facilitador"
                                      target="_blank"
                                    >
                                      <i class="mdi mdi-facebook"></i>
                                    </a>
                                    <div class="btn btn-sm btn-warning ms-1">
                                      <i class="mdi mdi-account-edit"></i>
                                    </div>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-danger ms-1"
                                      data-bs-dismiss="modal"
                                      @click="
                                        deleteMsgFacilitador(
                                          faci.id_facilitador,
                                          foto_facilitador
                                        )
                                      "
                                    >
                                      <i class="mdi mdi-delete"></i>
                                    </button>
                                  </div>
                                  <hr />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <div class="ms-3 row">
                              <div class="col-12 col-md-6">
                                <b>Fecha inicio:</b>
                                {{ dmy(sem.det_fecha_ini) }}
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Fecha fin:</b> {{ dmy(sem.det_fecha_fin) }}
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Hora inicio:</b> {{ sem.det_hora_ini }}
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Costo:</b> {{ sem.det_costo }} bs. <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Costo exterior:</b>
                                {{ sem.det_costo_ext }} bs.
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Costo profesional:</b>
                                {{ sem.det_costo_profe }} bs. <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Carga horaria:</b>
                                {{ sem.det_carga_horaria }} hrs.
                                <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Modalidad:</b> {{ sem.det_modalidad }} <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Lugar:</b> {{ sem.det_lugar_semso }} <br />
                              </div>
                              <div class="col-12 col-md-6">
                                <b>Estado:</b
                                ><span v-if="sem.det_estado == '1'">
                                  Activo </span
                                ><span v-else> Inactivo </span><br />
                              </div>
                            </div>
                          </div>
                          <div class="card-footer d-flex justify-content-end">
                            <div>
                              <button
                                type="button"
                                class="btn btn-secondary ms-2"
                                data-bs-dismiss="modal"
                              >
                                Cerrar
                              </button>
                              <a
                                :href="sem.det_grupo_whatssap"
                                target="_blank"
                                class="btn btn-success ms-2"
                              >
                                <i class="mdi mdi-whatsapp"></i>&nbsp; Grupo
                                WhatsApp
                              </a>
                              <button
                                data-bs-dismiss="modal"
                                class="btn btn-info ms-2 text-dark"
                                @click="
                                  newFacilitador(
                                    sem.iddetalle_cursos_academicos
                                  )
                                "
                              >
                                <i class="mdi mdi-account-plus"></i>&nbsp;
                                Agregar facilitador
                              </button>
                              <button
                                type="button"
                                class="btn btn-danger ms-2"
                                data-bs-dismiss="modal"
                                @click="
                                  deleteMsg(
                                    'el seminario',
                                    sem.iddetalle_semsos_academicos,
                                    sem.det_img_portada
                                  )
                                "
                              >
                                <i class="mdi mdi-delete-sweep-outline"></i
                                >&nbsp; Eliminar
                              </button>
                              <button
                                data-bs-dismiss="modal"
                                class="btn btn-warning ms-2"
                                @click="editCS(sem.iddetalle_semsos_academicos)"
                              >
                                <i class="mdi mdi-clipboard-edit-outline"></i
                                >&nbsp; Editar
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
        <!-- nav end -->
      </div>
    </div>
  </div>
</template>

<style scoped>
#loading_carrera {
  position: fixed;
  background-color: var(--ct-body-bg);
  width: 100vw;
  height: 100vh;
  z-index: 2000;
}
#loading_carrera > div {
  position: absolute;
  left: 35%;
  top: 40%;
}
.mio {
  word-wrap: break-word;
  word-break: break-all;
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
.card-cs {
  opacity: 0.7;
  transition: transform 0.5s;
  user-select: none;
  semsor: pointer;
  color: var(--ct-body-color);
}
.card-cs:hover {
  transform: scale(107%);
  opacity: 1;
  user-select: none;
}
.img-modal {
  transform: scale(100%);
  transition: transform 0.5s;
}
.img-modal:hover {
  transform: scale(95%);
}
.img-modal:active {
  transform: scale(90%);
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Carrera: {},
      filterCur: [],
      filterSem: [],
      Facilitador: null,
    };
  },
  computed: {
    ...mapState([
      "idCarr",
      "nombreCarr",
      "getter",
      "idCCACS",
      "ev",
      "evMsg",
      "evTitle",
      "url_api",
    ]),
  },
  methods: {
    async getCarrera() {
      // console.log("getCarrera");
      try {
        let res = await this.axios.get("/api/UpeaCarrera/" + this.idCarr);
        this.Carrera = res.data.Descripcion;
        document.getElementById("cont_carr_error").style.display = "none";
        document.getElementById("cont_carr").style.display = "block";
      } catch (error) {
        console.log("error getCarrera");
        if (error.response.status == 500) {
          document.getElementById("cont_carr").style.display = "none";
          document.getElementById("cont_carr_error").style.display = "block";
          // console.log("Error al retornar datos de la carrera");
        }
        // console.log(error);
      }
    },
    async getCursosAll() {
      try {
        let res = await this.axios.get("/api/cursosAll/" + this.idCarr);
        this.filterCur = [];
        this.filterSem = [];
        res.data.forEach((curs) => {
          if (curs.tipo_curso_otro.tipo_conv_curso_nombre == "CURSOS") {
            this.filterCur.push(curs);
          } else {
            if (curs.tipo_curso_otro.tipo_conv_curso_nombre == "SEMINARIOS") {
              this.filterSem.push(curs);
            } else {
              //
            }
          }
        });
        this.cargando();
      } catch (error) {
        console.log("error getCursosAll");
        // console.log(error);
      }
    },
    editCS(idCS) {
      this.$store.state.idCCACS = idCS;
      this.$router.push("/edit_cs/" + idCS);
    },
    newFacilitador(idCS) {
      this.$store.state.idCCACS = idCS;
      this.$router.push("/facilitador/" + idCS);
    },
    async deleteCS(id, img) {
      try {
        let res = await this.axios.delete("/api/cursos/" + id + "/" + img);
        this.getCursosAll();
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        console.log("error deleteCS");
        // console.log(error);
        if (error.response.status == 500) {
          this.getCursosAll();
          this.cargando();
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
        }
      }
    },
    async deleteFacilitador(id, img) {
      try {
        let res = await this.axios.delete("/api/Facilitador/" + id + "/" + img);
        this.getCursosAll();
        this.$swal("Eliminado", res.data.message, "success");
      } catch (error) {
        console.log("error deleteFacilitador");
        console.log(error);
        if (error.response.status == 500) {
          this.getCursosAll();
          this.cargando();
          this.$swal({
            title: error.response.data.message,
            icon: "error",
            showConfirmButton: true,
          });
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
          this.deleteCS(id, img);
        }
      });
    },
    deleteMsgFacilitador(id, img) {
      this.$swal({
        title: "Eliminar facilitador",
        text: "Esta seguro de eliminar el facilitador",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteFacilitador(id, img);
        }
      });
    },
    newCS() {
      this.$router.push("/new_cs/" + this.idCarr);
    },
    alertDisplay(msg, icon, time) {
      this.$swal({
        title: msg,
        icon: icon,
        showConfirmButton: false,
        timer: time,
      });
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
    cargando() {
      document.getElementById("loading_carrera").style.display = "none";
      if (this.ev == 1) {
        this.$swal(this.evTitle, this.evMsg, "success");
        this.$store.state.ev = 0;
        this.$store.state.evTitle = "";
        this.$store.state.evMsg = "";
      }
      console.log("cargado");
    },
  },
  created() {
    if (this.getter) {
      this.getCarrera();
      this.getCursosAll();
      this.$store.state.getter = false;
    }
  },
  updated() {
    if (this.getter) {
      document.getElementById("loading_carrera").style.display = "block";
      this.getCarrera();
      this.getCursosAll();
      this.$store.state.getter = false;
    }
  },
};
</script>