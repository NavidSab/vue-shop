<template>
  <div class="home">
    <Login></Login>
    <MiniCart></MiniCart>
    <Navbar></Navbar>
    <Hero></Hero>
    <ProductList></ProductList>
    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="/img/svg/product.svg" alt="" width="400" />
        </div>
        <div class="col-md-6">
          <h3>Learn More About us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas
            vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas
            exercitationem ratione consectetur et!
          </p>
          <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue";
  import Hero from "@/components/Hero.vue";
  import ProductList from "@/sections/ProductList.vue";
  import Login from "@/components/Login.vue";
  import MiniCart from "@/components/MiniCart.vue";

  export default {
    name: "home",
    components: {
      Navbar,
      Hero,
      ProductList,
      Login,
      MiniCart
    }
  };
</script>
<style>
</style>