<template>
  <div>
    <div id="loading_upea">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container-fluid text-center mt-3">
      <div class="card">
        <div class="card-body">
          <div
            id="indicador_img"
            class="carousel border border-info slide w-50 m-auto card-img-top"
            data-bs-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-bs-target="#indicador_img"
                v-for="(por, id_p) of Institucion.portada"
                :key="id_p"
                :data-bs-slide-to="id_p"
                class="active"
              ></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div
                class="carousel-item"
                v-for="(por, id_por) of Institucion.portada"
                :class="[id_por == '0' ? 'active' : '']"
                :key="id_por"
                data-bs-interval="5000"
              >
                <img
                  class="d-block img-fluid"
                  :src="
                    url_api + '/InstitucionUpea/Portada/' + por.portada_imagen
                  "
                  :alt="por.portada_imagen"
                  id="img_carrusel"
                />
                <div class="carousel-caption d-none d-md-block">
                  <h3 class="text-white">{{ por.portada_titulo }}</h3>
                  <p>{{ por.portada_subtitulo }}</p>
                </div>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#indicador_img"
              role="button"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#indicador_img"
              role="button"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </a>
          </div>
          <div class="card-title mt-5">
            <h2>{{ Institucion.institucion_nombre }}</h2>
          </div>
          <div class="row m-3">
            <div class="col-12 col-md-6">
              <div class="card border-success border ribbon-box">
                <div class="card-body">
                  <div class="ribbon ribbon-success float-start">
                    &nbsp; MISION
                    <i class="mdi mdi-access-point me-1"></i>
                  </div>
                  <ul class="fs-4 mt-0">
                    <div class="ribbon-content">
                      <pre
                        class="card-text contenedor"
                        v-html="Institucion.institucion_mision"
                        style="max-height: 250px"
                      ></pre>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="card border-success border ribbon-box">
                <div class="card-body">
                  <div class="ribbon ribbon-success float-start">
                    &nbsp; VISION
                    <i class="mdi mdi-access-point me-1"></i>
                  </div>
                  <ul class="fs-4 mt-0">
                    <div class="ribbon-content">
                      <pre
                        class="card-text contenedor"
                        v-html="Institucion.institucion_vision"
                        style="max-height: 250px"
                      ></pre>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="card-text m-5">
            <div class="accordion custom-accordion" id="custom-accordion-one">
              <div class="card mb-0">
                <div class="card-header" id="headingOne">
                  <h5 class="m-0">
                    <a
                      class="custom-accordion-title d-block py-1"
                      data-bs-toggle="collapse"
                      href="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Autoridades
                      <i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12 col-md-9"></div>
                      <button class="col-12 col-md-3 mb-3 btn btn-primary">
                        Añadir autoridad
                      </button>
                    </div>
                    <div class="row">
                      <div
                        v-for="(
                          autoridad, id_autoridad
                        ) of Institucion.autoridad"
                        :key="id_autoridad"
                        class="
                          col-12 col-md-4 col-xl-3
                          card card-upea
                          border border-success
                          d-block
                        "
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            {{ autoridad.nombre_autoridad }}
                          </h5>
                          <h6 class="card-subtitle text-muted">
                            <span class="fw-bold text-uppercase">{{
                              autoridad.cargo_autoridad
                            }}</span>
                          </h6>
                        </div>
                        <img
                          class="img-fluid"
                          :src="
                            url_api +
                            '/InstitucionUpea/Autoridad/' +
                            autoridad.foto_autoridad
                          "
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <a
                            :href="autoridad.facebook_autoridad"
                            target="_blank"
                            class="btn text-white"
                            style="background-color: var(--ct-blue)"
                          >
                            <i class="mdi mdi-facebook"></i>
                          </a>
                          <a
                            :href="
                              'https://api.whatsapp.com/send?phone=+591' +
                              autoridad.celular_autoridad
                            "
                            target="_blank"
                            class="btn btn-success m-2"
                          >
                            <i class="mdi mdi-whatsapp"></i>
                          </a>
                          <a
                            :href="autoridad.twitter_autoridad"
                            target="_blank"
                            class="btn btn-info"
                          >
                            <i class="mdi mdi-twitter"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-0">
                <div class="card-header" id="headingTwo">
                  <h5 class="m-0">
                    <a
                      class="custom-accordion-title collapsed d-block py-1"
                      data-bs-toggle="collapse"
                      href="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Sobre la institucion
                      <i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div
                    class="card-body"
                    v-html="Institucion.institucion_sobre_ins"
                  ></div>
                </div>
              </div>
              <div class="card mb-0">
                <div class="card-header" id="headingThree">
                  <h5 class="m-0">
                    <a
                      class="custom-accordion-title collapsed d-block py-1"
                      data-bs-toggle="collapse"
                      href="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Historia
                      <i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div
                    class="card-body"
                    v-html="Institucion.institucion_historia"
                  ></div>
                </div>
              </div>
              <div class="card mb-0">
                <div class="card-header" id="headingFour">
                  <h5 class="m-0">
                    <a
                      class="custom-accordion-title collapsed d-block py-1"
                      data-bs-toggle="collapse"
                      href="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Organigrama
                      <i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseFour"
                  class="collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div class="card-body">
                    <img
                      :src="
                        url_api +
                        '/InstitucionUpea/' +
                        Institucion.institucion_organigrama
                      "
                      alt="Organigrama"
                      class="w-75 m-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3>UBICACION {{ Institucion.institucion_direccion }}</h3>
          <div class="w-75 m-auto ratio ratio-16x9 border border-warning">
            <iframe :src="Institucion.institucion_api_google_map"></iframe>
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
#img_carrusel {
  object-fit: cover;
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
.card-upea {
  opacity: 0.7;
  transition: transform 0.5s;
  user-select: none;
  color: var(--ct-body-color);
}
.card-upea:hover {
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
  computed: {
    ...mapState(["Institucion", "url_api"]),
  },
  methods: {
    cargando() {
      document.getElementById("loading_upea").style.visibility = "hidden";
    },
  },
  created() {
    setTimeout(() => {
      document.getElementById("loading_upea").style.visibility = "hidden";
    }, 2000);
  },
};

// setTimeout(() => {
//   document.getElementById("loading_upea").style.visibility = "hidden";
// }, 2000);
</script>