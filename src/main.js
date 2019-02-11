import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

Vue.prototype.$api = { 
  url : 'https://api.stage.bespin.kube.logic-immo.be',
  auth: {
    username: 'batman',
    password: 'IceAge2017' 
  }
};
Vue.prototype.$api = { 
  url : 'http://api.libe.com'
};
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
