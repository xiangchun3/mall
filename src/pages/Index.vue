<template>
  <div class="index">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <!-- 下拉导航 -->
    <div class="categroy">
      <div class="menu-tabs">
        <div class="menu">
          <ul>
            <li class="active">推荐</li>
            <li v-for="item in category">{{item.name}}</li>
          </ul>
        </div>
        <div class="toggle-warp" @click="toggleMenu">
          <van-icon name="arrow-down" />
        </div>
      </div>
      <div class="categroy-warp" v-show="menuShowStatus">
        <div class="categroy-list">
          <span class="active">推荐</span>
          <li v-for="item in category">{{item.name}}</li>
        </div>
      </div>
    </div>
    
    <!-- 图片轮播 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <div class="banner-item" :style="{'background-image': 'url('+image+')'}"></div>
      </van-swipe-item>
    </van-swipe>

    <div class="service-policy">
      <ul>
        <li><van-icon name="passed" />网易自营品牌</li>
        <li><van-icon name="passed" />30天无忧退货</li>
        <li><van-icon name="passed" />48小时快速退款</li>
      </ul>
    </div>

    <!-- 十大金刚-快捷导航 -->
    <div class="quick-nav">
      <ul>
        <li v-for="(item, index) in category">
          <a :href="item.linkUrl">
            <span class="item-icon" :style="{'background-image': 'url('+item.iconUrl+')'}"></span>
            <span class="item-text">{{item.name}}</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="freshman">
      <h2><span>新人专享礼</span></h2>
      <div class="content">
        <div class="left">
          <a href="">
            <p class="title">新人专享礼包</p>
            <div class="prd-img">
              <img src="../assets/images/redbag.png" alt="">
            </div>
          </a>
        </div>
        <div class="right">
          <div class="item1">
            <p class="title">福利社</p>
            <p>今日特价</p>
            <div class="prd-img">
              <img src="../assets/images/today-special-price.png" alt="">
            </div>
          </div>
          <div class="item2">
            <p class="title">新人拼团</p>
            <p class="tag">1元起包邮</p>
            <div class="prd-img">
              <img src="../assets/images/group-buy.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <TabBar/>
  </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);


