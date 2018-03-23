<template>
    <div class="food-wrapper">
      <div class="food-avatar">
        <img :src="food.image" alt="">
      </div>
      <div class="food-name">
        {{food.name}}
      </div>
      <div class="ratings"><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></div>
      <div class="price">
        <div class="food-prcie"><span>￥{{food.price}}</span><span v-show="food.oldPrice">￥{{food.oldPrice}}</span></div>
        <div class="box">
          <transition name="open">   

             <div class="take-in" v-if="food.count==undefined||food.count==0"  @click="addCount(food)" transition="open">加入购物车</div>
             <cartControl   :food="food" v-else transition="open"></cartControl>
            
          </transition> 
        </div>

      </div>
      <div class="slice"></div>
      <div class="food-description" v-if="food.info">
        <div>商品介绍</div>
        <div>{{food.info}}</div>
      </div>
      <div class="slice"></div>

      <!-- 评论筛选 -->
      <div class="food-rating">
        <div class="rating-wrapper" >
          <h1 class="rating-head">商品评价</h1>
          <div class="filter-ratings">
            <li   v-for="(item,index) in filterGood" :class="{on:item.name=='all'}"  @click="fiterRatings(item.name,index)" ref="mybox">{{item.text}}    {{item.count}}</li>
          </div>
        </div>
        <div class="rating-top">
          <i class="iconfont" style="color: #B7BBBF">&#xe69e;</i>
          只看有内容的评价
        </div>
        <li class="rating" v-for="userInfo in userInfos" v-if="userInfo.text">
          <div class="info">
            <div class="time">{{userInfo.rateTime | format}}</div>
            <div class="cust-info">{{userInfo.username}}</div>
          </div>
          <div class="ragint-content">
            <i class="iconfont" v-if="userInfo.rateType==1" style="color: #B7BBBF">&#xe64c;</i>
            <i class="iconfont" v-else style="color: #00A0DC">&#xe672;</i>
            <div class="content" >{{userInfo.text}}</div>
          </div>
        </li>
      </div>

      <div class="close" @click="close">X</div>
  </div>



</template>
<script>
  import cartControl from "../cartcontrol/cartcontrol"
  import star from "../star/star"
  import Vue from "vue"
  export default {
    name:'food',
    data(){
      return{
        filterGood:[
          {
            name:'all',
            text:'全部',
            count:0
          },
          {
            name:'recommend',
            text:'推荐',
            count:0
          },
          {
            name:'complaints',
            text:'吐槽',
            count:0
          }
        ],
        userInfos:[]
      }
    },
    props:{
      food:{
        type:Object
      }
    },
    components:{
      cartControl
    },
    methods:{
      addCount(food){
        if(!this.food.count){
          Vue.set(this.food,'count',1)
        }else if(this.food.count==0){
          this.food.count = 1;
        }
        this.$emit("count",food)
      },
      fiterRatings(action,index){
        let arr = [];
        if(action=="all"){
          arr = this.food.ratings;
        }else if(action=="recommend"){
          this.food.ratings.forEach((item)=>{
            if(item.rateType==0){
              arr.push(item)
            }
          })
        }else{
          this.food.ratings.forEach((item)=>{
            if(item.rateType==1){
              arr.push(item)
            }
          })
        }
        this.userInfos = arr;

         this.$refs.mybox[0].style.backgroundColor = "#ADD3DE"
         this.$refs.mybox[1].style.backgroundColor = "#CCECF8"
         this.$refs.mybox[2].style.backgroundColor = "#E9EBEC"
         this.$refs.mybox.forEach((item)=>{
            item.style.color="rgb(77,85,930)"
          })

        this.$refs.mybox[index].style.backgroundColor = "#00A0DC"
        this.$refs.mybox[index].style.color = "#ffffff"
      },
      close(){
        this.$emit("close")
      }
    },
    filters: {
       format (input) {
           var d = new Date(input);
           var year = d.getFullYear();
           var month = d.getMonth() + 1;
           var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
           var hour = d.getHours();
           var minutes = d.getMinutes();
           var seconds = d.getSeconds();
           return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
       }
    },
    created(){
      this.userInfos = this.food.ratings;
      let count1 = 0;
      let count2 = 0;
      this.filterGood[0].count = this.userInfos.length;
      this.food.ratings.forEach((item)=>{
          if(item.rateType == 0){
               count1++
          }
      })
      this.food.ratings.forEach((item)=>{
          if(item.rateType == 1){
               count2++
          }
      })
      this.filterGood[1].count = count1;
      this.filterGood[2].count = count2;
    }

  }
