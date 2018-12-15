<template>
  <div>
    <Header/>
    <div class="cart">
      <div class="m-servicePolicy">
        <div class="item">
          <i></i>
          <span>30天无忧退货</span>
        </div>
        <div class="item">
          <i></i>
          <span>48小时快速退款</span>
        </div>
        <div class="item">
          <i></i>
          <span>满88元免邮费</span>
        </div>
      </div>
      <div class="no-cart">
        <div class="img"></div>
        <span>去添加点什么吧</span>
      </div>
      <router-link to="/login" class="login-btn">登录</router-link>
    </div>
  </div>
</template>

<style lang="scss">
  body{
    background: #f4f4f4;
  }
  .m-servicePolicy{
    display: flex;
    justify-content: space-around;
    line-height: 2.1875rem;
    .item{
      color: #666;
      font-size: 0.75rem;
    }
  }
  .no-cart{
    margin: 0 auto;
    text-align: center;
    margin-top: 10rem;
    .img{
      width: 33vw;
      height: 33vw;
      background: url(../assets/images/icon/no-cart.png) center center no-repeat;
      background-size: contain;
      margin: 0 auto;
      text-align: center;
    }
    span{
      font-size: 0.75rem;
      color: #999;
    }
  }
  .login-btn{
    display: block;
    width: 64vw;
    height: 2.875rem;
    line-height: 2.875rem;
    color: #fff;
    font-size: 0.9375rem;
    text-align: center;
    margin: 1rem auto auto;
    text-decoration: none;
    border-radius: 0.1875rem;
    background-color: #b4282d;
  }
</style>
