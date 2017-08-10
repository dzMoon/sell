<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab">
      <div class="tab-item" v-for="(v,i) in msg">
        <router-link :to="{name:v.path}"><h2>{{v.name}}</h2></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from './components/header/Header'
const ERR_OK = 0
export default {
  name: 'app',
  components: {
      Header
  },
  created () {
      this.$http.get('/api/seller').then(response => {
          response = response.body
          if (response.errno === ERR_OK) {
              this.seller = response.data
              localStorage.setItem('seller', JSON.stringify(this.seller))
          }
      })
      this.$http.get('/api/goods').then(response => {
          response = response.body
          if (response.errno === ERR_OK) {
              this.goods = response.data
              localStorage.setItem('goods', JSON.stringify(this.goods))
          }
      })
      this.$http.get('/api/ratings').then(response => {
          response = response.body
          if (response.errno === ERR_OK) {
              this.ratings = response.data
              localStorage.setItem('ratings', JSON.stringify(this.ratings))
          }
      })
  },
  data () {
    return {
      msg: [
          {name: '商品', path: 'seller'},
          {name: '评价', path: 'goods'},
          {name: '商家', path: 'ratings'}
      ],
      seller: {},
      goods: {},
      ratings: {}
    }
  }
}
</script>

<style scoped>
.tab{
  display: flex;
  height: 40px;
}
.tab .tab-item{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size:14px;
}
.tab .tab-item{
  color:rgb(77,85,93)
}
.router-link-exact-active{
  color:rgb(240,20,20);
  font-size:14px;
}
</style>
