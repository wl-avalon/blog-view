<template>
<div class="page-container">
  <div class="list-area" v-bind:style="{ width: screenWidth - 360 + 'px'}">
    <div class="article-list-title">
      {{pageTitle}}
    </div>
    <div class="article-list" v-bind:style="{ width: screenWidth - 400 + 'px'}">
      <div v-for="item in articleSummaryList" v-bind:key="item.uuid" @click="jumpToArticleDetail(item.uuid)">
        <div class="item-container">
          <div class="article-title">-> {{item.title}}</div>
          <div class="create-time">{{item.createTime}}</div>
        </div>
      </div>
    </div>
    <div class="cut-page-button-list-container">
      <div class="cut-page-button-list">
        <div class="cut-page-desc">第</div>
        <div class="cut-page-button" v-for="n in pageCount" v-bind:key="n" v-bind:style="buttonStyle[n]" @click="changePageIndex(n)">{{n}}</div>
        <div class="cut-page-desc">页</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ArticleList",
  props: ["pageTitle","screenWidth", "mainUuid", "subUuid"],
  data() {
    return {
      pageNo: 1,
      articleSummaryList: [],
      pageCount: 1,
      selectPage: 1,
      buttonStyle: [],
    };
  },
  created () {
    this.flushArticleSummaryList("", "", 1, 10);
  },
  methods: {
    queryArticleSummaryList(mainUuid, subUuid, pageNo, pageSize){
      let that = this;
      let url = "https://www.wl-avalon.com/blog/outer/query/getArticleSummaryList?mainUuid="+mainUuid+"&subUuid="+subUuid+"&pageNo="+pageNo+"&pageSize="+pageSize;
      this.$http.get(url)
        .then(function (response) {
          let articleSummaryList = response.data.data ? response.data.data : [];
          that.articleSummaryList = articleSummaryList.articleList ? articleSummaryList.articleList : [];
          that.pageCount = articleSummaryList.listCount ? parseInt(articleSummaryList.listCount / 10) + 1 : 1;
          that.buttonStyle = [];
          for(var i = 0; i <= that.pageCount; i++){
            let buttonStyle = {};
            if(i === that.selectPage){
              buttonStyle = {
                'background-color' : 'rgba(219,199,166,0.8)',
              };
            }
            that.buttonStyle.push(buttonStyle);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.articleSummaryList = [];
        });
    },
    flushArticleSummaryList(mainUuid, subUuid, pageNo, pageSize){
      this.queryArticleSummaryList(mainUuid, subUuid, pageNo, pageSize);
    },
    jumpToArticleDetail(articleUuid){
      this.$emit('switchArticleItem', articleUuid);
    },
    changePageIndex(pageIndex){
      this.selectPage = pageIndex;
      this.flushArticleSummaryList(this.mainUuid, this.subUuid, pageIndex, 10);
    },
  },
};
</script>

<style scoped>
.page-container{
  position: relative;
}
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
  padding-top: 20px;
  /* border-radius: 10px; */
  /* border: solid 2px rgba(219,199,166); */
}
.item-container{
  overflow: hidden;
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left:30px;
  border-radius: 10px;
}
.item-container:hover{
  overflow: hidden;
  position: relative;
  padding-left:30px;
  background-color:rgba(219,199,166,0.5);
  filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#40000000,endColorstr=#40000000);
  transition:background-color 0.2s;
  -moz-transition: background-color 0.2s; /* Firefox 4 */
  -webkit-transition: background-color 0.2s; /* Safari 和 Chrome */
  -o-transition: background-color 0.2s; /* Opera */
}
.article-title{
  float: left;
}
.browser-count{
  float: left;
}
.create-time{
  float: left;
  position: absolute;
  right: 30px;
}
.cut-page-button-list-container{
  margin: auto;
  overflow: hidden;
  position: relative;
  height: 40px;
  /* bottom: 40px; */
}
.cut-page-button-list{
  /* width: 240px; */
  height: 40px;
  /* background-color: black; */
  position: absolute;
  right: 30px;
}
.cut-page-button{
  width:40px;
  height: 40px;
  float: left;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  border-radius: 25px;
  font-size: 15px;
}
.cut-page-button:hover{
  background-color:rgba(219,199,166,0.8);
  filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#40000000,endColorstr=#40000000);
  transition:background-color 0.2s;
  -moz-transition: background-color 0.2s; /* Firefox 4 */
  -webkit-transition: background-color 0.2s; /* Safari 和 Chrome */
  -o-transition: background-color 0.2s; /* Opera */
  font-size: 15px;
}
.cut-page-desc{
  width:40px;
  height: 40px;
  float: left;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  float: left;
  font-size: 15px;
}
</style>