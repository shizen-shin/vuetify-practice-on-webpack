<template>
    <div>
      <table border="1px">
        <tr>
          <component :is="'th'" v-bind= "{width: Width,  conspan: colSpan, rowspan: rowSpan }">
            テスト
          </component>
        </tr>
      </table>
    </div>
</template>

<script>
import  TmpAddColumn from  './TmpAddColumn'

export default {
  components: {
    TmpAddColumn,
  },
  data(){
    return {
      assignTemplate: "tmp-add-column",
      colSpan: 3,
      rowSpan: 2
    }
  }
}
</script>

<style>
 table {
   border: 1px, solid, black;
 }
</style>