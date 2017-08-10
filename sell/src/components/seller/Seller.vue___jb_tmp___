<template>
  <div class="box">
      <div class="list">

        <li class="item" v-for="item in list">
          <router-link >{{item.name}}</router-link>
        </li>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
  </div>

</template>

<script>
export default {
  name: 'seller',
  data () {
	  return{
		  list: {}
	  }
  },
  props: {},
  created () {
      this.$http.get('/api/goods').then(response => {
        response = response.body
      if (response.errno === 0) {
        this.list = response.data
      }
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box{
    display: flex;
    width: 100%;
    height: 100%;
  }
  .list{
    height: 100%;
    width: 80px;
    background: #f3f5f7;
    float: left;
  }
  .list .item{
    height: 54px;
    padding: 12px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 14px;
  }
  .list .item a{
    color:rgb(240,20,20);
    font-weight: 200;
  }
  .container{
    width: 100%;
    float: left;
  }
</style>
