<template>
  <div class="count">
    <transition name="move">
      <div class="minus" @click = "minus" v-show="food.count > 0" transition="move"> - </div>
    </transition>
    <div class="num" v-show="food.count>0">{{food.count}}</div>
    <div class="add" @click = "add"> + </div>
  </div>

</template>

<script >
  import Vue from "vue"
  export default {
    props:{
      food:{
        type:Object
      }
    },
    methods : {
      add(event){
        if(!this.food.count){
          Vue.set(this.food,'count',1)
        }else{
          this.food.count++
        }
        this.$emit('test',event.target)
      },
      minus(){
          if(this.food.count==1){
               Vue.set(this.food,'count',0)
          }else if(this.food.count>1){
              this.food.count--
          }
      }
    }

  }
</script>

<style scoped>
  .count{
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
  }
  .count .add,.count .minus{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #00A0DC;
    color: #ffffff;
    text-align: center;
    line-height: 24px;
    font-size: 20px;
  }
  .count .num{
    width: 34px;
    text-align: center;
    line-height: 24px;
  }
  .move-enter-active, .move-leave-active {
    transition: all .4s;
    transform: translate3d(0,0,0) rotateZ(360deg);
    opacity: 1;
  }
  .move-enter, .move-leave-to {
    opacity: 0;
    transform: translate3d(24px,0,0) rotateZ(360deg);
    transition: all .4s;
  }
</style>
