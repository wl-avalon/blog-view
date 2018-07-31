<template>
  <div id="editor">
    <mavon-editor class='mavon' style="height: 100%" @save="$save" @imgAdd="$imgAdd" ref=md v-bind='props'></mavon-editor>
  </div>
</template>

<script>
var mavonEditor = require("mavon-editor");
import "mavon-editor/dist/css/index.css";
export default {
  name: "CreateArticle",
  components: {
    "mavon-editor": mavonEditor.mavonEditor
  },
  methods: {
    $save(str1, str2) {
      console.log(str1);
      console.log(str2);
    },
    $imgAdd(pos, $file) {
      console.log(pos);
      let $vm = this.$refs.md;
      $vm.$img2Url(pos, "asdasd");
    }
  },
  data() {
    return {
      props: {
        value: "# /innerapi/billing/queryDebtByCreditorAndOrderProductUuid",
        defaultOpen: "preview",
        editable: false,
        toolbarsFlag: false,
        subfield: false,
      }
    };
  }
};
</script>

<style scoped>
#editor {
  margin: 100px auto;
  width: 80%;
  height: 580px;
}

.mavon{
  background-color: rgba(251, 251, 251, 0.5);
}
</style>
