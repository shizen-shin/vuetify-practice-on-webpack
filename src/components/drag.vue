<template>
  <div>
    <p>〜TmpAddRow.vue〜</p>
    <button @click="clear">選択解除</button>
    <br>

    <table
      @mousedown="mouseDown"
      @mouseup="mouseUp"
      @mousemove="mouseMove"
      @click="clickCell"
      >
      <template v-for="(tr, rowIndex) in rows">
        <tr :key="rowIndex">
          <template v-for="(cell, cellIndex) in tr.table_cells">
            <td :key="cellIndex" 
                :class="{'is-active': isActive(rowIndex, cellIndex)}"
                :rowspan="cell.rowspan || 1"
                :colspan="cell.colspan || 1"
                >
              ( {{rowIndex}} , {{cellIndex}} )
            </td>
          </template>
        </tr>
      </template>
    </table>

    <br>
    <p>currentCells : {{currentCells}}</p>

  </div>
</template>

<script>
import {scanTable} from "./scantable"

export default {
  data(){
    return{
      currentCells:[],
      // Drag
      startCell:[],
      endCell:[],
      isDrag: false,
      rows: [
        {
          "table_cells": [
            {
              "cell_type": "TD",
              "rowspan": 1,
              "colspan": 3,
            },
            {
              "cell_type": "TD",
              "rowspan": 1,
              "colspan": 1,
            },
            {
              "cell_type": "TD",
              "rowspan": 1,
              "colspan": 3,
            }
          ]
        },
        {
          "table_cells": [
            {
              "cell_type": "TD",
              "rowspan": 2,
              "colspan": 1,
            },
            {
              "cell_type": "TD",
              "rowspan": 1,
              "colspan": 1,
            },
            {
              "cell_type": "TD",
              "rowspan": 1,
              "colspan": 2,
            }
          ]
        },
                {
          "table_cells": [
            {
              "cell_type": "TD",
              "rowspan": 1,
              "colspan": 1,
            },
            {
              "cell_type": "TD",
              "rowspan": 1,
              "colspan": 1,
            },
            {
              "cell_type": "TD",
              "rowspan": 1,
              "colspan": 1,
            }
          ]
        },
      ]
    }
  },
  methods:{
    //セルに選択状態付与
    isActive(rowIndex, cellIndex){
      return this.currentCells.findIndex((elem) =>
        elem.rowIndex == rowIndex && elem.cellIndex == cellIndex
        ) > -1
    },
    //クリックによる選択状態の変更
    clickCell(event){
      const cell = event.target
      const tr = event.target.parentNode
      if(this.isActive(tr.rowIndex, cell.cellIndex)){
      
        const rmIndex = this.currentCells.findIndex((elem)=>
          elem.rowIndex == tr.rowIndex && elem.cellIndex == cell.cellIndex 
        )

        this.currentCells = [
          ...this.currentCells.slice(0, rmIndex),
          ...this.currentCells.slice(rmIndex + 1)
        ]

      } else{
        this.currentCells = [
          ...this.currentCells,
          {
            rowIndex: tr.rowIndex,
            cellIndex: cell.cellIndex
          }
        ]
      }
    },
    //行内の要素（セル数）の最大値を取得する（行作成用）
    getMaxCellNum(){
      return this.rows.reduce((acc, tr) => {
        if (acc < tr.table_cells.length){
          return tr.table_cells.length
        }else{
          return acc
        }
      }, 0)
    },
    clear(){
      this.currentCells = []
    },
    mouseDown(e){
      console.log("mouseDown:",e)
      this.isDrag = true
      this.startCell = {
        rowIndex: e.target.parentNode.rowIndex,
        cellIndex: e.target.cellIndex,
        rowspan: e.target.rowSpan,
        colspan: e.target.colSpan
      }
      console.log("startcell:",this.startCell)
    },
    mouseUp(e){
      console.log("mouseUp:",e)
      this.isDrag = false
    },
    mouseMove(e){
      if(this.isDrag == true && e.target.tagName != "TABLE"){
        console.log("mouseMove:",e)
        this.endCell = {
          rowIndex: e.target.parentNode.rowIndex,
          cellIndex: e.target.cellIndex,
          rowspan: e.target.rowSpan,
          colspan: e.target.colSpan
        } 
      }
    }
  },
  //dragによる選択範囲の算出
  computed:{
    colIndicies(){
      return scanTable( this.rows )
    }
  },
  watch:{
    endCell(){
      this.currentCells = [this.startCell]

      // 基点となるrowとcol (scanTableから算出　※結合状況でズレる)
      let startRowIndex = this.startCell.rowIndex
      if ( startRowIndex > this.endCell.rowIndex ){
        startRowIndex = this.endCell.rowIndex
      }

      let startColIndex = this.colIndicies[this.startCell.rowIndex][this.startCell.cellIndex]
      if ( startColIndex > this.colIndicies[this.endCell.rowIndex][this.endCell.cellIndex] ){
        startColIndex = this.colIndicies[this.endCell.rowIndex][this.endCell.cellIndex]
      }

      let endRowIndex = this.startCell.rowIndex + this.startCell.rowspan - 1 
      if ( endRowIndex < this.endCell.rowIndex + this.endCell.rowspan - 1  ){
        endRowIndex = this.endCell.rowIndex + this.endCell.rowspan - 1
      }

      let endColIndex = this.colIndicies[this.startCell.rowIndex][this.startCell.cellIndex] + this.startCell.colspan - 1 
      if ( endColIndex < this.colIndicies[this.endCell.rowIndex][this.endCell.cellIndex] + this.endCell.colspan - 1 ){
        endColIndex = this.colIndicies[this.endCell.rowIndex][this.endCell.cellIndex] + this.endCell.colspan - 1
      }

      console.log("endColIndex:", endColIndex)
      
      const rowWidth = endRowIndex - startRowIndex + 1
      const colWidth = endColIndex - startColIndex + 1

      console.log("endRowColWidth:", rowWidth, colWidth)

      //対象セルの抽出
      const dragSelectedCells = () => {
        for( let i = startRowIndex; i <= endRowIndex; i++ ){
          for( let j = 0; j < this.rows[i].table_cells.length; j++ ){
            if( this.colIndicies[i][j] >= startColIndex && this.colIndicies[i][j] <= endColIndex ){
              //範囲拡張チェック
              if( i + this.rows[i].table_cells[j].rowspan - 1 > endRowIndex ){
                endRowIndex = this.rows[i].table_cells[j].rowspan
                dragSelectedCells()
              }

              if( this.colIndicies[i][j] + this.rows[i].table_cells[j].colspan - 1 > endColIndex ){
                endColIndex = this.colIndicies[i][j] + this.rows[i].table_cells[j].colspan - 1
                dragSelectedCells()
              }

              this.currentCells.push({
                rowIndex: i,
                cellIndex: j,
              })
            }
          }
        }
      }

      dragSelectedCells()
    }
  }
}
</script>

<style lang="scss" scoped>
table{
  width: 80%;
  user-select: none;
  th,td{
    border: thin solid rgba(0, 0, 0, 0.12);
    text-align: center;
    color: gray;
  }
  th{
    background: #ccc;
  }
  th, td{
    //選択状態
    &.is-active{
      border: 1px double #0098f7;
    }
  }
}
button{ 
   background: lightcoral;
   padding: 5px 20px;
   color: white;
   border-radius: 50px;
}
</style>