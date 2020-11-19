<template>
  <div>
    <p>〜TmpAddRow.vue〜</p>
    <p>currentCells : {{currentCells}}</p>
    <p>
      <button
        @click="addRowAfter"
      >下に行を追加
      </button>
      <button
        @click="addRowBefore"
      >上に行を追加
      </button>
    </p>

    <table>
      <template v-for="(tr, rowIndex) in rows">
        <tr :key="rowIndex">
          <template v-for="(cell, cellIndex) in tr.table_cells">
            <th :key="cellIndex" 
                v-if="cell.cell_type == 'TH'"
                :class="{'is-active': isActive(rowIndex, cellIndex)}"
                @click="clickCell($event)">
              ( {{rowIndex}} , {{cellIndex}} )
            </th>
          
            <td :key="cellIndex" 
                v-else-if="cell.cell_type == 'TD'"
                :class="{'is-active': isActive(rowIndex, cellIndex)}"
                @click="clickCell($event)">
              <input type="text">
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
      currentCells:[],
      rows: [
        {
          "table_cells": [
            {"cell_type": "TD"},
            {"cell_type": "TD"},
            {"cell_type": "TD"},
          ]
        },
        {
          "table_cells": [
            {"cell_type": "TD"},
            {"cell_type": "TD"},
            {"cell_type": "TD"},
          ]
        },
      ]
    }
  },
  methods:{
    //isActiveの判定
    //currentCellsの中にあればtrueにする
    //指定した行列番号の要素がある＝数値が-1以外ならtrueにする。
    isActive(rowIndex, cellIndex){
      return this.currentCells.findIndex((elem) =>
        elem.xxxrowIndex == rowIndex && elem.xxxcellIndex == cellIndex
        ) > -1
    },

    clickCell(event){
      //クリックされたセルの情報
      const cell = event.target
      const tr = event.target.parentNode

      //クリックされたセルが既に選択されている場合は、配列から削除する
      if(this.isActive(tr.rowIndex, cell.cellIndex)){
        
        //選択中の配列の何番目の要素かを求める
        const rmIndex = this.currentCells.findIndex((elem)=>
          elem.xxxrowIndex == tr.rowIndex && elem.xxxcellIndex == cell.cellIndex 
        )

        //選択した要素を選択中の配列から削除する
        this.currentCells = [
          ...this.currentCells.slice(0, rmIndex),
          ...this.currentCells.slice(rmIndex + 1)
        ]

      } else{
        this.currentCells = [
          ...this.currentCells,
          {
            xxxrowIndex: tr.rowIndex,
            xxxcellIndex: cell.cellIndex
          }
        ]
      }
    },
    addRowAfter(){
      //現在選択中のセルの行番号を取得（複数選択の場合は最初の行）
      let addRowIndex = this.rows.length
      
      if(this.currentCells.length != 0){
          addRowIndex = this.currentCells[0].xxxrowIndex
        }

      
      this.rows.splice(1, 0, this.createTr())

      //選択中の要素をずらす
      for (let currentCell of this.currentCells){
        if (currentCell.xxxrowIndex > addRowIndex){
          currentCell.xxxrowIndex += 1
        }
      } 
    },
    addRowBefore() {
      //現在選択中のセルの行番号を取得（複数選択の場合は最初の行）
      //選択なしの場合は一番上を基準とする
      let addRowIndex = 0
      
      if(this.currentCells.length != 0){
        addRowIndex = this.currentCells[0].xxxrowIndex
      }

      this.rows.splice(addRowIndex, 0, this.createTr())

      const rowsToInsert = new Set(
        this.currentCells.map(cell => cell.rowIndex )
      )
      
      this.rows = this.rows.map((row) => {
        if (rowsToInsert.has(row.rowIndex)) {
          return [ this.createTr(), row ]
        } else {
          return [ row ]
        }
      }).reduce((list, rows) => {
        return list.concat(rows)
      }, [])

      //選択中の要素をずらす
      for (let currentCell of this.currentCells){
        if (currentCell.xxxrowIndex >= addRowIndex){
          currentCell.xxxrowIndex += 1
        }
      } 
    },
    //追加するための行を作成する
    createTr(){
      const maxCellNum = this.getMaxCellNum()
      let tds = [] //作成した行を格納する

      for(var i = 0; i < maxCellNum; i++){
        tds = [...tds, {cell_type:'TD'}]
      }

      return {
        table_cells: tds
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
    }
  }
}
</script>

<style lang="scss" scoped>
table{
  width: 80%;
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
   background: lightblue;
   padding: 5px 20px;
   color: white;
   border-radius: 50px;
}
input{
  margin: 7px;
  box-sizing: border-box;
}
</style>