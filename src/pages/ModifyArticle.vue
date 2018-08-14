<template>
  <div>
    <div class="article-title-area">
      <div class="article-title">
        <div class="article-title-tag">标题：</div>
        <input class="title-input" v-model="articleTitle">
      </div>
    </div>
    <div id="editor">
      <mavon-editor class='mavon' style="height: 100%" @save="$save" @imgAdd="$imgAdd" ref=md  :externalLink="externalLink" v-bind="propsParams"></mavon-editor>
    </div>
  </div>
</template>

<script>
var mavonEditor = require("mavon-editor");
var qs = require('qs');
import "mavon-editor/dist/css/index.css";
export default {
  name: "ModifyArticle",
  components: {
    "mavon-editor": mavonEditor.mavonEditor
  },
  data () {
    return {
      propsParams:{
        value: "",
      },
      externalLink: {
        markdown_css: function() {
          return "https://www.wl-avalon.com/static/css/markdown.css";
        }
      },
      articleTitle: "",
      articleUuid: "",
      articleContent: "",
    };
  },
  created () {
    let routerParams = this.$route.params;
    let articleUuid = routerParams.articleUuid;
    this.articleUuid = articleUuid;
    this.queryArticleDetail();
  },
  methods: {
    queryArticleDetail(){
      let that = this;
      let url = "http://127.0.0.1:8000/blog/outer/query/getArticleDetail?articleUuid="+this.articleUuid;
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
    $save(str1, str2) {
      if(str1 === "" || this.articleTitle === ""){
        alert("内容和标题不能为空");
      }
      let that = this;
      let params = {
        "uuid": this.articleUuid,
        "title": this.articleTitle,
        "content": str1,
      }
      this.$http({
        method: "post",
        url: "http://127.0.0.1:8000/blog/outer/commit/modifyArticle",
        data: qs.stringify(params),
      }).then(function (response) {
              if(!response.data || !response.data.error || response.data.error.returnCode === undefined || response.data.error.returnCode != 0){
                console.log(response);
                alert("网络繁忙,请稍后再试");
              }else{
                alert("文章修改成功");
              }
          })
          .catch(function (error) {
            console.log(error);
            alert("网络繁忙,请稍后再试");
            });
    },
    $imgAdd(pos, $file) {
      let $vm = this.$refs.md;
      let formdata = new FormData();
      formdata.append('image', $file);
      this.$http({
        url: "http://127.0.0.1:8000/blog/outer/commit/uploadImg",
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(function (response) {
        if(!response.data || !response.data.error || response.data.error.returnCode === undefined || response.data.error.returnCode != 0){
          console.log(response);
          alert("网络繁忙,请稍后再试");
        }else{
          let imageUrl = response.data.data.imgUrl ? response.data.data.imgUrl : "";
          if(imageUrl === ""){
            alert("上传失败,图片地址为空");
          }else{
            alert("上传成功，图片地址为：" + imageUrl);
            $vm.$img2Url(pos, imageUrl);
          }
        }
      }).catch(function (error) {
          console.log(error);
          alert("网络繁忙,请稍后再试");
      });
    },
  },
}
</script>

<style scoped>
.article-title-area{
  height: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
.article-title{
  margin:auto;
  font-size: 20px;
}
.article-title-tag{
  float: left;
}
.title-input{
  width:500px;
  margin:auto;
  font-size: 20px;
  float: left;
}
#editor{
  width: 95%;
  height: 900px;
  margin: auto;
}
.mavon {
  background-color: rgba(251, 251, 251, 0.5);
}
</style>
