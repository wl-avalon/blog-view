<template>
  <div class="list-area" v-bind:style="{ width: screenWidth - 360 + 'px'}">
    <div class="article-list-title">
      {{title}}
    </div>
    <div class="article-list" v-bind:style="{ width: screenWidth - 400 + 'px'}">

    </div>
    <div class="cut-page-button-list">

    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: ["pageIndex","screenWidth"],
  data() {
    return {
      title: this.getTitle(this.pageIndex),
    };
  },
  methods: {
    getTitle: function(pageIndex){
      switch(pageIndex){
        case 'index':{
          return "最近博文";
        }
      }
    }
  }
};
</script>

<style scoped>
.list-area{
  height: 550px;
  margin: auto;
  position: relative;
}
.article-list-title {
  height: 40px;
  font-size: 25px;
  margin-bottom: 10px;
}
.article-list{
  margin: auto;
  height: 400px;
  background-color: #000000;
}
.cut-page-button-list{
  width: 240px;
  height: 40px;
  background-color: black;
  position: absolute;
  bottom: 40px;
  right: 30px;
}
</style>
