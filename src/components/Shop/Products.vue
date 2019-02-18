<template>
    <div>
        <h1>Shop Moltin : Products</h1>
        <div v-for="product in products" :key="product.id">
            <div class="price">{{product.price[0].amount/100}} {{product.price[0].currency}}</div>
            <div>{{product.name}}</div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import qs from 'qs';

export default {
  name: 'Shop-Product',
  data() {
    return {
      products : [],
      api: {
          token : null,
          loaded : false
      }
    }
  },
  created() {
    this.loadProducts();
  },
  methods: {
      loadProducts() {
          if (this.api.token === null) {
              this.loadToken();
              return false;
          } 
            /*const date = new Date(); const timestamp = date.getTime(); 
            if(timestamp < this.api.token.expires) {
                this.loadToken();
                return false;
            }*/
            const axiosConfig = {
                    method: 'GET',
                    headers: {
                    'Authorization': this.api.token.token_type+' ' + this.api.token.access_token,
                    'Content-Type':'application/json'
                    },
                };
            Axios.get(`https://api.moltin.com/v2/products`, axiosConfig)
                .then((response) => {this.products = response.data.data})
                .catch(function() {alert('no no 2')});
      },
      loadToken() {
          if (this.api.loaded) {
              return false;
          }
          const axiosConfig = {
                'content-type': 'application/x-www-form-urlencoded'
            };
          Axios.post('https://api.moltin.com/oauth/access_token',qs.stringify({'client_id':'daLrAjMqgtViHIzs711vxUyBPtCCvM2Gw509xgxc97','grant_type':'implicit'}),axiosConfig)
            .then((response) => {this.api.token = response.data; this.api.loaded = true})
            .then(() => this.loadProducts())
            .catch(function() {alert('no no 1')});
      }
  }
}
</script>

<style>

</style>