<template>
    <div class="products" id="products">
        <div class="container">
            <h1 class="text-center p-5">Our Products List</h1>
            <div class="row">
                <div class="col-md-4" v-for="product in products" v-bind:key="product">
                    <div class="card product-item">
                        <carousel :items-to-show="1">
                            <slide v-for="image in product.images" :key="image" class="mr-2">
                                <img :src="image" class="card-img-top" alt="..."/>
                            </slide>
                            <template #addons>
                                <navigation/>
                                <pagination/>
                            </template>
                        </carousel>
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <h5 class="card-priceS">{{ formatPrice(product.price) }}</h5>
                            </div>
                            <div class="d-flex  justify-content-center m-3">
                                <AddToCart
                                    :image="getImage(product.images)"
                                    :p-id="product.id"
                                    :price="product.price"
                                    :name="product.name"></AddToCart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {db} from "../firebase";
    import "vue3-carousel/dist/carousel.css";
    import {Carousel, Slide, Pagination, Navigation} from "vue3-carousel";
    import AddToCart from "@/components/AddToCart.vue";
    export default {
        name: "Products-list",
        components: {
            Carousel,
            Slide,
            AddToCart,
            Pagination,
            Navigation
        },
        props: {
            msg: String
        },
        data() {
            return {products: []};
        },
        methods: {
            formatPrice(price) {
                return "$" + price;
            },
            getImage(images) {
                return images[0];
            }
        },
        created() {
            db
                .collection("products")
                .onSnapshot((snapshotChange) => {
                    this.products = [];
                    snapshotChange.forEach((doc) => {
                        this
                            .products
                            .push({
                                id: doc.id,
                                name: doc
                                    .data()
                                    .name,
                                description: doc
                                    .data()
                                    .description,
                                price: doc
                                    .data()
                                    .price,
                                tags: doc
                                    .data()
                                    .tags,
                                images: doc
                                    .data()
                                    .images
                            });
                    });
                });
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped" lang="scss">
    .products {
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
    .card-img-top {
        height: 200px;
        weight: 250px;
    }
</style>