<template>
  <div>
    <p>〜TmpAddRow.vue〜</p>
    <p>currentCells : {{currentCells}}</p>
    <p>
      <button
        @click="addColumnBefore"
      >前に列を追加
      </button>
            <button
        @click="addColumnAfter"
      >後ろに列を追加
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
              ( {{rowIndex}} , {{cellIndex}} )
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
  computed:{
    initCell(){
      return {"cell_type": "TD"}
    },
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
    addColumnBefore(){
      //選択中のセル番号を取得（複数選択の場合は最初に選択したセル）
      //未選択の場合は0（一番先頭のセル）にする。

      let addCellIndex = 0

      if(this.currentCells.length != 0){
        addCellIndex = this.currentCells[0].xxxcellIndex
      }

      //セルの内容は簡単に変更できるように初期値(initCell)を別途設けておく
      this.rows.map((tr, index)=>{
        tr.table_cells.splice(addCellIndex, 0, this.initCell)
        }
      )

      //選択中のセルを移動する
      this.currentCells.map((tr, index)=>{
        if(tr.xxxcellIndex >= addCellIndex){
          tr.xxxcellIndex += 1
        }
      })
    },
    addColumnAfter(){
      //選択中のセル番号を取得（複数選択の場合は最初に選択したセル）
      //未選択の場合は最後のセルにする（最大のセル数）

      let addCellIndex = this.getMaxCellNum()

      if(this.currentCells.length != 0){
        addCellIndex = this.currentCells[0].xxxcellIndex
      }

      //セルの内容は簡単に変更できるように初期値(initCell)を別途設けておく
      this.rows.map((tr, index)=>{
        tr.table_cells.splice(addCellIndex + 1, 0, this.initCell)
        }
      )

      //選択中のセルを移動する
      this.currentCells.map((tr, index)=>{
        if(tr.xxxcellIndex > addCellIndex){
          tr.xxxcellIndex += 1
        }
      })
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
   background: lightcoral;
   padding: 5px 20px;
   color: white;
   border-radius: 50px;
}
</style>