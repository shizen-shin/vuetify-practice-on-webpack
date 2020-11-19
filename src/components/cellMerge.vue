<template>
  <div>
    <div class="mb-3">
      <template v-for="(command, key) in cellCommands">
        <VrNormalBtn
          :key="key"
          :disabled="!command.isActive({ selectedCells, maxColNum, rows: innerValue })"
          @click="onClickButton(command)"
          :command="command"
          />
      </template>
    </div>
    <div class="v-data-table theme--light">
      <div class="v-data-table__wrapper">
        <table>
          <tr>
            <td v-for="(col, idx) in innerCols" 
            :key="idx"
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
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import { VrMixinFormControl} from "vuetify-resources"
import VrNormalBtn from "./VrNormalBtn"
import TableCol from "./Col"
import cellCommands from "./cellMergeCommands"

export default {
  name: "VrTable",
  // mixins: [VrMixinFormControl],
  props: {
    value: { type: [String, Number, Array] },
    disabled: { type: Boolean, default: false },
    thPosition: { type: String },
    cols: { type: Array, default: () => [] }, //mr-devは[]のみ
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
  },
  data(){
    return{
      selectedCells: [],
      cellCommands: cellCommands,
    }
  },
  watch:{
    thPosition(val){
      if(val == 'row') this.changeRowTh()
      if(val == 'col') this.changeColTh()
      if(val == 'none') this.changeNoneTh()
    },
  maxColNum:{
      handler(){
        let cols = this.innerCols || []
        let diff = this.innerCols.length - this.maxColNum

        //列追加の場合
        if (diff < 0) {
          diff = Math.abs(diff)
          for (let step = 0; step < diff; step++) {
            cols = [
              ...cols,
              {width: 'dummy'},
            ]
          }
        //列削除の場合
        } else if (diff > 0) {
          cols = cols.slice(0, this.maxColNum)
        }
        
        this.innerCols = cols.map(col => ({
            ...col,
            width: Math.round( 100 / cols.length) + '%',
          }))
      }
    }
  },
  methods:{
    onInnerColChange(e) {
      this.innerCols = [...this.innerCols]
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
        case 'clearSelects':
          this.clearSelects()
        default:


          // const {
          //   cols,
          //   rows,
          //   selectedCells,
          // } = command.onClick({
          //   selectedCells: this.selectedCells,
          //   maxColNum: this.maxColNum,
          //   cols: this.innerCols,
          //   rows: this.innerValue,
          // })

          // this.innerCols = cols
          // this.innerValue = rows
          // this.selectedCells = selectedCells
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

      if(this.selectedCells.length != 1) {
        return
      }

      this.innerValue = this.innerValue.map((tr, index) => {
        let newCell
        if (this.thPosition == 'row' && index === 0) {
          newCell = this.initTh
        } else {
          newCell = this.initTd
        }

        return {
          ...tr,
          article_items: [
            ...tr.article_items.slice(0, cellIndex + 1),
            ...[newCell],
            ...tr.article_items.slice(cellIndex + 1),
          ]
        }
      })

      this.selectedCells = this.selectedCells.map((cell)=>{
        const {cellIndex: cCellIndex} = cell
        if(cCellIndex > cellIndex){
          return {
            ...cell,
            cellIndex: cCellIndex + 1
          }
        }else {
          return cell
        }
      })
    },
    addColumnBefore(){
      const cellIndex = this.startCell.cellIndex

      if( this.selectedCells.length != 1) {
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

      this.selectedCells = this.selectedCells.map((cell)=>{
        const {cellIndex: cCellIndex} = cell
        if(cCellIndex >= cellIndex){
          return {
            ...cell,
            cellIndex: cCellIndex + 1
          }
        } else {
          return cell
        }
      })
    },
    removeColumn(){
      const cellIndicesToRemove = new Set(
        this.selectedCells.map((cell) => cell.cellIndex)
      )

      if(cellIndicesToRemove.size == this.maxColNum) {
        return
      }

      this.innerValue = this.innerValue.map((row) => {
        return {
          ...row,
          article_items: row.article_items.filter((cells, cellIndex)=> 
            !cellIndicesToRemove.has(cellIndex)
          )
        }
      })

      this.selectedCells = []
    },
    addRowAfter(){
      const rowIndex = this.startCell.rowIndex
      
      if(this.selectedCells.length != 1) {
        return
      }
      
      this.innerValue = [
        ...this.innerValue.slice(0, rowIndex + 1),
        ...[this.getTr()],
        ...this.innerValue.slice(rowIndex + 1),
      ]

      this.selectedCells = this.selectedCells.map((cell) => {
        const { rowIndex: cRowIndex } = cell
        if (cRowIndex > rowIndex){
          return {
            ...cell,
            rowIndex:  cRowIndex + 1,
          }
        } else {
          return cell
        }
      })
    },
    addRowBefore(){
      const rowIndex = this.startCell.rowIndex
      
      if(this.selectedCells.length != 1) {
        return
      }
      this.innerValue = [
        ...this.innerValue.slice(0, rowIndex),
        ...[this.getTr()],
        ...this.innerValue.slice(rowIndex),
      ]
      
      this.selectedCells = this.selectedCells.map((cell) => {
        const { rowIndex: cRowIndex } = cell
        if (cRowIndex >= rowIndex){
          return {
            ...cell,
            rowIndex:  cRowIndex + 1,
          }
        } else {
          return cell
        }
      })
    },
    removeRow(){
      const rowIndicesToRemove = new Set(
        this.selectedCells.map((cell)=> cell.rowIndex)
      )
  
      if(rowIndicesToRemove.size == this.innerValue.length) return

      this.innerValue = this.innerValue.filter((row, rowIndex)=> 
        !rowIndicesToRemove.has(rowIndex)
      )

      this.selectedCells = []
    },
    clearSelects(){
      this.selectedCells = []
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
}

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