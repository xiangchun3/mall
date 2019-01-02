<template>
  <div class="category">
    <!-- 搜索框 -->
    <div class="category-search">
      <form action="/">
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          show-action
        />
      </form>
    </div>

    <!-- 左侧导航 -->
    <div class="categroy-nav">
      <ul>
        <li class="active"><a href="#">爆品专区</a></li>
        <li><a href="#">新品专区</a></li>
        <li v-for="item in category"><a href="#">{{item.name}}</a></li>
      </ul>
    </div>

    <!-- 右侧列表 -->
    <div class="category-subnav">
      <div class="banner">
        <a href="#">
          <img src="../assets/images/banner/category-banner.jpg" alt="">
        </a>
      </div>
      <div class="list">
        <!-- <li>
          <img src="" alt="">
          <span></span>
        </li> -->
      </div>
    </div>

    <!-- 底部导航 -->
    <TabBar/>
  </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from "axios";

Vue.use(Vant);
export default {
  name: 'App',
  data () {
    return {
      productList: [],
      searchValue: "搜索商品, 共20226款好物",
      category: null
    }
  },
  mounted () {
    this.search();
  },
  methods: {
    search: function () {
      let that = this;
      // 请求被webpack-api-mocker拦截到本地mock文件
      axios({
        method: 'post',
        url: '/list'
      }).then(function(response){
        let data = response.data;
        that.productList = data;
        that.category = data.category;
      })
    }
  }
}
</script>

<style lang="scss">
.category-search{
  z-index: 9;
}
.categroy-nav{
  width: 20%;
  position: fixed;
  top: 2.75rem;
  left: 0;
  bottom: 0;
  background-color: #fff;
  ul{
    li{
      margin-top: 1rem;
      text-align: center;
      a{
        color: #333;
        font-size: .875rem;
        height: 1.625rem;
        line-height: 1.625rem;
        display: block;
      }
    }
    .active{
      a{
        color: #ab2b2b;
        text-align: left;
        &:before{
          content: " ";
          display: inline-block;
          width: 3px;
          height: 100%;
          background-color: #ab2b2b;
          vertical-align: -.45rem;
          margin-right: .5rem;
        }
      }
    }
  }
  &:after{
    content: '';
    position: absolute;
    background-color: rgba(0,0,0,.15);
    top: 0;
    bottom: 0;
    width: 1px;
    -webkit-transform-origin: 100% 50% 0;
    transform-origin: 100% 50% 0;
    right: 0;
  }
}
.category-subnav{
  width: 80%;
  z-index: 9;
  float: right;
  margin: 1rem 0;
  .banner{
    width: 100%;
    height: 6.3rem;
    text-align: center;
    a{
      width: 100%;
      height: 100%;
      img{
        width: 90%;
      }
    }
  }
}
</style>
