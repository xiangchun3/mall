<template>
  <div class="category">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
      />
    </form>

    <div class="category-list">
      <div class="categroy-nav">
        <ul>
          <li class="active"><a href="#">爆品专区</a></li>
          <li><a href="#">新品专区</a></li>
          <li v-for="item in category"><a href="#">{{item.name}}</a></li>
        </ul>
      </div>
      <div class="category-subnav">

      </div>
    </div>
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

.category-list{
  .categroy-nav{
    width: 20%;
    ul{
      li{
        margin-top: 1rem;
        text-align: center;
        a{
          color: #333;
        }
      }
      .active{
        a{
          color: #ab2b2b;
        }
      }
    }
  }
  .category-subnav{
    width: 80%;
  }
}

</style>
