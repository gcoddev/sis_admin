<template>
  <body class="str-home dark-version">
    <div id="preloader" class="str-preloader"></div>

    <!-- Inicio boton subir -->
    <div class="up">
      <a href="#" id="scrollup" class="str-scrollup text-center"
        ><i class="fas fa-angle-up"></i
      ></a>
    </div>
    <!-- Fin boton subir -->

    <!-- Incio contenido -->

    <!-- Inicio Banner -->
    <section id="str-banner" class="hero-wrap js-fullheight str-banner-section">
      <!-- <img
        src="@/assets/home/img/fondo_principal.jpg"
        alt=""
        width="100%"
        style="position: absolute"
      /> -->
      <div class="container">
        <div class="col-md-12 in-logo animated-fast">
          <img src="@/assets/home/img/img_upea.png" />
          <div class="my-3 img-text">
            <h1 class="text-dark">Universidad Publica de El Alto</h1>
            <ul>
              <li style="">
                Con ideas claras, construimos una nueva Universidad
              </li>

              <li style="">
                Formando profesionales integrales altamente calificados en todas
                las disciplinas
              </li>
              <li style="">
                Proyectando al desarrollo de actividades academicas-productibas,
                cientificas tecnologicas de interacci&oacute;n social
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- Fin Banner -->

    <!-- Inicio objetivo y accesos -->
    <section id="str-about" class="m-5 str-about-section position-relative">
      <div class="str-aboutbg1 position-absolute">
        <img class="img" src="@/assets/home/img/ins_0.png" alt="" />
      </div>

      <div class="container">
        <div class="str-about-content">
          <div class="row">
            <div class="col-lg-5">
              <div
                class="str-about-text wow fadeFromRight"
                data-wow-delay="0ms"
                data-wow-duration="1500ms"
              >
                <div
                  class="
                    str-section-title
                    text-left
                    str-title-left str-headline
                  "
                >
                  <i class="fas fa-laptop-code"></i>
                  <span class="str-title-tag">Sistema web</span>
                  <h2 class="text-dark">
                    Administraci&oacute;n p&uacute;blicaciones
                  </h2>
                </div>
                <div class="col-sm-12 col-md-12">
                  <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">
                          <a
                            class="str-btn-ins"
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href="#collapseTwo"
                            ><i class="fas fa-arrow-alt-circle-right"></i>
                            Objetivo</a
                          >
                        </h4>
                      </div>
                      <div
                        id="collapseTwo"
                        class="panel-collapse collapse show"
                      >
                        <div class="panel-body panel-ins">
                          <p align="justify">
                            El sistema tiene por objetivo facilitar a todas las
                            carreras de la Universidad P&uacute;lblica de "El
                            Alto" el poder realizar p&uacute;blicaciones de
                            manera ordenada y puntual, de esta manera el
                            p&uacute;blico en general podra acceder a ver las
                            convocatorias, cursos, avisos que acontesca en un
                            intervalo de tiempo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">
                          <a
                            class="str-btn-ins"
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href="#collapseThree"
                            ><i class="fas fa-arrow-alt-circle-right"></i>
                            Accesos</a
                          >
                        </h4>
                      </div>
                      <div
                        id="collapseThree"
                        class="panel-collapse collapse show"
                      >
                        <div class="panel-body panel-ins">
                          <p align="justify">
                            Los accesos al panel de admistraci&oacute;n sera por
                            roles o funciones que asigne el administrador del
                            sistema, de esta manera mantener la confidencialidad
                            e integridad de la informaci&oacute;n de cada
                            carrera.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-7">
              <div
                class="str-about-img position-relative wow fadeFromLeft"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <div class="str-about-logo">
                  <img
                    class="img"
                    src="@/assets/home/img/img_upea.png"
                    alt=""
                  />
                </div>
                <div class="str-about-img-field">
                  <div class="str-about-pic">
                    <img
                      class="img"
                      src="@/assets/home/img/ingenieria_fondo.png"
                      alt=""
                    />
                  </div>
                  <div class="str-progress-area str-headline">
                    <h3></h3>
                    <div id="progress1" class="barfiller">
                      <div class="tipWrap"><span class="tip"></span></div>
                      <span class="fill" data-percentage="20"></span>
                    </div>
                    <h3></h3>
                    <div id="progress2" class="barfiller">
                      <div class="tipWrap"><span class="tip"></span></div>
                      <span class="fill" data-percentage="70"></span>
                    </div>
                    <h3></h3>
                    <div id="progress3" class="barfiller">
                      <div class="tipWrap"><span class="tip"></span></div>
                      <span class="fill" data-percentage="90"></span>
                    </div>
                  </div>
                </div>
                <div class="str-about-img-field">
                  <div class="str-about-pic">
                    <img
                      class="img"
                      src="@/assets/home/img/medicina_fondo.jpg"
                      alt=""
                    />
                  </div>
                  <div class="str-about-pic">
                    <img
                      class="img"
                      src="@/assets/home/img/derecho_logo.jpg"
                      alt=""
                    />
                  </div>
                  <div class="str-about-pic">
                    <img
                      class="img"
                      src="@/assets/home/img/financiera_fondo.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Fin objetivo y accesos -->

    <!-- Inicio Telogias Usadas -->
    <section id="str-feature" class="str-feature-section">
      <div class="m-5">
        <div
          class="str-section-title text-center str-title-center str-headline"
        >
          <span class="str-title-tag">Innova con las diferentes</span>
          <h2 class="text-dark">Tecnologías</h2>
        </div>

        <div id="str-slide" class="str-feature-content row">
          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img class="img" src="@/assets/home/img/Vue_logo.png" alt="" />
              </div>
              <div class="str-feature-text str-headline">
                <h3>Vue.js</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Framework progresivo</li>
                    <li>Reactivo</li>
                    <li>Modular</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img
                  class="img"
                  src="@/assets/home/img/postman_logo.png"
                  alt=""
                />
              </div>
              <div class="str-feature-text str-headline">
                <h3>Postman</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Crea Peticiones</li>
                    <li>Defie colecciones</li>
                    <li>Entorno colaborativo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img class="img" src="@/assets/home/img/html_logo.png" alt="" />
              </div>
              <div class="str-feature-text str-headline">
                <h3>HTML</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Lenguaje estatico</li>
                    <li>Basado en etiquetas</li>
                    <li>Multiplataforma</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img class="img" src="@/assets/home/img/css_logo.png" alt="" />
              </div>
              <div class="str-feature-text str-headline">
                <h3>CSS</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Define estilos</li>
                    <li>Responsive</li>
                    <li>Lenguaje declarativo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img
                  class="img"
                  src="@/assets/home/img/javascripts_logo.png"
                  alt=""
                />
              </div>
              <div class="str-feature-text str-headline">
                <h3>JavaScript</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Lenguaje interpretado</li>
                    <li>Alto nivel</li>
                    <li>Dinamico</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img
                  class="img"
                  src="@/assets/home/img/bootstrap_logo.png"
                  alt=""
                />
              </div>
              <div class="str-feature-text str-headline">
                <h3>Bootstrap</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Framework</li>
                    <li>C&oacute;digo abierto</li>
                    <li>Mas plugins</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img
                  class="img"
                  src="@/assets/home/img/nodejs_logo.png"
                  alt=""
                />
              </div>
              <div class="str-feature-text str-headline">
                <h3>Node.js</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Velocidad</li>
                    <li>Adaptaivo</li>
                    <li>Integrable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img
                  class="img"
                  src="@/assets/home/img/AXIOS_LOGO.png"
                  alt=""
                />
              </div>
              <div class="str-feature-text str-headline">
                <h3>Axios</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Velocidad</li>
                    <li>Solicitud servidor</li>
                    <li>Cliente Http</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img
                  class="img"
                  src="@/assets/home/img/sweetalert2_logo.png"
                  alt=""
                />
              </div>
              <div class="str-feature-text str-headline">
                <h3>Sweetalert2</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Libreria</li>
                    <li>Alternativa a jAlert</li>
                    <li>Rapido</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img class="img" src="@/assets/home/img/git_logo.png" alt="" />
              </div>
              <div class="str-feature-text str-headline">
                <h3>Git</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Software libre</li>
                    <li>Potente</li>
                    <li>Versionamiento</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img
                  class="img"
                  src="@/assets/home/img/github_logo.png"
                  alt=""
                />
              </div>
              <div class="str-feature-text str-headline">
                <h3>GitHub</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Nube</li>
                    <li>Servicio Online</li>
                    <li>Publico y privado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 col-xl-3">
            <div class="str-feature-icon-text text-center">
              <div class="str-feature-icon">
                <img
                  class="img"
                  src="@/assets/home/img/mysql_logo.png"
                  alt=""
                />
              </div>
              <div class="str-feature-text str-headline">
                <h3>MySql</h3>
                <div class="str-feature-list ul-li-block">
                  <ul>
                    <li>Fiablidad</li>
                    <li>Seguridad</li>
                    <li>Conectividad</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Fin Tegnologias Usadas -->

    <!-- Inicio cantidad de vistas -->
    <!-- <section id="vistas" class="text-white text-center">
      <div
        class="parallax"
        data-parallax-image="@/assets/home/img/vista_fondo.png"
      ></div>

      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="display-4 font-weight-bold">PERSONAS LLEGADAS</h2>
            <p>
              Siempre llegando a mas personas para informalas de nuestra
              carrera.
            </p>
          </div>
          <div class="contenedor">
            <div class="contador ocultar">
              <span class="icon-street-view ic_view"></span>
              <div class="contador_cantidad" data-cantidad-total="7782">0</div>
              <span>Vistas Totales</span>
            </div>
            <div class="contador ocultar">
              <span class="icon-eye ic_view"></span>
              <div class="contador_cantidad" data-cantidad-total="106">0</div>
              <span>Vistas de hoy</span>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </body>
</template>