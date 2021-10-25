import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "popper.js";
import "bootstrap";
import "@/assets/app.scss";
import jQuery from "jquery";
import { fb } from "./firebase";
import Swal from 'sweetalert2';
window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.Toast = Toast;
const Vue = createApp(App);
window.$ = window.jQuery = jQuery;
Vue.component("Navbar", require("@/components/Navbar.vue").default);
Vue.component("Hero", require("@/components/Hero.vue").default);
Vue.component("ProductList", require("@/sections/ProductList.vue").default);
Vue.component("Login", require("@/components/Login.vue").default);
let app = '';
fb.auth().onAuthStateChanged(function() {
    if (!app) {
        createApp(App).use(router).mount("#app");
    }
});