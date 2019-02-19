<template>
    <div>
        <h1>Shop Moltin : order</h1>
        <form>
        <select name="user" @change="getCart($event)">  
            <option></option>      
            <option v-for="user in users" :key="user.id" :value="user.id">
                {{user.name}}
            </option>
        </select>
        <select name="product" @change="setCart($event)">    
            <option></option>       
            <option v-for="product in products" :key="product.id" :value="product.id">
                {{product.name}}
            </option>
        </select>
        <button @click.prevent="sendOrder()">Order</button></form><br/>
        {{cart}}
    <br/><br/>
    {{order}}
    <button @click.prevent="payOrder()">Paid</button><br/>
    </div>
</template>

<script>
import Axios from 'axios';
import qs from 'qs';



const stripe = window.Stripe('pk_test_RbrEtpJVdCMKOSBHIZQ449Nd');



export default {
  name: 'Shop',
  data() {
    return {
      products : [],
      users : [],
      cart : null,
      order : null,
      api: {
          token : null,
          loaded : false
      },
      userId : null,
    }
  },
  created() {
    this.loadDatas();
  },
  methods: {
      loadDatas() {
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
            Axios.get(`https://api.moltin.com/v2/customers`, axiosConfig)
                .then((response) => {this.users = response.data.data})
                .catch(function() {alert('no no 2')});
      },
      loadToken() {
          if (this.api.loaded) {
              return false;
          }
          const axiosConfig = {
                'content-type': 'application/x-www-form-urlencoded'
            };
          Axios.post('https://api.moltin.com/oauth/access_token',qs.stringify({
              'client_id':'daLrAjMqgtViHIzs711vxUyBPtCCvM2Gw509xgxc97',
              'client_secret':'Tv3nI639lxG5XfTazEJPSIwYBieLFGZfVkGpWvgQww',
              'grant_type':'client_credentials'
            }),axiosConfig)
            .then((response) => {this.api.token = response.data; this.api.loaded = true})
            .then(() => this.loadDatas())
            .catch(function() {alert('no no 1')});
      },
      getCart(event) {
          this.userId = event.target.value;
          const axiosConfig = {
                    method: 'GET',
                    headers: {
                    'Authorization': this.api.token.token_type+' ' + this.api.token.access_token,
                    'Content-Type':'application/json'
                    },
                };
            Axios.get(`https://api.moltin.com/v2/carts/`+event.target.value, axiosConfig)
                .then((response) => {this.cart = response.data.data})
                .catch(function() {alert('no no 2')});
      },
      setCart(event) {
          if (this.cart === null) {
              alert('non non');
              return false;
          }
            const axiosConfig = {
               headers: {
                    'Authorization': this.api.token.token_type+' ' + this.api.token.access_token,
                    'Content-Type':'application/json'
                    },
            };
            Axios.post('https://api.moltin.com/v2/carts/'+this.cart.id+'/items',{data:{
              'quantity':1,
              'type':'cart_item',
              'id':event.target.value
            }},axiosConfig)
            .then((response) => {})
            .catch(function() {alert('no no 2')});
      },
      sendOrder() {
          if (this.cart === null) {
              alert('non non');
              return false;
          }
            const axiosConfig = {
               headers: {
                    'Authorization': this.api.token.token_type+' ' + this.api.token.access_token,
                    'Content-Type':'application/json'
                    },
            };
            Axios.post('https://api.moltin.com/v2/carts/'+this.cart.id+'/checkout',{data:{
                "customer": {
                    "id": this.userId
                },
                "billing_address": {
                    "first_name": "John",
                    "last_name": "Doe",
                    "company_name": "Moltin",
                    "line_1": "2nd Floor British India House",
                    "line_2": "15 Carliol Square",
                    "city": "Newcastle upon Tyne",
                    "postcode": "NE1 6UF",
                    "county": "Tyne & Wear",
                    "country": "UK"
                },
                "shipping_address": {
                    "first_name": "John",
                    "last_name": "Doe",
                    "phone_number": "(555) 555-1234",
                    "company_name": "Moltin",
                    "line_1": "2nd Floor British India House",
                    "line_2": "15 Carliol Square",
                    "city": "Newcastle upon Tyne",
                    "postcode": "NE1 6UF",
                    "county": "Tyne & Wear",
                    "country": "UK",
                    "instructions": "Leave in porch"
                }
            }},axiosConfig)
            .then((response) => {this.order = response.data.data;})
            .catch(function() {alert('no no 2')});
      },
      async payOrder() {

          const data = {
              type:'bancontact',
              amount:this.order.meta.display_price.with_tax.amount,
              currency:'eur',
              owner:{
                  name:'LOLLLLLL',
                
              },
              redirect:{
                  return_url:window.location.href
              },
              metadata:{
                  order:this.order.id
              }
          }
          const payload = await stripe.createSource(data);
          console.log('source', payload);


          const axiosConfig = {
               headers: {
                    'Authorization': this.api.token.token_type+' ' + this.api.token.access_token,
                    'Content-Type':'application/json'
                    },
            };
            Axios.post('https://api.moltin.com/v2/orders/'+this.order.id+'/payments',{data:{
                "gateway": "stripe",
                "method": "purchase",
                "payment": payload.source.id,
                "options": {
                    "receipt_email": "jonathan.seidenschnur@ipmgroup.be"
                }
            }},axiosConfig)
                .then((response) => {})
                .catch(function() {alert('no no 2')});
      }
  }
}
</script>

<style>

</style>