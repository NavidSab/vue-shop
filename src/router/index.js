import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import Product from "@/views/Products.vue";
import Profile from "@/views/Profile.vue";
import { fb } from "../firebase";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/admin",
        name: "Admin",
        meta: { requiresAuth: true },
        component: Admin,
        children: [{
                path: "products",
                name: "product",
                component: Product,
            },
            {
                path: "profile",
                name: "Profile",
                component: Profile,
            }
        ]
    },

    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/checkout",
        name: "checkout",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/Checkout.vue")
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = fb.auth().currentUser
    if (requiresAuth && !currentUser) {
        next('/')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})



export default router;