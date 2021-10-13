import { createApp } from "vue";
import App from "./App.vue";
import Vue from 'vue';
import router from "./router";
import jQuery from 'jquery';
import 'popper.js';
import './assets/app.scss';
import Swal from 'sweetalert2';
import $ from 'jquery';
import "bootstrap";

window.$=jQuery;

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;

//global variable
window.$=window.jQuery=jQuery;


//component
import Navbar from "./components/Navbar.vue";
import Hero from   "./components/Hero.vue";
import AddToCart from   "./components/AddToCart.vue";
// import MiniCart from   "./components/MiniCart.vue";
// import ProductList from   "./components/ProductList.vue";



const app = createApp(App);
app.component('Navbar', Navbar);
app.component('Hero', Hero);
// app.component('products-list', ProductList);
// app.component('mini-cart', MiniCart);
app.component('add-to-cart', AddToCart);

app.use(router).mount("#app");



