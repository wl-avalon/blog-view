<template>
<div>
    <banner v-bind:screenHeight="screenHeight"></banner>
    <div class="content-framework" v-bind:style="{ width: screenWidth - 200 + 'px',height: screenHeight + 'px'}">
    </div>
</div>
</template>

<script>
import Banner from "@/components/Banner";
export default {
    name: "PageContainer",
    components: {
        Banner: Banner,
    },
    data(){
        return {
            screenWidth: document.documentElement.offsetWidth,
            screenHeight: document.documentElement.clientHeight,
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
</style>
