<template>
  <div>
    <div id="productList">
      <div class="items" v-for="item in productList">
        <h3>{{item.productName}}</h3>
        <p>
          <b>¥{{item.price}}</b>
          <span>评论{{item.comments}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',
  data () {
    return {
      productList: []
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
        that.productList = response.data;
      })
    }
  }
}
</script>

<style lang="scss">
.items{
  h3{
    font-size: 1rem;
  }
}

</style>
