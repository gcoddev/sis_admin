<template>
  <div class="container-fluid">
    <h1>{{ msg }}</h1>
    <div class="card">
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: localStorage.msg,
    };
  },
  
};
</script>