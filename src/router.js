import Vue from 'vue';
import Router from 'vue-router';

import Shop from './components/Shop.vue';
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
