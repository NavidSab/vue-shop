<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              ducimus.
            </p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt="" class="img-fluid" />
          </div>
        </div>
      </div>
      <hr />
      <div class="product-test">
        <h3 class="d-inline-block">Products list</h3>
        <button @click="addNew" class="btn btn-primary float-end">
          Add Product
        </button>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" v-bind:key="product">
                <td>
                  {{ product.name }}
                </td>
                <td>
                  {{ product.price }}
                </td>
                <td>
                  <button
                    class="btn btn-primary mx-2"
                    @click="editProduct(product)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger mx-2"
                    @click="deleteProduct(product.key)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newLabel" v-if="modal == 'new'">
              New Product
            </h5>
            <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">
              Edit Product
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="m-3">
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>
                <div class="m-3">
                  <VueEditor v-model="product.description"></VueEditor>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr />
                <div class="m-3">
                  <input
                    type="text"
                    placeholder="Product price"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>
                <div class="m-3">
                  <input
                    type="text"
                    v-on:keyup.enter="addTag"
                    placeholder="Product tags"
                    v-model="tag"
                    class="form-control"
                  />
                  <div class="d-flex">
                    <p v-for="tag in product.tags" v-bind:key="tag">
                      <span class="p-1">{{ tag }}</span>
                    </p>
                  </div>
                </div>
                <div class="m-3">
                  <label for="product_image">Product Images</label>
                  <input
                    type="file"
                    @change="uploadImage"
                    class="form-control"
                  />
                </div>
                <div class="m-3 d-flex">
                  <div
                    class="p-1"
                    v-for="(image, index) in product.images"
                    v-bind:key="image"
                  >
                    <div class="img-wrapp">
                      <img :src="image" alt="" class="product-image" />
                      <span
                        class="delete-img"
                        @click="deleteImage(image, index)"
                        >X</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >
              Save changes
            </button>
            <button
              @click="updateProduct(product.key)"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >
              Apply changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue3-editor";
import { fb, db } from "../firebase";
export default {
  name: "Products",
  components: {
    VueEditor,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      },
      activeItem: null,
      modal: null,
      tag: null,
    };
  },
  created() {
    db.collection("products").onSnapshot((snapshotChange) => {
      this.products = [];
      snapshotChange.forEach((doc) => {
        this.products.push({
          key: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          tags: doc.data().tags,
          images: doc.data().images,
        });
      });
    });
  },

  methods: {
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then( () => {
          console.log("image deleted");
        })
        .catch(() => {
          // Uh-oh, an error occurred!
          console.log("an error occurred");
        });
    },

    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },

    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      };
    },
    addNew() {
      console.log(this.products);
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },
    updateProduct(id) {
      //  Toast.fire({
      //     type: 'success',
      //     title: 'Updated  successfully'
      //   })
      db.collection("products")
        .doc(id)
        .update(this.product)
        .then(() => {
          confirm("User successfully updated!");
          this.reset();
          $("#product").modal("hide");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editProduct(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb
          .storage()
          .ref("products/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });
          }
        );
      }
    },
    deleteProduct(id) {
      if (window.confirm("Do you really want to delete?")) {
        db.collection("products")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Product deleted!");
            confirm("Product deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }

      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: "You won't be able to revert this!",
      //   type: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Yes, delete it!'
      // }).then((result) => {
      //   if (result.value) {
      //     this.$firestore.products.doc(doc.id).delete()
      //     Toast.fire({
      //       type: 'success',
      //       title: 'Deleted  successfully'
      //     })
      //   }
      // })
    },
    readData() {},
    addProduct() {
      db.collection("products")
        .add(this.product)
        .then(() => {
          // Toast.fire({
          //   type: 'success',
          //   title: 'Product created successfully'
          // })
          confirm("Product created successfully");
          this.reset();
          $("#product").modal("hide");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
.product-image {
  width: 100px;
}
</style>