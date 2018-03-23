<template>
  <div>
    <div class="shopCart">
        <div class="shop-left"  @click="toggleFold">
          <div class="logo-wrapper" :class="{'hightLight' : totalCount>0}">
            <div class="logo">
              <i class="icon-shopping_cart iconfont">&#xe600;</i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="shop-right" :class="payClass">
          <div class="pay" >{{payTree}}</div>
        </div>
        <div class="ball-container">
            <div class="ball" v-for="ball in balls " transition="drop" v-show="ball.show"></div>
            <div class="inner"></div>
        </div>

    </div>
    <transition name="rise">
      <div class="detail" transition="rise" v-show="rise">
        <div class="shopTitle">
          <div class="shop-car">购物车</div>
          <div class="clear" @click = "clear">清空</div>
        </div>
        <li class="selectedFood" v-for="food in selectedFoods">
          <div class="selectedFoodInner">
            <div class="food-name">{{food.name}}</div>
            <div class="food-price">￥{{food.count*food.price}}元</div>
            <div class="cart-container">
              <cartControl :food="food" @test = "drop" ></cartControl>
            </div>
          </div>
        </li>
      </div>
    </transition>
  </div>

</template>

<script >
  import  cartControl from "../cartcontrol/cartControl"
  export default {
    name:'shopCart',
    components :{
      cartControl
    },
    data(){
      return {
        seller:{},
        balls:[
          {show:false},
          {show:false},
          {show:false},
          {show:false},
          {show:false}
          ],
        dropBall:[],
        fold:true
      }
    },
    props:{
      selectedFoods:{
          type:Array
      }
    },
    created(){
      this.$http.get("api/seller").then((res)=>{
        this.seller = res.data
      })
    },
    computed : {
      totalPrice (){
        let total = 0;
        this.selectedFoods.forEach((item)=>{
          total += item.count*item.price;
          })
        return total;
      },
      totalCount(){
        let count =0;
        this.selectedFoods.forEach((item)=>{
          count += item.count;
        })
        return count
      },
      payTree(){
        if(this.totalCount == 0){
          let diff = this.seller.minPrice
          return `${diff}元起送`
        }
         else if( this.seller.minPrice > this.totalPrice){
          let diff = this.seller.minPrice - this.totalPrice

            return `还差￥${diff}元起送`
         }
         else if (this.seller.minPrice <= this.totalPrice){
          return "去结算"
        }
      },
      payClass(){
        if (this.seller.minPrice <= this.totalPrice){
          return "enugth";
        }else{
          return "not-enugth"
        }
      },
      rise(){
        if(this.totalCount==0){
            this.fold = true
            return false
        }
        let show = !this.fold;
        return show
      }
    },
    methods:{
      drop(el){
        for(let i=0;i<this.balls.length;i++){
          let ball = this.balls[i]
          if(!ball.show){
            ball.show = true;
            ball.el = el;
            return
          }
        }
      },
      toggleFold(){
        this.fold = !this.fold;
      },
      clear(){
        this.$emit("clearShop")
      }
    },
    transitions:{
      drop:{
        beforeEnter(el){
          console.log(el)
          let count = this.balls.length;
          while(count--){
            let ball = this.balls[count];
            if(ball.show){
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              el.styl.display = "";
              el.styl.webkitTransform = `translate3d(0,${y}px,0)`
              el.styl.transform = `translate3d(0,${y}px,0)`
              let inner = el.getElementsByClassName('inner')[0];
              inner.styl.webkitTransform = `translate3d(${x}px,0,0)`
              inner.styl.transform = `translate3d(${x}px,0,0)`
            }
          }
        },
        enter(el){
            let rf = el.offsetHeight;
            this.$nextTick(()=>{
              el.styl.webkitTransform = 'translate3d(0,0,0)'
              el.styl.transform = `translate3d(0,0,0)`
              let inner = el.getElementsByClassName('inner')[0];
              inner.styl.webkitTransform = `translate3d(0,0,0)`
              inner.styl.transform = `translate3d(0,0,0)`
            })
        },
        afterEnter(el){
            let ball = this.dropBalls.shift();
            if(ball){
              ball.show = false;
              el.styl.display = ""
            }
        }
      }
    }
  }
