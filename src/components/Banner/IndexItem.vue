<template>
    <div class="index-item">
      <div class="main-item">
        {{itemName}}
      </div>
      <div v-if="clickDown" class="item-list">
        <div class="item-name" v-for="(item, index) in itemList" :key="index">
          {{item.title}}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "indexItem",
  props: ["id", 'clickID'],
  data () {
    return {
      itemName: this.getItemName(this.id),
      selectMain: false,
      clickDown: this.clickID === this.id,
      itemList: this.getItemList(this.id),
    }
  },
  methods:{
    getItemName: function (id){
      switch(id){
        case 1:{return "开发者畅想";}
        case 2:{return "读书笔记";}
        case 3:{return "日常随笔";}
      }
    },
    getItemList: function (id){
      switch(id){
        case 1:{
          return [
            {title: 'PHP'},
            {title: 'MySQL'},
            {title: 'Linux'},
            {title: 'Nginx'}
          ]
        }
        case 2:{
          return [
            {title: '被讨厌的勇气'},
            {title: '原则'},
          ]
        }
        case 3:{
          return [
            {title: '2018年'},
            {title: '2019年'},
          ];
        }
      }
    }
  },
  watch:{
    clickID (val) {
      this.clickDown = val === this.id;
    },
  }
}
</script>

<style scoped>
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
    transition:background-color 1s;
    -moz-transition: background-color 1s; /* Firefox 4 */
    -webkit-transition: background-color 1s; /* Safari 和 Chrome */
    -o-transition: background-color 1s; /* Opera */
  }
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
    transition:background-color 0.5s;
    -moz-transition: background-color 0.5s; /* Firefox 4 */
    -webkit-transition: background-color 0.5s; /* Safari 和 Chrome */
    -o-transition: background-color 0.5s; /* Opera */
  }
</style>
