<template>
  <div>
    <transition name="blocProperty" mode="out-in">
      <div class="tableProperty" v-if="edition==false">
        <h2>Yours properties</h2>
        <div v-if="message" class="message">
          {{message}}
        </div>
        <div v-for="property in properties" :key="property.id" class="property_bloc" :class="{ active: property.id==id_edition }" @click="editBloc(property.id)">
          <div class="price">{{property.price}} €</div>
          <div>{{property.description_web.fr}}</div>
        </div>
      </div>
    </transition>
    <transition name="blocProperty" mode="out-in">
      <div class="formProperty"  v-if="edition==true">
        <property :idProperty="id_edition" @close="closeEditBloc" />
      </div>
    </transition>
  </div>
</template>

<script>
import Axios from 'axios';
import Property from './Property.vue'

export default {
  name: 'TableProperty',
  components: {
    Property
  },
  props: {
    id : null
  },
  data() {
    return {
      properties : [],
      edition: false,
      id_edition: null,
      message : null
    }
  },
  created() {
    if (this.$route.params.id && !isNaN(this.$route.params.id)) {
      this.id_edition = this.$route.params.id*1;
      this.edition = true;
    } 
    this.loadProperties();
  },
  methods: {
    loadProperties() {
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
      
      Axios.get(`${this.$api.url}/properties.json?return=true`)//, axiosConfig)
        .then((response) => {this.properties = response.data})
        .catch(function() {});
    },
    editBloc(id) {
      this.id_edition = id;
      this.edition = true;
    },
    closeEditBloc(message, property) {
      this.edition = false;
      this.message = message;
      if (property) {
        const index = this.properties.findIndex(a => a.id === this.id_edition); 
        this.properties[index] = property;
      }
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
  width: 600px;
  cursor: pointer;
}
.price {
  color: blue;
  font-size: 24px;
  text-align: right;
  font-weight: bold;
}
.blocProperty-enter-active, .blocProperty-leave-active {
  transition: opacity .5s;
}
.blocProperty-enter, .blocProperty-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.property_bloc.active {
  border: 3px blue solid;
}
.message {
  border: 1px darkgreen solid;
  background-color: lightgreen;
  color: darkgreen;
  font-weight: bold;
  padding: 5px;
  margin: 2px auto;
  width: 600px;
}
</style>
