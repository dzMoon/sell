<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" ></router-view>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/vHead';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
        }
      };
    },
    created () {
      this.$http.post('/api/goods', {
        params: {
          appkey: 'appkey',
          pagenum: 1,
          pagesize: 20,
          sort: 'addtime'
        }
      }).then((res) => {
      }).catch((err) => {
        console.error(err)
      })
    },
    components: {
      'v-header': header
    }
  };

</script>

<style>
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item>a.router-link-exact-active{
    color: rgb(240, 20, 20);
  }
  .tab .tab-item>a{
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

</style>
