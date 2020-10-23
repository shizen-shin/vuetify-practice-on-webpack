<template>
  <v-app>
    <v-main>
      <v-container fluid>

        <!-- <SimpleTable/> -->
        <VrTable
          v-model="rows"
          :cols="cols"
          @updateCols="onUpdateCols"/>
        <!-- <TestTable/> -->

      
      </v-container>
    </v-main>

    <v-footer app>
      
    </v-footer>
  </v-app>
</template>

<script>
//test
import TestTable from './TestTable'
import VrTable from './VrTable'
import SimpleTable from './SimpleTable'

export default {
  name: "App",
  components:{
    //test用
    TestTable,
    VrTable,
    SimpleTable,
  },
  data() {
    return {
      cols: [
        {
          width: '33%',
        },
        {
          width: '33%',
        },
        {
          width: '33%',
        },
      ],
      rows: [
        {
          "active": true,
          "item_type": "TYPE_TR",
          "article_items": [
            { "active": true, "item_type": "TYPE_TD", "rowspan": 3, "article_items": [] },
            { "active": true, "item_type": "TYPE_TD", "article_items": [] },
            { "active": true, "item_type": "TYPE_TD", "article_items": [] }
          ]
        },
        {
          "active": true,
          "item_type": "TYPE_TR",
          "article_items": [
            //{ "active": true, "item_type": "TYPE_TD", "article_items": [] },
            { "active": true, "item_type": "TYPE_TD", "colspan": 2, "article_items": [] },
            //{ "active": true, "item_type": "TYPE_TD", "article_items": [] }
          ]
        },
        {
          "active": true,
          "item_type": "TYPE_TR",
          "article_items": [
            //{ "active": true, "item_type": "TYPE_TD", "article_items": [] },
            { "active": true, "item_type": "TYPE_TD", "article_items": [] },
            { "active": true, "item_type": "TYPE_TD", "article_items": [] }
          ]
        },
      ]
    }
  },
  methods: {
    onUpdateCols(cols) {
      this.cols = cols
    },
  }
}
</script>

<style scoped>
</style>