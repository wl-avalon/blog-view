<template>
<div>
  <div>
    <div id="editor">
      <mavon-editor class='mavon' :externalLink="externalLink" v-bind='propsParams' v-bind:style="{ height: screenHeight + 'px'}"></mavon-editor>
    </div>
  </div>
</div>  
</template>

<script>
var mavonEditor = require("mavon-editor");
import "mavon-editor/dist/css/index.css";
export default {
  name: "ArticleDetail",
  components: {
    "mavon-editor": mavonEditor.mavonEditor,
  },
  props: ["articleUuid", "screenHeight"],
  data () {
    return {
      propsParams: {
        value: "",
        editable: false,
        toolbarsFlag: false,
        subfield: false,
        defaultOpen: "preview",
      },
      externalLink: {
        markdown_css: function() {
          return "https://www.wl-avalon.com/static/css/markdown.css";
        }
      },
    };
  },
  watch: {
    articleUuid (val) {
      if (val !== "")
      this.queryArticleDetail(val);
    },
  },
  methods: {
    queryArticleDetail(articleUuid){
      let that = this;
      let url = "https://www.wl-avalon.com/blog/outer/query/getArticleDetail?articleUuid=" + articleUuid;
      this.$http.get(url)
        .then(function (response) {
          let articleDetail = response.data.data ? response.data.data : [];
          that.articleTitle = articleDetail.title;
          that.articleContent = articleDetail.content;
          that.propsParams.value = that.articleContent;
        }).catch(function (error) {
          alert("加载页面失败");
      });
    },
  },
}
</script>

<style scoped>
.mavon {
  background-color: rgba(251, 251, 251, 0);
}
</style>
