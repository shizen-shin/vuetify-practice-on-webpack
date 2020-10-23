<template>
  <div>
    <div class="mb-3">
      <template v-for="(command, key) in cellCommands">
        <VrNormalBtn
          :key="key"
          :disabled="disabled"
          @click="onClickButton(command)"
          :command="command"
          />
      </template>
    </div>
    <div class="v-data-table theme--light">
      <div class="v-data-table__wrapper">
        <table>
          <tr>
            <td v-for="(col, idx) in innerCols" :key="idx"
              class="table-col pa-1 py-2">
              <TableCol v-model="innerCols[idx]"
                @change="onInnerColChange"/>
            </td>
          </tr>
        </table>

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
    </div>
  </div>
</template>

<script>
// import { VrMixinFormControl} from "vuetify-resources"
import VrNormalBtn from "./VrNormalBtn"
import TableCol from "./Col"

export default {
  name: "VrTable",
  // mixins: [VrMixinFormControl],
  props: {
    value: { type: [String, Number, Array] },
    disabled: { type: Boolean, default: false },
    thPosition: { type: String },
    //colsはどの親から？コメントアウト。
    cols: { type: Array, default: () => [] },
  },
  components: {
    VrNormalBtn,
    TableCol,
  },
  computed: {
    startCell() {
      return this.selectedCells[0] || {}
    },
    maxColNum(){
      return this.innerValue.reduce((max, tr) => {
        if(tr && tr.article_items && tr.article_items.length > max){
          return tr.article_items.length
        }else{
          return max
        }
      }, 0)
    },
    innerCols:{
      get(){
        return this.cols
      },
      set(val){
        this.$emit("updateCols", val)
      }
    },
    innerValue:{
      get(){
        return this.value
      },
      set(val){
        this.$emit("input", val)
      }
    },
    initTh(){
      return {
        item_type: 'TYPE_TH',
        active: true,
        article_items: [],
      }
    },
    initTd(){
      return {
        item_type: 'TYPE_TD',
        active: true,
        article_items: [],
      }
    },
    // cols: {
    //   get() {
    //     const { cols } = this.colgroup || {}
    //     return cols || []
    //   },
    //   set(val) {
    //     this.colgroup = {
    //       ...this.colgroup,
    //       cols: val,
    //     }
    //   }
    // }
  },
  data(){
    return{
      selectedCells: [],
      //簡略化のため一つに絞る
      cellCommands:[
        { cmd: 'addColumnBefore', text:"左に列追加", icon: 'mdi-table-column-plus-before' },
        { cmd: 'addColumnAfter', text:"右に列追加", icon: 'mdi-table-column-plus-after' },
        { cmd: 'removeColumn', text:"列削除", icon: 'mdi-table-column-remove', color: 'error' },
        { cmd: 'addRowAfter', text:"下に行追加", icon: 'mdi-table-row-plus-after' },
        { cmd: 'addRowBefore', text:"上に行追加", icon: 'mdi-table-row-plus-before' },
        { cmd: 'removeRow', text:"行削除", icon: 'mdi-table-row-remove', color: 'error' },
      ],
    }
  },
  watch:{
    thPosition(val){
      if(val == 'row') this.changeRowTh()
      if(val == 'col') this.changeColTh()
      if(val == 'none') this.changeNoneTh()
    },
  },
  methods:{
    onInnerColChange(e) {
      this.innerCols = [...this.innerCols]
    },
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
    onClickButton(command){
      switch(command.cmd){
        case 'addColumnAfter':
          this.addColumnAfter()
          break
        case 'addColumnBefore':
          this.addColumnBefore()
          break
        case 'removeColumn':
          this.removeColumn()
          break
        case 'addRowAfter':
          this.addRowAfter()
          break
        case 'addRowBefore':
          this.addRowBefore()
          break
        case 'removeRow':
          this.removeRow()
          break
      }
    },
    getMaxRowNum(){
      return this.innerValue.reduce((acc, tr) => {
        if(acc < tr.article_items.length){
          return tr.article_items.length
        }else{
         return acc
        }
      }, 0);
    },
    getTr(){
      const maxRowNum = this.getMaxRowNum()
      let tr = []
      
      if(this.thPosition == 'col'){
        for(var i = 0; i < maxRowNum; i++) {
          if(i === 0){
            tr = [...tr, this.initTh]
          }else{
            tr = [...tr, this.initTd]
          }
        }
      }else{
        for(var i = 0; i < maxRowNum; i++) {
          tr = [...tr, this.initTd]
        }
      }
      return {
        item_type: 'TYPE_TR',
        active: true,
        article_items: tr,
      }
    },
    addColumnAfter(){
      const cellIndex = this.startCell.cellIndex

      if(!Number.isInteger(cellIndex)) {
        return
      }

      this.innerValue = this.innerValue.map((tr, index) => {
        let newCell
        if(this.thPosition == 'row' && index === 0){
          newCell = this.initTh
        }else{
          newCell = this.initTd
        }
        tr.article_items = [
          ...tr.article_items.slice(0, cellIndex + 1),
          ...[newCell],
          ...tr.article_items.slice(cellIndex + 1),
        ]
        return tr
      })

      this.setCorrectColNum(true)
    },
    addColumnBefore(){
      const cellIndex = this.startCell.cellIndex

      if(!Number.isInteger(cellIndex)) {
        return
      }

      this.innerValue = this.innerValue.map((tr, index) => {
        let newCell
        if(this.thPosition == 'row' && index === 0){
          newCell = this.initTh
        }else{
          newCell = this.initTd
        }
        tr.article_items = [
          ...tr.article_items.slice(0, cellIndex),
          ...[newCell],
          ...tr.article_items.slice(cellIndex),
        ]
        return tr
      })

      this.setCorrectColNum(true)
    },
    removeColumn(){
      const cellIndex = this.startCell.cellIndex

      if(!Number.isInteger(cellIndex)) {
        return
      }

      this.innerValue = this.innerValue.map(tr => {
        tr.article_items = [
          ...tr.article_items.slice(0, cellIndex),
          ...tr.article_items.slice(cellIndex + 1),
        ]
        return tr
      })
      
      this.setCorrectColNum(true)
    },
    addRowAfter(){
      const rowIndex = this.startCell.rowIndex
      if(!Number.isInteger(rowIndex)) return
      this.innerValue = [
        ...this.innerValue.slice(0, rowIndex + 1),
        ...[this.getTr()],
        ...this.innerValue.slice(rowIndex + 1),
      ]
    },
    addRowBefore(){
      const rowIndex = this.startCell.rowIndex
      if(!Number.isInteger(rowIndex)) return
      this.innerValue = [
        ...this.innerValue.slice(0, rowIndex),
        ...[this.getTr()],
        ...this.innerValue.slice(rowIndex),
      ]
    },
    removeRow(){
      const rowIndex = this.startCell.rowIndex
      if(!Number.isInteger(rowIndex)) return
      this.innerValue = [
        ...this.innerValue.slice(0, rowIndex),
        ...this.innerValue.slice(rowIndex + 1),
      ]
      //this.innerValue = this.innerValue.filter((tr, rowKey) => rowKey !== rowIndex)
    },
    clickCell(event){
      const cell = event.target
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
    },
    changeRowTh(){
      this.innerValue = this.innerValue.map((tr, rowKey) => {
        if(rowKey === 0){
          tr.article_items = tr.article_items.map((cell, cellKey) => {
            cell['item_type'] = 'TYPE_TH'
            return cell
          })
        }else{
          tr.article_items = tr.article_items.map((cell, cellKey) => {
            cell['item_type'] = 'TYPE_TD'
            return cell
          })
        }
        return tr
      })
    },
    changeColTh(){
      this.innerValue = this.innerValue.map((tr, rowKey) => {
          tr.article_items = tr.article_items.map((cell, cellKey) => {
            if(cellKey === 0){
              cell['item_type'] = 'TYPE_TH'
            }else{
              cell['item_type'] = 'TYPE_TD'
            }
            return cell
          })
        return tr
      })
    },
    changeNoneTh(){
      this.innerValue = this.innerValue.map((tr, rowKey) => {
          tr.article_items = tr.article_items.map((cell, cellKey) => {
            cell['item_type'] = 'TYPE_TD'
            return cell
          })
        return tr
      })
    },
    isActive(rowIndex, cellIndex) {
      return this.selectedCells.findIndex((x) =>
        rowIndex == x.rowIndex && cellIndex == x.cellIndex
      ) > -1
    },
  }
};
</script>

<style lang="scss" scoped>
table{
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