<template>
  <div>
    <template>
      <button>後ろに行を追加</button>
      <br>
    </template>

    <hr>
    <br>

    <table>
      <template v-for="(tr, rowIndex) in rows">
        <tr :key="rowIndex" >
          <template v-for="(cell, cellIndex) in tr.table_cells">
            <th :key="cellIndex"
                v-if="cell.cell_type== 'TH'"
                :class="{'is-active': isActive(rowIndex, cellIndex)}"
                @click="clickCell($event)">
                <br>
            </th>

            <td :key="cellIndex"
                v-if="cell.cell_type== 'TD'"
                :class="{'is-active': isActive(rowIndex, cellIndex)}"
                @click="clickCell($event)">
              <br>
            </td>

            
          </template>
        </tr>
      </template>
    </table>




  </div>
</template>


<script>
export default {
  computed:{
    startCell(){
      return this.currentCells[0] || {}
    }
  },
  data(){
    return{
      currentCells:[],
      rows: [
        {
          "table_cells": [
            {"cell_type": "TH"},
            {"cell_type": "TD"},
            {"cell_type": "TD"},
          ]
        },
        {
          "table_cells": [
            {"cell_type": "TH"},
            {"cell_type": "TD"},
            {"cell_type": "TD"},
          ]
        },
        {
          "table_cells": [
            {"cell_type": "TH"},
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
      const cellIndex = this.currentCells.cellIndex

      if(!Number.isInteger(cellIndex)){
        return
      }

      this.rows = this.rows.map((tr, index) => {
        let newCell
        if(this.thPosition == 'row' && index === 0){
          newCell = this.initTd
        } else{
          newCell = this.initTh
        }
        tr.table_cells = [

        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
table{
  width: 80%;
  th,td{
    border: thin solid rgba(0, 0, 0, 0.12);
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
</style>