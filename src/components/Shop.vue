<template>
    <div id='app'>
    <h1>Please give us your payment details:</h1>
    <card class='stripe-card'
      :class='{ complete }'
      stripe='pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
    <button class='pay-with-stripe' @click='payOrder' :disabled='!complete'>Pay with credit card</button>
  </div>
</template>

<script>
import Axios from 'axios';
//import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements-plus'


export default {
  name: 'Shop',
  data() {
    return {
      products : [],
      cart : null,
      order : null,
      api: {
          token : null,
          loaded : false
      },
      userId : null,
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      }
    }
  },
  components: { Card },
  created() {
    this.loadDatas();
  },
  methods: {
      loadDatas() {
          
      },
      async payOrder() {
        // createToken returns a Promise which resolves in a result object with
        // either a token or an error key.
        // See https://stripe.com/docs/api#tokens for the token object.
        // See https://stripe.com/docs/api#errors for the error object.
        // More general https://stripe.com/docs/stripe.js#stripe-create-token.
        createToken().then(data => console.log(data.token))
      }
  }
}
</script>

<style>

</style>