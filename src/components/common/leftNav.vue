<template>

  <div class="leftnav">

    <ul>
      <li>
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li>

      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <div>店铺</div>
      </li>

      <li>
        <i class="icon iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>

      <li>
        <i class="icon iconfont icon-31huiyuanqia"></i>
        <div>会员</div>
      </li>

      <li>
        <i class="icon iconfont icon-wangluo"></i>
        <div>统计</div>
      </li>

    </ul>
  </div>
</template>
<script>
  export default {
    name:'leftNav',
    data(){
      return{

      }
    }
  }
</script>
<style scoped>
  .leftnav{
    color:#fff;
    float:left;
    width:5%;
    height:100%;
    background-color:#1D8ce0;
    font-size:10px;
  }
  .iconfont{
    font-size:24px;

  }
  .leftnav ul{

    margin:0;
    padding:0
  }
  .leftnav li{
    list-style: none;
    padding:10px;
    border-bottom: 1px solid #20a0ff;
    text-align: center;
  }
</style>