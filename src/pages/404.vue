<template>
  <div
    class="loading authentication-bg"
    data-layout-config='{"darkMode":false}'
  >
    <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xxl-4 col-lg-5">
            <div class="card">
              <!-- Logo -->
              <div class="card-header pt-4 pb-4 text-center bg-primary">
                <a href="index.html">
                  <span
                    ><img src="@/assets/images/logo.png" alt="" height="18"
                  /></span>
                </a>
              </div>

              <div class="card-body p-4">
                <div class="text-center">
                  <h1 class="text-error">
                    4<i class="mdi mdi-emoticon-sad"></i>4
                  </h1>
                  <h4 class="text-uppercase text-danger mt-3">
                    PÁGINA NO ENCONTRADA
                  </h4>
                  <p class="text-muted mt-3">
                    Parece que te has equivocado de camino. No te preocupes... nos pasa a los mejores. Aquí hay un pequeño consejo que podría ayudarlo a volver a la normalidad.
                  </p>

                  <router-link to="/" class="btn btn-info mt-3"
                    ><i class="mdi mdi-reply"></i> Volver a Inicio</router-link
                  >
                </div>
              </div>
              <!-- end card-body-->
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end page -->

    <footer class="footer footer-alt">
      2018 -
      {{ getYear }}
      © Hyper - Coderthemes.com
    </footer>
  </div>
</template>

<script>
export default {
  name: "404",
  computed: {
    getYear() {
      let year = new Date().getFullYear();
      return year;
    },
  },
};
</script>