<template>
  <div >
  	<div ref="star"></div>
  <!-- 	<img src="./star24_on@3x.png" class="on">
  	<img src="./star24_on@3x.png" class="on">
  	<img src="./star24_on@3x.png" class="on">
  	<img src="./star24_on@3x.png" class="on">
  	<img src="./star24_on@3x.png" class="on">

  	<img src="./star24_half@3x.png"  class="half">

  	<img src="./star24_off@3x.png" class="off">
  	<img src="./star24_off@3x.png" class="off">
  	<img src="./star24_off@3x.png" class="off">
  	<img src="./star24_off@3x.png" class="off">
  	<img src="./star24_off@3x.png" class="off"> -->
  		<!-- <img src="./star24_on@3x.png" v-if="{{score%1==0}}" class="on">
      	<img src="./star24_half@3x.png" v-if="{{score%1!=0}}" class="half">
      	<img src="./star24_off@3x.png" v-if="{{score%5!=0}}" class="off"> -->
  </div>
</template>

<script >
  import on from "./star24_on@3x.png"
  import half from "./star24_half@3x.png"
  import off from "./star24_off@3x.png"
  export default {
  name:'star',
  props:{
  	score:{
  		type:Number
  	},
  	size:{
  		type:Number
  	}
  },
  mounted(){
  	let str = "";
  	if(this.score%1==0){
  		for(let i = 0 ;i<this.score;i++){
  			str+=`<img src='${on}' width='${this.size}'>`
  		}
  	}else if(this.score%1!=0){
      for(let i = 0 ;i< Math.floor(this.score);i++){
        str+=`<img src='${on}' width='${this.size}'>`
      }
  		str+=`<img src='${half}'  width='${this.size}'>`
  	}

	for(let i = 0 ;i<5-Math.ceil(this.score);i++){
		str+=`<img src='${off}'  width='${this.size}'>`
	}
  	this.$refs.star.innerHTML = str;
  }
}
</script>

<style scoped>
img{width: 16px;height: 16px;}
</style>
