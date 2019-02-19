<template>
    <div>
        <button @click="sendPaid()">Paid</button><br/>
    </div>
</template>

<script>
import Axios from 'axios';
import { encode } from 'punycode';

export default {
  name: 'ShopPaid',
  data() {
    return {
        order : {
            price : 300
        }
    }
  },
  methods: {
        sendPaid() {
            Axios.get(this.$api.url+'/mollie?mnt='+this.order.price+'&backUrl='+encode(window.location.href))
                .then((payment) => {
                    // Forward the customer to the payment.getPaymentUrl()
                    alert('ok');
                })
                .catch((err) => {
                    // Handle the error
                    alert('nok');
                });
        }
    }
}
</script>