</script>
<style scoped>

  .box{    position: absolute;text-align: center;line-height: 24px;right: 10px;bottom: 18px;width: 74px; height: 24px;}
  .food-wrapper{width: 100%;position: fixed;height: 100%;bottom:46px;left: 0;z-index: 2;background-color: #ffffff;overflow-y: scroll;}
  .food-avatar{width: 100%;height: 375px;}
  .food-avatar img{width: 100%; height: 100%;}
  .food-name{font-size: 14px;font-weight: 700;color: rgb(7,17,27);line-height: 14px;padding: 18px 0 8px 18px;}
  .ratings{font-size: 10px;color: rgb(147,153,159);padding-left: 16px;height: 16px;line-height: 16px;}
  .ratings span:nth-child(1){margin-right: 12px;}
  .price{padding: 18px;height: 24px;position: relative;}
  .food-prcie{float: left}
  .food-prcie span:nth-child(1){font-size: 14px;font-weight: 700;color: rgb(240,20,20);line-height: 24px;margin-right: 5px;}
  .food-prcie span:nth-child(2){font-size: 10px;font-weight: 700;color: rgb(143,153,159);line-height: 24px;}
  .price .take-in{transition: all .4s;font-size: 10px;background-color: #00A0DC;color: #ffffff;border-radius: 24px;}
  .food-description{padding: 18px;}
  .food-description div:nth-child(1),.rating-head{font-size: 12px;font-weight: 200;color:rgb(77,85,93);line-height: 24px;margin-bottom: 6px;}
  .food-description div:nth-child(2){padding:0 8px;font-size: 12px;font-weight: 200;color:rgb(77,85,93);line-height: 24px;}
  .rating-wrapper{width: 100%;box-sizing: border-box;padding: 18px 18px 0 ;}
  .filter-ratings{padding: 12px 0 18px;border-bottom: 1px solid rgba(7,17,27,.1);display: flex;}
  .filter-ratings li{padding: 8px 12px;font-size: 8px;border-radius: 2px;text-align: center;line-height: 16px;height: 16px;color: rgb(77,85,930);margin-right: 8px;}
  .filter-ratings li:nth-child(1){background-color:#ADD3DE;}
  .filter-ratings li:nth-child(2){background-color:#CCECF8; }
  .filter-ratings li:nth-child(3){background-color:#E9EBEC ;}
  .filter-ratings li.on{background-color:#00A0DC ;color: #ffffff;}
  
  .rating-top{box-sizing: border-box;font-size: 12px;color: rgb(147,153,159);padding: 12px 18px;width: 100%;border-bottom: 2px solid  rgba(7,17,27,.1); }
  .rating{padding: 16px;}

  .info{margin-bottom: 6px;display: flex;justify-content: space-between;font-size: 10px;color: rgb(147,153,159);line-height: 12px;}
  .ragint-content{border-bottom : 1px solid rgba(7,17,27,.1);font-size: 12px;color:rgb(7,17,27);line-height: 24px;display: flex; }
  .ragint-content .icon{margin-right: 8px;color: rgb(147,153,159);font-size: 12px;line-height: 24px;}
  .ragint-content .content{margin-left: 4px;}


  .box .open-enter-active,.box .open-leave-active {
    opacity: 1;

    transition: opacity .5s;
  }
  .box .open-enter,.box .open-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transition: opacity .5s;
  }

  .slice{
    height: 16px;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,.1);
    border-bottom: 1px solid rgba(7,17,27,.1);
    background-color: #f3f5f7;
  }
  .close{position: fixed;right: 18px;top:18px;z-index: 9;color: #ffffff;}
</style>
