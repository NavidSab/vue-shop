<template>
  <div class="home">
    <Navbar></Navbar>
    <Hero></Hero>



  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components: {
    Hero,Navbar
  }
};
</script>

<style>

</style>

