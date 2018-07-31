<template>
    <div class="index-item">
      <div class="main-item">
        {{itemName}}
      </div>
      <div v-if="clickDown" class="item-list">
        <div class="item-name" v-for="item in itemList" :key="item">
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
            {id: '1-1', title: 'PHP'},
            {id: '1-2', title: 'MySQL'},
            {id: '1-3', title: 'Linux'},
            {id: '1-4', title: 'Nginx'}
          ]
        }
        case 2:{
          return [
            {id: '2-1', title: '被讨厌的勇气'},
            {id: '2-2', title: '原则'},
          ]
        }
        case 3:{
          return [
            {id: '3-1', title: '2018年'},
            {id: '3-2', title: '2019年'},
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
