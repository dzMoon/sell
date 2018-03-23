<template>
  <div class="header-wrapper">
      <div class="header">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
        </div>
      </div>
      <div class="tips">
          <span class="gonggao"></span>
          <span class="text">{{seller.bulletin}}</span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'vHead',
    data(){
      return {
        seller:{}
      }
    },
    created(){
      this.$http.get("/api/seller").then((res)=>{
        this.seller = res.data;
      })

    }
  }
</script>

<style scoped>
  .header-wrapper{
  }
  .header{
    box-sizing: border-box;
    width: 100%;
    height:106px ;
    padding: 24px 12px 18px 24px;
  }
  .avatar{
    width: 64px;
    height: 64px;
    margin-right: 16px;
  }
  .avatar img{
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
  .tips{
    height: 28px;
    width: 100%;
    font-size: 10px;
    color: rgb(255,255,255);
    font-weight: 200;
    line-height: 28px;
    padding: 0 12px;
    background-color:rgba(7,17,27,.2) ;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .tips .gonggao{
    height: 14px;
    margin-right: 4px;
    width:28px;
    background: url("./bulletin@3x.png") no-repeat center center/contain;
  }
  .tips .text{
    width: 100%;
    flex: 1;
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
