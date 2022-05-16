<template>
  <div class="container-fluid">
    <h1>upea</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['Institucion'])
  }
}
</script>