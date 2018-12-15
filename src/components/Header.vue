<template>
  <div class="header">
    <span class="title">购物车</span>
  </div>
</template>

<style lang="scss">
.header{
  height: 2.75rem;
  line-height: 2.75rem;
  text-align: center;
  background: #ffffff;
  position: relative;
  .title{
    font-size: 1.125rem;
  }
  &:after{
    content: '';
    position: absolute;
    background-color: #d9d9d9;
    left: 0;
    width: 100%;
    height: 1px;
    -webkit-transform-origin: 50% 100% 0;
    transform-origin: 50% 100% 0;
    bottom: 0;
  }
}
</style>