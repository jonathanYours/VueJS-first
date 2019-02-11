<template>
    <div>
        <h1>Shop</h1>
        <div v-for="product in products" :key="product.id">
            <div class="price">{{product.price.amount}} {{product.price.currency}}</div>
            <div>{{product.name}}</div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'Shop',
  data() {
    return {
      products : []
    }
  },
  created() {
    this.loadProducts();
  },
  methods: {
      loadProducts() {
          const axiosConfig = {
                method: 'GET',
                headers: {
                'Authorization': 'Bearer ba733a5407e81a42ae00053f0da009dcee2daf22',
                'Content-Type':'application/json'
                },
            };
          Axios.get(`https://api.moltin.com/v2/products`, axiosConfig)
            .then((response) => {console.log(response.data.data);this.products = response.data.data})
            .catch(function() {});
      }
  }
}
</script>

<style>

</style>