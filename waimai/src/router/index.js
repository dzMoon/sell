import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/goods'
import Seller from '../components/seller/seller'
import Ratings from '../components/ratings/ratings'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      redirect : "/goods"
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    }
  ]
})
