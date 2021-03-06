import Vue from 'vue';
import Router from 'vue-router';

import Shop from './components/Shop.vue';
import ShopProducts from './components/Shop/Products.vue';
import ShopUsers from './components/Shop/Users.vue';
import shopPaid from './components/Shop/Paid.vue';
import Properties from './components/TableProperty.vue';

const routes = [
  {
    path: '/auth',
    name: 'authentication'
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
  },
  {
    path: '/shop/products',
    name: 'shopProducts',
    component: ShopProducts,
  },
  {
    path: '/shop/users',
    name: 'shopUsers',
    component: ShopUsers,
  },
  {
    path: '/shop/paid',
    name: 'shopPaid',
    component: shopPaid,
  },
  {
    path: '/property',
    name: 'properties',
    component: Properties
  },
  {
    path: '/property/edit/:id',
    name: 'editProperty',
    component: Properties
  },
  {
    path: '**',
    redirect: {name: 'properties'},
  },
];

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes,
});
