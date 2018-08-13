<template>
<div>
    <banner v-bind:screenHeight="screenHeight" @changeSwitchItem="switchCategoryChange"></banner>
    <div>
        <div class="content-framework" v-bind:style="{ width: screenWidth - 200 + 'px',height: screenHeight + 'px'}">
            <div class="content-canvas" v-bind:style="canvasStyle">
              <article-list v-show="articleUuid === ''" ref="articleList" v-bind:pageTitle="pageTitle" v-bind:screenWidth="screenWidth" v-bind:mainUuid="mainCategoryUuid" v-bind:subUuid="subCategoryUuid" @switchArticleItem="switchArticleItem"></article-list>
              <article-detail v-show="articleUuid !== ''" v-bind:articleUuid="articleUuid" v-bind:screenHeight="screenHeight"></article-detail>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Banner from "@/components/Banner/Banner";
import ArticleList from "@/components/ArticleList";
import ArticleDetail from "@/components/ArticleDetail";
// import router from '@/router'
export default {
    name: "Index",
    components: {
        Banner: Banner,
        'article-list': ArticleList,
        'article-detail' : ArticleDetail,
    },
    data(){
        return {
            screenWidth: document.documentElement.offsetWidth,
            screenHeight: document.documentElement.clientHeight,
            pageTitle: "最近博文",
            mainCategoryUuid: "",
            subCategoryUuid: "",
            articleUuid: "",
            canvasStyle: {
              width: document.documentElement.offsetWidth - 300 + 'px',
              height: '550px',
              display: 'block',
              'background-color': 'rgba(251,251,251,0.4)',
              filter: 'progid:DXImageTransform.Microsoft.Gradient(startColorstr=#40000000,endColorstr=#40000000)',
              margin: 'auto',
              overflow: 'visible',
              'border-radius': '20px',
              'padding-top': '50px',
            },
        }
    },
    mounted () {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.documentElement.offsetWidth;
          window.screenHeight = document.documentElement.clientHeight;
          that.screenWidth = window.screenWidth;
          that.screenHeight = window.screenHeight
        })()
      }
    },
    watch: {
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.timer = false
          }, 400)
        }
      },
      screenHeight (val) {
        if (!this.timer) {
          this.screenHeight = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.timer = false;
          }, 400)
        }
      }
    },
    methods:{
      switchCategoryChange(pageTitle, mainUuid, subUuid = ''){
        this.articleUuid = "";
        this.mainCategoryUuid = mainUuid;
        this.subCategoryUuid = subUuid;
        this.pageTitle = pageTitle;
        this.canvasStyle = {
          width: document.documentElement.offsetWidth - 300 + 'px',
          height: '550px',
          display: 'block',
          'background-color': 'rgba(251,251,251,0.4)',
          filter: 'progid:DXImageTransform.Microsoft.Gradient(startColorstr=#40000000,endColorstr=#40000000)',
          margin: 'auto',
          overflow: 'visible',
          'border-radius': '20px',
          'padding-top': '50px',
          'transition':'height 0.5s',
          '-moz-transition': 'height 0.5s', /* Firefox 4 */
          '-webkit-transition': 'height 0.5s', /* Safari 和 Chrome */
          '-o-transition': 'height 0.5s', /* Opera */
        };
        // console.log(this.$refs);
        this.$refs.articleList.flushArticleSummaryList(mainUuid, subUuid, 1, 20);
      },
      switchArticleItem(articleUuid){
        this.articleUuid = articleUuid;
        this.canvasStyle = {
          width: document.documentElement.offsetWidth - 200 + 'px',
          height: this.screenHeight + 'px',
          display: 'block',
          'background-color': 'rgba(251,251,251,0.4)',
          filter: 'progid:DXImageTransform.Microsoft.Gradient(startColorstr=#40000000,endColorstr=#40000000)',
          margin: 'auto',
          overflow: 'visible',
          // 'padding-top': '50px',
          'transition':'height 0.5s',
          '-moz-transition': 'height 0.5s', /* Firefox 4 */
          '-webkit-transition': 'height 0.5s', /* Safari 和 Chrome */
          '-o-transition': 'height 0.5s', /* Opera */
        };
      }
    },
}
</script>

<style scoped>
.content-framework{
  background-color: #DBC7A6;
  float: left;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list-area{
  height: 550px;
  margin: auto;
}
</style>
