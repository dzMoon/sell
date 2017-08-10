<template>
	<div class="header">
		<div class="header-top">
        <img :src="seller.avatar" width="64" height="64">
        {{seller.name}}
        {{seller.description}}
        {{seller.supports[0].description}}
        <button @click = "isDisplay">显示</button>
    </div>
    <div v-show = "isShow"  class="mask"></div>
    <div class="header-bottom">{{seller.bulletin}}</div>
	</div>
</template>

<script>
  export default {
      data () {
        return {
          isShow: false
        }
      },
      props: {
          seller: {}
      },
      method: {
        isDisplay () {
          console.log(this)
          this.isShow = true
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
  	height:134px;
  }
  .header-top{
    padding: 24px;
    height: 64px;
  }
  .header-bottom{
    width:100%;
    white-space: nowrap;
    overflow:hidden;
    height:28px;
    line-height:28px;
    text-overflow : ellipsis;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
  }
</style>