export default {
  name: 'App',
  data () {
    return {
      category: [
        {"name": "居家", iconUrl: require('../assets/images/1.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1005000&style=pd"},
        {"name": "鞋包配饰", iconUrl: require('../assets/images/2.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1008000&style=pd"},
        {"name": "服装", iconUrl: require('../assets/images/3.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1010000&style=pd"},
        {"name": "电器", iconUrl: require('../assets/images/4.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1043000&style=pd"},
        {"name": "洗护", iconUrl: require('../assets/images/5.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1011000&style=pd"},
        {"name": "饮食", iconUrl: require('../assets/images/6.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1005002&style=pd"},
        {"name": "餐厨", iconUrl: require('../assets/images/7.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1013001&style=pd"},
        {"name": "婴童", iconUrl: require('../assets/images/8.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1005001&style=pd"},
        {"name": "文件", iconUrl: require('../assets/images/9.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1019000&style=pd"},
        {"name": "特色区", iconUrl: require('../assets/images/10.png'), linkUrl: "http://m.you.163.com/item/list?categoryId=1065000&style=pd"},
      ],
      searchValue: '',
      menuShowStatus: false,
      images: [
        require('../assets/images/banner/1.jpg'),
        require('../assets/images/banner/2.jpg'),
        require('../assets/images/banner/3.jpg'),
        require('../assets/images/banner/4.jpg')
      ]
    }
  },
  mounted () {
    console.log(this.$data);
  },
  methods: {
    onSearch: function (){

    },
    onCancel: function (){
      
    },
    toggleMenu: function (){
      console.log(this.menuShowStatus);
      this.menuShowStatus = !this.menuShowStatus;
    }
  }
}
</script>

<style lang="scss" scoped>
  .index{background-color: #f4f4f4;}
  .banner-item{
    width: 100%;
    height: 11.5625rem;
    background-size: cover;
  }
  .categroy{
    background-color: #ffffff;
    .menu-tabs{
      height: 1.875rem;
      line-height: 1.875rem;
      .menu{
        width: 90%;
        overflow-x: scroll;
        overflow-y: hidden;
        float: left;
        ul{
          width: 300%;
          padding: 0 1rem;
          li{
            float: left;
            color: #333;
            font-size: .875rem;
            padding: 0 .5rem;
            position: relative;
            &.active{
              color: #b4282d;
              &:after{
                content: ' ';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: .1rem;
                background-color: #b4282d;
              }
            }
          }
        }
      }
      .toggle-warp{
        width: 10%;
        float: left;
        text-align: center;
      }
    }
    .categroy-warp{
      display: block;
      .categroy-list{
        display: flex;
        // display: none;
        // justify-content: space-between;
        flex-wrap: wrap;
        span{
          width: 4.6875rem;
          height: 1.75rem;
          margin: .5rem 0 .5rem .8rem;
          font-size: .75rem;
          line-height: 1.75rem;
          text-align: center;
          display: inline-block;
          border: 1px solid #cccccc;
          color: #333;
          background-color: #FAFAFA;
          &.active{
            border: 1px solid #b4282d;
            color: #b4282d;
          }
        }
      }
    }
  }
  .service-policy{
    width: 100%;
    height: 2.25rem;
    line-height: 2.25rem;
    background-color: #ffffff;
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      li{
        font-size: .75rem;
        color: #B4282D;
        i{
          vertical-align: -13%;
          margin-right: .3rem;
        }
      }
    }
  }
  .quick-nav{
    width: 100%;
    margin-bottom: .5rem;
    background-color: #ffffff;
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li{
        width: 20%;
        text-align: center;
        margin-bottom: .8rem;
        .item-icon{
          width: 3.4375rem;
          height: 3.4375rem;
          display: block;
          background-size: cover;
          margin: 0 auto;
        }
        .item-text{
          color: #333333;
          font-size: .75rem;
        }
      }
    }
  }
  .freshman{
    overflow: hidden;
    margin-bottom: 5rem;
    background-color: #ffffff;
    h2{
      text-align: center;
      span{
        color: #333;
        font-size: 1rem;
        position: relative;
        &:before{
          left: -1rem;
        }
        &:before, &:after{
          content: '';
          position: absolute;
          top: .6rem;
          width: 0.8rem;
          height: 0.1rem;
          background: #333;
        }
      }
    }
    .content{
      overflow: hidden;
      margin: 0 1rem;
      display: flex;
      justify-content: space-between;
      .left{
        width: 49.5%;
        height: 13.5625rem;
        float: left;
        background-color: #F9E9CF;
        box-sizing: border-box;
        .title{
          color: #333;
          font-size: 1rem;
          margin: 1rem 0 0 1rem;
        }
        .prd-img{
          width: 6.25rem;
          height: 8.0625rem;
          margin: 1.5rem auto;
          img{
            width: 100%;
          }
        }
      }
      .right{
        width: 49.5%;
        float: left;
        .title{
          color: #333;
          font-size: 1rem;
        }
        .item1, .item2{
          height: 6.6875rem;
          padding: 1rem 0 0 1rem;
          box-sizing: border-box;
          position: relative;
        }
        .item1{
          background-color: #FBE2D3;
          margin-bottom: .25rem;
        }
        .item2{
          background-color: #FFECC2;
          .tag{
            color: #ffffff;
            background-color: #CBB693;
            border-radius: .125rem;
            display: inline-block;
            padding: .1rem 0.2rem;
          }
        }
        .prd-img{
          width: 6.25rem;
          height: 6.25rem;
          position: absolute;
          top: .125rem;
          right: 0;
          img{
            width: 100%;
          }
        }
      }
      p{
        color: #7f7f7f;
        font-size: .75rem;
        margin: 0;
      }
    }
  }
</style>

<style lang="scss">
  .van-swipe{
    width: 100%;
  }
  .van-collapse-item__content{
    padding: 0;
  }
</style>
