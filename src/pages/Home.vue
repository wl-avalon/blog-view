<template>
  <div style="margin-bottom: 20px;overflow: hidden;box-shadow: 0 2px 16px #ddd;background-color:#fff;height:360px;">
    <div id="imgBar" style="margin:0 auto;width:1280px;">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
      }
    }
  }
  $("#imgBar").slider({
    imgs: [
      "https://images0.cnblogs.com/blog/708426/201501/080209549216360.jpg",
      "https://images0.cnblogs.com/blog/708426/201501/100557406251638.jpg",
      "https://images0.cnblogs.com/blog/708426/201501/100602118284450.jpg"],
    scale: 128 / 36,
    border: true,
    delay: 2200,
    x: 10,
    y: 3
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #imgBar {
    margin:0 auto;width:1280px
  }
</style>
