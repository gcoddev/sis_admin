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
            class="carousel slide w-75 m-auto card-img-top"
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
                data-bs-interval="2500"
              >
                <img
                  class="d-block img-fluid"
                  :src="
                    'https://serviciopagina.upea.bo/InstitucionUpea/Portada/' +
                    por.portada_imagen
                  "
                  :alt="por.portada_imagen"
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
          <div class="card-text m-3">
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
                      Objetivos
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
                  <div
                    class="card-body"
                    v-html="[Institucion.institucion_objetivos == null ? 'null' : Institucion.institucion_objetivos]"
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
                      Mision
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
                    v-html="Institucion.institucion_mision"
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
                      Sobre la institucion
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
                  <div
                    class="card-body"
                    v-html="Institucion.institucion_sobre_ins"
                  ></div>
                </div>
              </div>
              <div class="card mb-0">
                <div class="card-header" id="headingFive">
                  <h5 class="m-0">
                    <a
                      class="custom-accordion-title collapsed d-block py-1"
                      data-bs-toggle="collapse"
                      href="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Historia
                      <i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseFive"
                  class="collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div
                    class="card-body"
                    v-html="Institucion.institucion_historia"
                  ></div>
                </div>
              </div>
              <div class="card mb-0">
                <div class="card-header" id="headingSix">
                  <h5 class="m-0">
                    <a
                      class="custom-accordion-title collapsed d-block py-1"
                      data-bs-toggle="collapse"
                      href="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      Colores
                      <i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseSix"
                  class="collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div class="card-body">
                    <div
                      class="card-text"
                      v-for="(color, id_color) of Institucion.colorinstitucion"
                      :key="id_color"
                    >
                      <span
                        style="padding: 10px; display: block"
                        :style="
                          'background-color:' + color.color_primario + ';'
                        "
                        >Color</span
                      >
                      <span
                        style="padding: 10px; display: block"
                        :style="
                          'background-color:' + color.color_secundario + ';'
                        "
                        >Color</span
                      >
                      <span
                        style="padding: 10px; display: block"
                        :style="
                          'background-color:' + color.color_terciario + ';'
                        "
                        >Color</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-0">
                <div class="card-header" id="headingSeven">
                  <h5 class="m-0">
                    <a
                      class="custom-accordion-title collapsed d-block py-1"
                      data-bs-toggle="collapse"
                      href="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      Organigrama
                      <i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseSeven"
                  class="collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div class="card-body">
                    <img :src="'https://serviciopagina.upea.bo/InstitucionUpea/'+Institucion.institucion_organigrama" alt="Organigrama" class="w-75 m-auto">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3>UBICACION {{ Institucion.institucion_direccion }}</h3>
          <div class="w-75 m-auto ratio ratio-16x9">
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
</style>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["Institucion"]),
  },
  created() {
    setTimeout(() => {
      document.getElementById("loading_upea").style.visibility = "hidden";
    }, 2000);
  },
};

setTimeout(() => {
  document.getElementById("loading_upea").style.visibility = "hidden";
}, 2000);
</script>