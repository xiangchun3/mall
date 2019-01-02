<template>
  <div class="nav">
    <router-link to='/'>
      <i class="index active"></i>
      <span>首页</span>
    </router-link>
    <router-link to='/cateList'>
      <i class="cate"></i>
      <span>分类</span>
    </router-link>
    <router-link to='/topic'>
      <i class="topic"></i>
      <span>识物</span>
    </router-link>
    <router-link to='/cart'>
      <i class="cart"></i>
      <span>购物车</span>
    </router-link>
    <router-link to='/user'>
      <i class="user"></i>
      <span>个人</span>
    </router-link>
  </div>
</template>

<style lang="scss">
// 底部导航样式
.nav{
  display: flex;
  justify-content: space-around;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #d9d9d9;
  height: 3rem;
  align-items: center;
  z-index: 9;
  a{
    text-align: center;
    text-decoration: none;
    i{
      background-image: url(../assets/images/sprites/tabBar.png);
      background-size: cover;
      background-repeat: no-repeat;
      width: 1.2rem;
      height: 1.2rem;
      display: inline-block;
      &.index{
        background-position: 0 -7.5rem;
        &.active{
          background-position: 0 -6rem;
        }
      }
      &.cate{
        background-position: 0 -4.45rem;
      }
      &.topic{
        background-position: 0 -10.5rem;
      }
      &.cart{
        background-position: 0 -1.5rem;
      }
      &.user{
        background-position: 0 -13.5rem;
      }
    }
    span{
      color: #666;
      display: block;
      font-size: .75rem;
    }
  }
}
</style>