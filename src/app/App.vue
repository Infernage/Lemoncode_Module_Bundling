<template>
<h1>Hello world from vue UI using webpack and esbuild with {{environment}}</h1>
<img src="../assets/logo_lemoncode_200.png">
</template>

<script lang="ts">
console.log(`Hello world from vue code using webpack and esbuild with ${process.env.CONFIG}`);
export default {
  name: "App",
  data() {
    return {
      environment: process.env.CONFIG
    }
  }
}
</script>

<style scoped src="./app.scss">

</style>