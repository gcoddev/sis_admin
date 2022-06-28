<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <a href="https://sie.upea.bo" target="_blank"
            ><img
              src="@/assets/images/sie_logo.png"
              alt="Sie logo"
              width="100" /></a
          >&nbsp; by Gary & Milton © {{ getYear }}
        </div>
        <div class="col-md-6">
          <div class="text-md-end footer-links d-none d-md-block">
            <a href="https://sie.upea.bo/" target="_blank">Contacto</a>
            <a href="https://sie.upea.bo/soporte/" target="_blank">Soporte</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    getYear() {
      let year = new Date().getFullYear();
      return year;
    },
  },
};
</script>