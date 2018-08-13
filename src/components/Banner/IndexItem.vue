<template>
    <div class="index-item">
      <div v-if="clickDown" class="item-list">
        <div class="item-name" v-for="(item, index) in subCategoryList" :key="index" @click="clickSubIndex(item.uuid, item.title)">
          {{item.title}}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "indexItem",
  props: ["id", "clickID", "title"],
  data () {
    return {
      selectSubIndex: 0,
      clickDown: this.clickID === this.id,
      subCategoryList: [],
    }
  },
  created () {
    this.querySubCategoryList();
  },
  methods:{
    querySubCategoryList(){
        let that = this;
        let url = "http://127.0.0.1:8000/blog/outer/query/getSubCategoryList?mainUuid=" + this.id;
        this.$http.get(url)
          .then(function (response) {
            let subCategoryList = response.data.data ? response.data.data : [];
            that.subCategoryList = subCategoryList;
          })
          .catch(function (error) {
            that.subCategoryList = [];
          });
      },
      clickSubIndex(subUuid, title){
        this.$emit('changeSubIndex', this.id, subUuid, title);
      },
  },
  watch:{
    clickID (val) {
      this.clickDown = val === this.id;
    },
  }
}
</script>

<style scoped>
  .item-list{
    background-color: #27353D;
  }

  .item-name{
    height: 40px;
    font-size: 12px;
    color:#ffffff;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
  .item-name:hover{
    background-color: #2A2829;
    transition:background-color 0.2s;
    -moz-transition: background-color 0.2s; /* Firefox 4 */
    -webkit-transition: background-color 0.2s; /* Safari 和 Chrome */
    -o-transition: background-color 0.2s; /* Opera */
  }
</style>
