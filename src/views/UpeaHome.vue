<template>
  <div class="container-fluid">
    <router-view />
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