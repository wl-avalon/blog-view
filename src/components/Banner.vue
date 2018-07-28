<template>
  <div class="banner-container" v-bind:style="{ height: bannerHeight + 'px' }">
    <div class="logo">雪滴子阁</div>
    <div class="description">夏冶兵的随笔</div>
    <div class="cut-line"></div>
    <div class="index-list">
      <div id="index-1" class="index-item" v-bind:style="{ 'background-color' : color1 , 'color' : selected == 1 ? '#000000' : '#ffffff'}" @mouseenter="enterIndexItem(1)" @mouseleave="leaveIndexItem(1)">开发者畅想</div>
      <div id="index-2" class="index-item" v-bind:style="{ 'background-color' : color2 , 'color' : selected == 2 ? '#000000' : '#ffffff'}" @mouseenter="enterIndexItem(2)" @mouseleave="leaveIndexItem(2)">读书笔记</div>
      <div id="index-3" class="index-item" v-bind:style="{ 'background-color' : color3 , 'color' : selected == 3 ? '#000000' : '#ffffff'}" @mouseenter="enterIndexItem(3)" @mouseleave="leaveIndexItem(3)">日常随笔</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Banner',
    props: ['screenHeight'],
    data() {
      let selected = 1;
      return {
        bannerHeight: this.screenHeight,
        selected: selected,
        color1: selected == 1 ? '#DBC7A6' : '#42485b',
        color2: selected == 2 ? '#DBC7A6' : '#42485b',
        color3: selected == 3 ? '#DBC7A6' : '#42485b',
      }
    },
    watch:{
      screenHeight (val) {
        console.log(val);
        this.bannerHeight = val;
      }
    },
    methods:{
      enterIndexItem: function(index){
        let that = this;
        switch(index){
          case 1:{
            if(this.selected != 1){
              this.color1 = '#7CB69B';
            }
            break;
          }
          case 2:{
            if(this.selected != 2){
              this.color2 = '#7CB69B';
            }
            break;
          }
          case 3:{
            if(this.selected != 3){
              this.color3 = '#7CB69B';
            }
            break;
          }
        }
      },
      leaveIndexItem: function(index){
        let that = this;
        switch(index){
          case 1:{
            if(this.selected != 1){
              this.color1 = '#42485b';
            }
            break;
          }
          case 2:{
            if(this.selected != 2){
              this.color2 = '#42485b';
            }
            break;
          }
          case 3:{
            if(this.selected != 3){
              this.color3 = '#42485b';
            }
            break;
          }
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
    width: 200;
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
  .index-item{
    height: 40px;
    font-size: 12px;
    color:#ffffff;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
  .enter-item{
    background-color: #7CB69B;
  }
  .leave-item{
    background-color: #42485b;
  }
</style>
