<template>
  <v-app>
    <v-main>
      <v-container fluid>

        <VrTable
          v-model="rows"
          :cols="cols"
          @updateCols="onUpdateCols"/>

      
      </v-container>
    </v-main>

    <v-footer app>
      
    </v-footer>
  </v-app>
</template>

<script>
import VrTable from './VrTable'

export default {
  name: "App",
  components:{
    VrTable,
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