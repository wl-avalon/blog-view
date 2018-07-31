<template>
  <div class="banner-container" v-bind:style="{ height: bannerHeight + 'px' }">
    <div class="logo">雪滴子阁</div>
    <div class="description">夏冶兵的随笔</div>
    <div class="cut-line"></div>
    <div class="index-list">
      <div @click="clickIndexItem(1)"><index-item v-bind:id=1 v-bind:clickID="clickID"></index-item></div>
      <div @click="clickIndexItem(2)"><index-item v-bind:id=2 v-bind:clickID="clickID"></index-item></div>
      <div @click="clickIndexItem(3)"><index-item v-bind:id=3 v-bind:clickID="clickID"></index-item></div>
    </div>
  </div>
</template>

<script>
  import IndexItem from "@/components/Banner/IndexItem";
  export default {
    name: 'Banner',
    props: ['screenHeight'],
    components:{
      'index-item': IndexItem,
    },
    data() {
      return {
        bannerHeight: this.screenHeight,
        clickID: 0,
      }
    },
    watch:{
      screenHeight (val) {
        this.bannerHeight = val;
      }
    },
    methods:{
      clickIndexItem: function(id){
          if(id === this.clickID){
            this.clickID = 0;
          }else{
            this.clickID = id;
          }
      }
    }
  }
</script>

<style scoped>
  .banner-container{
    width: 200px;
    background-color: #373d41;
    float: left;
  }
  .logo{
    width: 200px;
    height: 50px;
    margin-left: 15px;
    margin-top: 100px;
    color: #ffffff;
    font-size: 30px;
  }
  .description{
    color:#ffffff;
    font-size: 15px;
    position:relative;
    text-align:right;
    right: 15px;
    margin-bottom: 20px;
  }
  .cut-line{
    width: 160px;
    height: 1px;
    margin-left: auto;
    margin-right: auto;
    background-color: #1C1E1B;
  }
  .index-list{
    margin-top: 80px;
  }
</style>
