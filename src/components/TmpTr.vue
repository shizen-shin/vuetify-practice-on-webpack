<template>
  <div>
    <p>TmpTr.vue</p>

    <table>
      <template v-for="(tr, rowkey) in innerValue">
        <tr :key="rowkey" v-if="tr.item_type == 'TYPE_TR'">
          <template v-for="(cell, cellkey) in tr.article_items">
            <th 
              :key="cellkey"
              v-if="cell.item_type == 'TYPE_TH'"
              :class="{'is-active': isActive(rowkey, cellkey)}"
              @click="clickCell($event)">
              <br/>
            </th>
            <td 
              :key="cellkey" 
              v-else-if="cell.item_type == 'TYPE_TD'"
              :colspan="cell.colspan || 1"
              :rowspan="cell.rowspan || 1"
              :class="{'is-active': isActive(rowkey, cellkey)}"
              @click="clickCell($event)">
              <br/>
            </td>
          </template>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      innerValue: [
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
  methods:{
    isActive(){
      return true
    },
    clickCell(ev){
        console.log(ev.target)
        console.log(ev.target.parentNode)

        const cell = ev.target
        const tr = event.target.parentNode

        if (this.isActive(tr.rowIndex, cell.cellIndex)){
          const idx = this.selectedCells.findIndex((x) =>
            tr.rowIndex == x.rowIndex && cell.cellIndex == x.cellIndex
          );

          this.selectedCells = [
            ...this.selectedCells.slice(0, idx),
            ...this.selectedCells.slice(idx + 1),
          ]
        } else {
          this.selectedCells = [
            ...this.selectedCells,
            {
              rowIndex: tr.rowIndex,
              cellIndex: cell.cellIndex
            }
          ]
        }
      }
    }
}
</script>

<style lang="scss" scoped>
table{
  width: 80%;
  th, td{
    user-select: auto;
    border: thin solid rgba(0, 0, 0, 0.12);
  }
  th{
    background: #ccc;
  }
  th, td{
    &.is-active{
      border: 1px double #0098f7;
    }
  }
  
}
.table-col {
  border: none;
}
</style>