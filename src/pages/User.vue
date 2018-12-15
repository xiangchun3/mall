<template>
  <div>
    <div id="productList">
      登录
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
