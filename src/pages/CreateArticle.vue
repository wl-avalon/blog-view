<template>
  <div>
    <div class="category-switch">
      <div class="main-category">
        <p class="main-category-title">主类别：</p>
        <div class="main-category-switch">
          <select v-model="selectMain">
            <option disabled value=-1>请选择</option>
            <option v-for="(mainCategory, index) in mainCategoryList" v-bind:value="index" v-bind:key="index">
              {{mainCategory.title}}
            </option>
          </select>
        </div>
      </div>
      <div class="sub-category">
        <p class="sub-category-title">副类别：</p>
        <div class="sub-category-switch">
          <select v-model="selectSub">
            <option disabled value=-1>请选择</option>
            <option v-for="(subCategory, index) in subCategoryList" v-bind:value="index" v-bind:key="index">
              {{subCategory.title}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="article-title-area">
      <div class="article-title">
        <div class="article-title-tag">标题：</div>
        <input class="title-input" v-model="articleTitle">
      </div>
    </div>
    <div id="editor">
      <mavon-editor class='mavon' style="height: 100%" @save="$save" @imgAdd="$imgAdd" ref=md  :externalLink="externalLink" v-bind='propsParams'></mavon-editor>
    </div>
  </div>
</template>

<script>
var mavonEditor = require("mavon-editor");
var qs = require('qs');
import "mavon-editor/dist/css/index.css";
export default {
  name: "CreateArticle",
  components: {
    "mavon-editor": mavonEditor.mavonEditor
  },
  data() {
    return {
      propsParams: {
        value: "# 看看汉字效果怎么样\n ## innerapi/billing/queryDe"
      },
      externalLink: {
        markdown_css: function() {
          return "https://www.wl-avalon.com/static/css/markdown.css";
        }
      },
      selectMain: -1,
      selectSub: -1,
      articleTitle: "",
      mainCategoryList: [],
      subCategoryList: [],
    };
  },
  created () {
    this.queryMainCategoryRecordList();
  },
  watch: {
    selectMain (val){
      this.querySubCategoryRecordList(this.mainCategoryList[val].uuid);
    }
  },
  methods: {
    $save(str1, str2) {
      if(this.selectMain === -1 || this.selectSub === -1) {
        alert("选择主副分类");
        return;
      }
      if(str1 === "" || this.articleTitle === ""){
        alert("内容及标题不能为空");
      }
      let that = this;
      let params = {
        "mainUuid": this.mainCategoryList[that.selectMain].uuid,
        "subUuid": this.subCategoryList[that.selectSub].uuid,
        "title": this.articleTitle,
        "content": str1,
      }
      this.$http({
        method: "post",
        url: "http://127.0.0.1:8000/blog/outer/commit/addArticle",
        data: qs.stringify(params),
      }).then(function (response) {
              if(!response.data || !response.data.error || response.data.error.returnCode === undefined || response.data.error.returnCode != 0){
                console.log(response);
                alert("网络繁忙,请稍后再试");
              }else{
                alert("文章创建成功");
                that.propsParams.value = "";
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
    queryMainCategoryRecordList: function(){
      let that = this;
        this.$http.get('http://127.0.0.1:8000/blog/outer/query/getMainCategoryList')
          .then(function (response) {
              if(!response.data || !response.data.error || response.data.error.returnCode === undefined || response.data.error.returnCode != 0){
                console.log(response);
                alert("网络繁忙,请稍后再试");
              }
              let mainCategoryList = response.data.data ? response.data.data : [];
              that.mainCategoryList = mainCategoryList;
          })
          .catch(function (error) {
            console.log(error);
            alert("网络繁忙,请稍后再试");
          });
    },
    querySubCategoryRecordList: function(mainUuid){
      let that = this;
        this.$http.get('http://127.0.0.1:8000/blog/outer/query/getSubCategoryList?mainUuid=' + mainUuid)
          .then(function (response) {
              if(!response.data || !response.data.error || response.data.error.returnCode === undefined || response.data.error.returnCode != 0){
                console.log(response);
                alert("网络繁忙,请稍后再试");
              }
              let subCategoryList = response.data.data ? response.data.data : [];
              that.subCategoryList = subCategoryList;
          })
          .catch(function (error) {
            console.log(error);
            alert("网络繁忙,请稍后再试");
          });
    },
  },
};
</script>

<style scoped>
.category-switch {
  width: 80%;
  margin: 50px auto;
  margin-left: 100px;
  overflow:hidden
}
.main-category {
  width: 50%;
  float: left;
  display: flex;
    text-align: center;
    justify-content: center;
}
.main-category-title{
  float: left;
}
.main-category-switch{
  margin-top: 18px;
  margin-left:20px;
}

.sub-category {
  width: 50%;
  float: left;
}
.sub-category-title{
  float: left;
}
.sub-category-switch{
  margin-top: 18px;
  margin-left:20px;
}

#editor {
  margin: 50px auto;
  width: 80%;
  height: 580px;
}

.mavon {
  background-color: rgba(251, 251, 251, 0.5);
}
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
</style>
