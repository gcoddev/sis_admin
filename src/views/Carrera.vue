<template>
  <div>
    <div id="loading_carrera">
      <div class="spinner-border avatar-lg text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <h1>Carrera</h1>
      <p class="mio">
        {{ getID }}
      </p>
    </div>
  </div>
</template>

<style scoped>
#loading_carrera {
  position: fixed;
  background-color: var(--ct-body-bg);
  width: 100vw;
  height: 100vh;
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
</style>

<script>
export default {
  computed: {
    getID() {
      return this.$route.params.id_car;
    },
  },
  methods: {
    async getCarrera(id) {
      console.log("getCarrera");
      try {
        let res = await this.axios.get("/api/UpeaCarrera/" + id);
        this.$store.state.Carrera = res.data.Descripcion;
      } catch (error) {
        // console.log(error);
        this.getCarrera(this.getID);
      }
    },
  },
  created() {
    this.getCarrera(this.getID);
    setTimeout(() => {
      document.getElementById("loading_carrera").style.visibility = "hidden";
    }, 2500);
  },
  updated() {
    document.getElementById("loading_carrera").style.visibility = "visible";
    setTimeout(() => {
      document.getElementById("loading_carrera").style.visibility = "hidden";
    }, 1000);
    this.getCarrera(this.getID);
  },
};
setTimeout(() => {
  document.getElementById("loading_carrera").style.visibility = "hidden";
}, 2500);
</script>