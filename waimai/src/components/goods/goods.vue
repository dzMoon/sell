<template>
  <div >
    <div class="goods" >
      <div class="goods-wrapper">
        <li class="item"  v-for="(good,index) in foodsList" :class="{on:index==0}" @click="quick(index)">
        <span class="text">
          <span v-show="good.type > 0" class="icon" :class="good.type"></span>{{good.name}}
        </span>
        </li>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <div class="food-title" v-for = "foodList in foodsList">
          <h1>{{foodList.name}}</h1>
          <div class="food-item" v-for="(food,index) in foodList.foods"  >
            <div class="food">
              <div class="food-img" @click="show(food)">
                <img :src="food.image" alt="">
              </div>
              <div class="food-content">
                <p>{{food.name}}</p>
                <p v-show="food.description">{{food.description}}</p>
                <p>月售{{food.sellCount}}份，好评率{{food.rating}}%</p>
                <p><span>￥{{food.price}}元</span><span v-show="food.oldPrice" style="text-decoration: line-through">￥{{food.oldPrice}}</span></p>

              </div>
              <div class="count" >
                <!--计算商品数量-->
                <cartControl :food="food" @test = "drop" ></cartControl>
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
    <!--底部购物车组件-->
    <shopCart ref="shopcart"  :selected-foods = "selectedFoods" @clearShop="change"></shopCart>
    <!--食物详情页组件-->
    <transition name="fade">
        <food :food="food" v-show="showFlag" @count = "count" transition="fade" @close="close"></food>
    </transition>
  </div>

</template>

<script >
  import food from "../food/food"
  import shopCart from "../shopCart/shopCart"
  import  cartControl from "../cartcontrol/cartControl"
  export default {
    name:'goods',
    components :{
      shopCart,
      cartControl,
      food
    },
    data(){
      return {
        goods:["decrease","discount","special","invoice","guarantee"],
        foodsList :[],
        selectedFood: [],
        showFlag:false,
        food:{}
      }
    },
    computed : {
      selectedFoods(){
        let foods = [];
        this.foodsList.forEach((foodlist)=>{
          foodlist.foods.forEach((food)=>{
            if(food.count>0){
              foods.push(food);
            }
          })
        })
        return foods;
      }
    },
    created(){
      this.$http.get("api/goods").then((res)=>{
        this.foodsList = res.data;
      })
    },
    methods:{
      drop(target){
        this.$refs.shopcart.drop(target);
      },
      change(){
        this.foodsList.forEach((foodlist)=>{
          foodlist.foods.forEach((food)=>{
            food.count = 0
          })
        })
      },
      show(food){
        this.showFlag = true;
        this.food = food
      },
      count(item){
        this.foodsList.forEach((foodlist)=>{
          foodlist.foods.forEach((food)=>{
            if(food.name==item.name){
              food = item;
            }
          })
        })
      },
      close(){
        this.showFlag = false;
        this.food = [];
      },
      quick(index){
      }
    }
  }
</script>

<style scoped>
  @font-face {font-family: "iconfont";
    src: url('../../../static/font/iconfont.eot'); /* IE9*/
    src: url('../../../static/font/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../../../static/font/iconfont.woff') format('woff'), /* chrome, firefox */
    url('../../../static/font/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('../../../static/font/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .goods{
    display: flex;
    position: absolute;
    top:174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }
  .goods-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    overflow-y: auto;
  }
  .goods-wrapper .item{
    display: table;
    height: 54px;
    line-height: 14px;
    font-size: 12px;
    width: 56px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    padding: 0 12px;
    font-weight: 200;
  }
  .goods-wrapper .item:nth-child(1){
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .goods-wrapper .item.on{
    background-color: #ffffff;
  } 
  .goods-wrapper .item .text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
  }
  .goods-wrapper .item .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .goods-wrapper .item .icon.decrease{
    background: url("./decrease_3@2x.png");
  }
  .goods-wrapper .item .icon.discount{
    background: url("./discount_3@2x.png");
  }
  .goods-wrapper .item .icon.special{
    background: url("./special_3@2x.png");
  }
  .goods-wrapper .item .icon.invoice{
    background: url("./invoice_3@2x.png");
  }
  .goods-wrapper .item .icon.guarantee{
    background: url("./guarantee_3@2x.png");
  }
  .food-item{
    padding: 18px;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
  .food{
    display: flex;
    position: relative;
  }
  .foods-wrapper{
    height: 100%;
    overflow-y: auto;
  }
  .food-title h1{
    padding-left:18px ;
    height: 26px;
    background: #f3f5f7;
    border-left:2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 26px;
  }
  .food-title .food-img{
    margin-right: 10px;
    width:64px ;
    height:64px ;
  }
  .food-title .food-img img{
    width:100%;
    height:100% ;
  }
  .food-content p:nth-child(1){
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
    margin-top: 2px;
  }
  .food-content p{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 8px;
  }
  .food-content p:last-of-type{
    font-size: 14px;
    color:rgb(240, 20, 20);
    line-height: 24px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .food-content p:last-of-type span:last-of-type{
    margin-left: 8px;
    font-size: 10px;
    font-weight: 700;
    line-height: 24px;
    color: rgb(147,153,159);

  }

   .fade-enter-active, .fade-leave-active {
    opacity: 1;

  transition: opacity .5s;
}
 .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity .5s;
}
/*谷歌浏览器清除滚动条样式*/
::-webkit-scrollbar{width:0;}
</style>