</script>

<style scoped>
  .shopCart{
    display: flex;
    position: absolute;
    bottom:0;
    height: 46px;
    background:#141d27 ;
    right: 0;
    width: 100%;
    z-index: 5;
  }
  .shop-left .logo-wrapper{
    position: absolute;
    left: 12px;
    bottom: 8px;
    height: 50px;
    border: 6px solid #141C27;
    border-radius: 50%;
    width: 50px;
    background: #2B343C;
    text-align: center;
    line-height: 50px;
    z-index: 5;
  }
  .shop-left .logo-wrapper.hightLight{
    background-color: #00A0DC;
  }
  .shop-left .logo-wrapper.hightLight .icon-shopping_cart{
    color: #ffffff;
  }
  .shop-right{
    width: 105px;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    padding: 8px;
    background: #2B333B;
    text-align: center;
    color: rgba(255,255,255,.4);
    z-index: 5;
  }
  .shop-right.enugth{
    background-color: #00A0DC;
    color: #ffffff;
  }
  .shop-right.not-enugth{
    background-color: #2B333B;

  }
  .shop-left{
    width: 100%;
    flex: 1;
    display: flex;
    position: relative;
    z-index: 5;
  }
  .shop-left div{
    height: 24px;
    line-height: 24px;
  }
  .shop-left .desc{
    border-left:1px solid  #2C343D;
    position: absolute;
    left: 114px;
    padding-left: 12px;
    bottom:12px;
    color: #919396;
    font-size: 12px;
    font-weight: 700;
  }
  .shop-left .price{
    position: absolute;
    left: 80px;
    bottom:12px;
    color: #919396;
    font-size: 12px;
    font-weight: 700;

  }
  .shop-left .num{
    position: absolute;
    top:0;
    right: 0;
    width: 24px;
    height: 12px;
    font-size: 9px;
    line-height: 12px;
    font-weight: 700;
    color: rgb(255,255,255);
    background-color: rgb(240,30,30);
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,.4);
    border-radius: 6px;
  }
  .ball-container .ball{
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
  }
  .ball-container .ball.drop-transition{
    transition: all .4s cubic-bezier(0.49,-0.29,-0.75,0.41);
  }
  .ball-container .ball.drop-transition .inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: aqua;
    transition: all .4s linear;
  }
  .detail{
    width: 100%;
    position: fixed;
    bottom: 46px;
    height: 280px;
    background-color: #ffffff;
    z-index: 3;
  }
  .detail .shopTitle{
    height: 40px;
    background-color: #f3f5f7;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .shop-car{
    padding-left: 18px;
    font-size: 14px;
    font-weight: 200;
    color: rgb(7,17,27);
  }
  .clear{
    padding-right: 18px;
    font-size: 12px;
    color: rgb(0,160,220);
  }
  .selectedFood{
    width: 100%;
    height: 48px;
    padding: 12px 18px 0;
    box-sizing: border-box;
  }
  .selectedFood .selectedFoodInner{
    width: 100%;
    position: relative;
    border-bottom: 1px solid rgba(7,17,27,.1);
    padding-bottom: 12px;
  }
  .selectedFood .food-name{
    font-size: 14px;
    color:rgb(7,17,27);
    line-height: 24px;
  }
  .selectedFood .food-price{
    font-size: 14px;
     color: rgb(240,20,20);
    font-weight: 700;
    position: absolute;
    top:0;
    right: 90px;
    line-height: 24px;
  }
  .cart-container{
    position: absolute;
    right: 0;
    top: 0;
    height: 24px;
    width: 82px;
  }
  .mask{
    position: fixed;
    display: none;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: rgba(7,17,27,.6);
    blur:10px;
  }

   .rise-enter-active, .rise-leave-active {
    transition: all .4s ease-in-out;
    transform: translate3d(0,0,0);
  }
   .rise-enter, .rise-leave-active {
    transform: translate3d(0,100%,0);
    transition: all .4s ease-in-out;
  }
  .icon-shopping_cart{
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    color: #80858A;
  }
</style>
