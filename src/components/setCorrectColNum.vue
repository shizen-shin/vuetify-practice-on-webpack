<template>
  <div class="v-data-table theme--light">
      <div class="v-data-table__wrapper">
        <table>
          <tr>
            <td v-for="(col, idx) in innerCols" 
            :key="idx"
            class="table-col pa-1 py-2">
              <TableWidth v-model="innerCols[idx]" />
            </td>
          </tr>
        </table>

        <br>
        <p>innerCols: {{innerCols}}</p>
        <p>cols: {{cols}}</p>

        <!-- <table>
          <template v-for="(tr, rowkey) in innerValue">
            <tr :key="rowkey" v-if="tr.item_type == 'TYPE_TR'">
              <template v-for="(cell, cellkey) in tr.article_items">
                <th 
                  :key="cellkey"
                  v-if="cell.item_type == 'TYPE_TH'" 
                  :class="{'is-active': isActive(rowkey, cellkey),}"
                  @click="clickCell($event)">
                  <br/>
                </th>
                <td 
                  :key="cellkey" 
                  v-else-if="cell.item_type == 'TYPE_TD'"
                  :class="{'is-active': isActive(rowkey, cellkey),}"
                  @click="clickCell($event)">
                  <br/>
                </td>
              </template>
            </tr>
          </template>
        </table> -->
      </div>
    </div>
</template>

<script>
import TableWidth from "./setCorrectColNum2"

export default {
  components:{
    TableWidth
  },
  data(){
    return{
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
    }
  },
  computed:{
    innerCols:{
      get(){
        return this.cols
      },
      set(cols){
        this.cols = cols
      }
    }
  },
  methods:{
    // onInnerColChange(e) {
    //   this.innerCols = [...this.innerCols]
    // },
    setCorrectColNum(updateWidths=false) {
      let cols = this.innerCols || []
      const currentColNum = this.innerCols.length
      let diff = currentColNum - this.maxColNum
      if (diff < 0) {
        diff = Math.abs(diff)
        for (let step = 0; step < diff; step++) {
          cols = [
            ...cols,
            {width: 'auto'},
          ]
        }
      } else if (diff > 0) {
        cols = cols.slice(0, this.maxColNum)
      }

      if (updateWidths) {
        cols = cols.map(col => ({
          ...col,
          width: Math.round( 100* 1 / cols.length) + '%',
        }))
      }

      this.innerCols = cols
    },
  }
}
</script>