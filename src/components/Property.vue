<template>
  <div class="property">
    <div style="float: left"><a href="#" @click="closeEditBloc()">Close</a></div>
    <h2>Edit properties {{idProperty}}</h2>
    <form @submit.prevent="onSubmit()">
        <label for="price">Price</label>
        <input type="text" name="price" v-model="property.price" /> €
        <input type="submit" />
    </form>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'Property',
  props: {
    idProperty : Number
  },
  data() {
    return {
      property : []
    }
  },
  created() {
    this.loadProperty();
  },
  methods: {
    loadProperty() {
      /*Axios.get(
            `https://api.github.com/users/JonathanYours`
          ).then(function(response) {console.log(response);this.properties = response.data});*/
      const axiosConfig = {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': 'localhost',
          'Access-Control-Allow-Methods' :"POST, GET, OPTIONS",
          'Access-Control-Allow-Headers' :"Origin, Authorization, Accept, Content-Type",
          'Access-Control-Allow-Credentials': false,
          Pragma: 'no-cache',
          'Authorization': (this.$api.auth)?'Basic '+btoa(this.$api.auth.username + ':' + this.$api.auth.password):''
        },
        withCredentials : true,
        auth : this.$api.auth //object with username & password
      };
      
      Axios.get(`${this.$api.url}/properties/${this.idProperty}.json?return=true`)//, axiosConfig)
        .then((response) => {this.property = response.data})
        .then(() => {
          if (!this.property) {
            this.closeEditBloc('Property unfinded');
          }
        })
        .catch((response) => {
          this.closeEditBloc('Error');
        });
    },
    onSubmit() {
      Axios.put(`${this.$api.url}/properties/${this.idProperty}.json?return=true`,{id:this.idProperty,price:this.property.price})//, axiosConfig)
        .then((response) => {this.closeEditBloc('Property saved');})
        .catch((response) => {
          alert('error on save');
        });
    },
    closeEditBloc(message) {
      this.$emit('close',message,this.property);
    }
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.property_bloc {
  display: block;
  border: 1px black solid;
  padding: 3px;
  margin: 5px auto;
  width: 600px
}
.price {
  color: blue;
  font-size: 24px;
  text-align: right;
  font-weight: bold;
}
</style>
