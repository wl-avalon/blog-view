<template>
  <div class="banner-container" v-bind:style="{ height: bannerHeight + 'px' }">
    <div class="logo">雪滴子阁</div>
    <div class="description">夏冶兵的随笔</div>
    <div class="cut-line"></div>
    <div class="index-list">
      <div v-for="(categoryItem, index) in mainCategoryList" v-bind:key="index">
        <div class="main-item" @click="clickIndexItem(categoryItem.uuid, categoryItem.title)">{{categoryItem.title}}</div>
        <index-item v-bind:id="categoryItem.uuid" v-bind:clickID="clickID" v-bind:title="categoryItem.title" @changeSubIndex="changeSubIndex"></index-item>
      </div>
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
        clickID: "0",
        mainCategoryList: [],
        articleSummaryList: [],
      }
    },
    created(){
      this.queryMainCategoryList();
    },
    watch:{
      screenHeight (val) {
        this.bannerHeight = val;
      }
    },
    methods:{
      queryMainCategoryList(){
        let that = this;
        let url = "https://www.wl-avalon.com/blog/outer/query/getMainCategoryList";
        this.$http.get(url)
          .then(function (response) {
            let mainCategoryList = response.data.data ? response.data.data : [];
            that.mainCategoryList = mainCategoryList;
          })
          .catch(function (error) {
            that.mainCategoryList = [];
          });
      },
      clickIndexItem: function(id, title){
        if(this.clickID === id){
          this.clickID = 0;
        }else{
          this.clickID = id;
          this.$emit('changeSwitchItem', title, id);
        }
      },
      changeSubIndex(id, subUuid, title){
        this.$emit('changeSwitchItem', title, id, subUuid);
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
  .main-item{
    height: 40px;
    font-size: 12px;
    color:#ffffff;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    background-color: #3B4951;
  }
  .main-item:hover{
    background-color: #27353D;
    transition:background-color 0.2s;
    -moz-transition: background-color 0.2s; /* Firefox 4 */
    -webkit-transition: background-color 0.2s; /* Safari 和 Chrome */
    -o-transition: background-color 0.2s; /* Opera */
  }
</style>
