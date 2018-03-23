<template>
  <div>

 	<!-- 评论筛选 -->
      <div class="food-rating">
        <div class="rating-wrapper" >
          <h1 class="rating-head">商品评价</h1>
          <div class="filter-ratings">
          	<li :class="{on:'all'==sellectType}"  @click="fiterRatings('all')">全部{{userInfoss.length}}</li>
          	<li :class="{on:'recommend'==sellectType}"  @click="fiterRatings('recommend')">满意{{active.length}}</li>
          	<li :class="{on:'complaints'==sellectType}"  @click="fiterRatings('complaints')">不满意{{positive.length}}</li>
            <!-- <li   v-for="(item,index) in filterGood" :class="{on:item.name==sellectType}"  @click="fiterRatings(item.name,index)" ref="mybox">{{item.text}}    {{item.count}}</li> -->
          </div>
        </div>
        <div class="rating-top"  @click="onlyContent" :class="{onlyContent:content}">
          <i class="iconfont" >&#xe69e;</i>
          只看有内容的评价
        </div>
        <li class="rating" v-for="userInfo in userInfos"  v-if="userInfo.text||content">
          <div class="info">
            <div class="cust-info"><img :src="userInfo.avatar">{{userInfo.username}}</div>
            <div class="time">{{userInfo.rateTime | format}}</div>
          </div>
          <div class="rating-score">
          		<Star :score="userInfo.score" :size="16"></Star>
          	<span>{{userInfo.deliveryTime}}分钟送达</span>
          </div>
          
          <div class="ragint-content">
          	<div class="content" >{{userInfo.text}}</div>
            <div>
            	<i class="iconfont" v-if="userInfo.rateType==1" style="color: #B7BBBF">&#xe64c;</i>
            	<i class="iconfont" v-else style="color: #00A0DC">&#xe672;</i>
            	<div v-for="recommend in userInfo.recommend" class="recommend">{{recommend}}</div>
            </div>
          </div>
        </li>
      </div>


  </div>
</template>

<script >
const RECOMMEND = 0;
const COMPLAINTS = 1;
import Star from "../star/star"
  export default {
    name:'ratings',
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
            text:'满意',
            count:0
          },
          {
            name:'complaints',
            text:'不满意',
            count:0
          }
        ],
        sellectType:'all',
        userInfoss:[],
        userInfos:[],
        content:true
      }
    },
    methods:{
      fiterRatings(action){
        this.sellectType = action;
        let arr = [];
        if(action=="all"){
          arr = this.userInfoss;
        }else if(action=="recommend"){
          this.userInfoss.forEach((item)=>{
            if(item.rateType==0){
              arr.push(item)
            }
          })
        }else{
          this.userInfoss.forEach((item)=>{
            if(item.rateType==1){
              arr.push(item)
            }
          })
        }
        this.userInfos = arr;
      },
      onlyContent(){

      	console.log(this.content)
      	this.content = !this.content

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
    computed:{
    	active(){
    		return this.userInfoss.filter((item)=>{
        		return item.rateType == RECOMMEND
   		  	})
    	},
    	positive(){
			return this.userInfoss.filter((item)=>{
        		return item.rateType == COMPLAINTS
   		  })
    	}

    },
    created(){
    	this.$http.get("api/ratings").then((res)=>{
    		this.userInfoss = res.data;
    		this.userInfos = res.data;
    	})
      let count1 = 0;
      let count2 = 0;
      this.filterGood[0].count = this.userInfos.length;
      this.userInfos.forEach((item)=>{
          if(item.rateType == 0){
               count1++
          }
      })
     this.userInfos.forEach((item)=>{
          if(item.rateType == 1){
               count2++
          }
      })
      this.filterGood[1].count = count1;
      this.filterGood[2].count = count2;
    },
    components:{
    	Star
    }

  }
</script>

<style scoped>
	.rating-wrapper{width: 100%;box-sizing: border-box;padding: 18px 18px 0 ;}
  .filter-ratings{padding: 12px 0 18px;border-bottom: 1px solid rgba(7,17,27,.1);display: flex;}
  .filter-ratings li{padding: 8px 12px;font-size: 8px;border-radius: 2px;text-align: center;line-height: 16px;height: 16px;color: rgb(77,85,930);margin-right: 8px;}
  .filter-ratings li:nth-child(1){background-color:#ADD3DE;}
  .filter-ratings li:nth-child(2){background-color:#CCECF8; }
  .filter-ratings li:nth-child(3){background-color:#E9EBEC ;}
  .filter-ratings li.on{background-color:#00A0DC ;color: #ffffff;}
  
  .rating-top{box-sizing: border-box;font-size: 12px;color: rgb(147,153,159);padding: 12px 18px;width: 100%;border-bottom: 2px solid  rgba(7,17,27,.1); }
  .rating{padding: 16px;list-style: none;}

  .info{margin-bottom: 6px;display: flex;justify-content: space-between;font-size: 10px;color: rgb(147,153,159);line-height: 12px;}
  .ragint-content{border-bottom : 1px solid rgba(7,17,27,.1);font-size: 12px;color:rgb(7,17,27);line-height: 24px;padding-left: 28px; }
  .ragint-content .icon{margin-right: 8px;color: rgb(147,153,159);font-size: 12px;line-height: 24px;}
  .ragint-content .content{margin-left: 4px;}
  .cust-info img{width: 28px;height: 28px;vertical-align: middle;margin-right: 12px;border-radius: 50%;}
  .rating-score{padding-left: 28px;}
  .rating-score span{font-size: 10px;color:rgb(143,157,159);line-height: 24px;}
  .recommend{border: 1px solid rgba(7,17,27,.1);font-size: 12px;color: rgb(143,157,159);line-height: 16px;padding:0 6px;margin-left: 8px;display: inline-block;}
  .rating-score img{width: 16px;height: 16px;}
  .rating-top.onlyContent{color: #B7BBBF}
  .rating-top{color:#00A0DC;}
</style>
