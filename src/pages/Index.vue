<template>
<div>
    <banner v-bind:screenHeight="screenHeight"></banner>
    <div>
        <div class="content-framework" v-bind:style="{ width: screenWidth - 200 + 'px',height: screenHeight + 'px'}">
            <div class="content-canvas" v-bind:style="{ width: screenWidth - 300 + 'px'}">
                <article-list v-bind:pageIndex="pageIndex" v-bind:screenWidth="screenWidth"></article-list>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Banner from "@/components/Banner/Banner";
import ArticleList from "@/components/ArticleList";
export default {
    name: "Index",
    components: {
        Banner: Banner,
        'article-list': ArticleList,
    },
    data(){
        return {
            screenWidth: document.documentElement.offsetWidth,
            screenHeight: document.documentElement.clientHeight,
            pageIndex: "index",
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
    }
}
</script>

<style scoped>
.content-framework{
  background-color: #DBC7A6;
  float: left;
  overflow: auto;
}

.content-canvas{
  height: 550px;
  background-color:rgba(255,255,255,0.5);
  filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#40000000,endColorstr=#40000000);
  margin: 80px auto auto auto;
  overflow: visible;
  border-radius: 20px;
  padding-top: 50px;
}

.list-area{
  height: 550px;
  margin: auto;
}
</style>
