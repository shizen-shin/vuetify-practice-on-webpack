<template>
  <div>
    <p>〜TmpRowSpan.vue〜</p>
    <p>currentCells : {{currentCells}}</p>
    
    <table>
      <template v-for="(tr, rowIndex) in rows">
        <tr :key="rowIndex">
          <template v-for="(cell, cellIndex) in tr.table_cells">
            <th :key="cellIndex" 
                v-if="cell.cell_type == 'TH'"
                :class="{'is-active': isActive(rowIndex, cellIndex)}"
                :colspan="cell.colspan || 1"
                :rowspan="cell.rowspan || 1"
                @click="clickCell($event)">
              ( {{rowIndex}} , {{cellIndex}} )
            </th>
          
            <td :key="cellIndex" 
                v-else-if="cell.cell_type == 'TD'"
                :class="{'is-active': isActive(rowIndex, cellIndex)}"
                :colspan="cell.colspan || 1"
                :rowspan="cell.rowspan || 1"
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
            {"cell_type": "TD", "rowspan":2},
            {"cell_type": "TD", "colspan":2},
            {"cell_type": "TD"},
            {"cell_type": "TD"},
            // {"cell_type": "TD"},
          ]
        },
        {
          "table_cells": [
            {"cell_type": "TD"},
            {"cell_type": "TD"},
            {"cell_type": "TD", "rowspan":2, "colspan":2},
            // {"cell_type": "TD"},
            // {"cell_type": "TD"},
          ]
        },
        {
          "table_cells": [
            {"cell_type": "TD"},
            {"cell_type": "TD"},
            {"cell_type": "TD"},
            // {"cell_type": "TD"},
            // {"cell_type": "TD"},
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
   background: gray;
   padding: 5px 20px;
   color: white;
   border-radius: 50px;
}
input{
  margin: 7px;
  box-sizing: border-box;
}
</style>