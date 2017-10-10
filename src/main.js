// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {
    path: '/goods',
    name: 'goods',
    component: goods
  }, {
    path: '/seller',
    name: 'seller',
    component: seller
  }, {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  }];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

router.push('/goods');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});

/*
   获取当前屏幕宽度进行rem计算
*/
let html = document.documentElement;
let hWidth = html.getBoundingClientRect().width;
html.style.fontSize = hWidth / 15 + 'px';
