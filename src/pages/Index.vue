<template>
  <div>
    <h3>您好，{{username}}</h3>
    <p>欢迎来到{{platform}}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      username: "joey",
      platform: "At Mall"
    }
  },
  mounted () {
    console.log(this.$data);
  } 
}
</script>