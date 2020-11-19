<template>
  <div>
    <p>selectedCells:{{selectedCells}}</p>
    <p>selectedCells.length:{{selectedCells.length}}</p>
    <p>
      <button
        @click="addRowAfter"
      >下に行を追加
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
      ],
      selectedCells:[],
      getTr: {
          "table_cells": [
            {"cell_type": "TD"},
            {"cell_type": "TD"},
            {"cell_type": "TD"},
          ]
        }
    }
  },
  methods:{
    isActive(rowIndex, cellIndex){
      return this.selectedCells.findIndex((elem) =>
        elem.rowIndex == rowIndex && elem.cellIndex == cellIndex
        ) > -1
    },
    clickCell(event){
      //クリックされたセルの情報
      const cell = event.target
      const tr = event.target.parentNode

      //クリックされたセルが既に選択されている場合は、配列から削除する
      if(this.isActive(tr.rowIndex, cell.cellIndex)){
        
        //選択中の配列の何番目の要素かを求める
        const rmIndex = this.selectedCells.findIndex((elem)=>
          elem.rowIndex == tr.rowIndex && elem.cellIndex == cell.cellIndex 
        )

        //選択した要素を選択中の配列から削除する
        this.selectedCells = [
          ...this.selectedCells.slice(0, rmIndex),
          ...this.selectedCells.slice(rmIndex + 1)
        ]

      } else{
        this.selectedCells = [
          ...this.selectedCells,
          {
            rowIndex: tr.rowIndex,
            cellIndex: cell.cellIndex
          }
        ]
      }
    },
    addRowAfter(){ 
      if(!(this.selectedCells.length >= 1)){
        return
      }

      const rowIndex = this.selectedCells[0].rowIndex

      this.rows = [
        ...this.rows.slice(0, rowIndex + 1),
        ...[this.getTr],
        ...this.rows.slice(rowIndex+1)
      ]
      
      this.selectedCells = this.selectedCells.map((tr)=>{
          const {rowIndex : cRowIndex} = tr
          if (cRowIndex > rowIndex){
            return {
              ...tr,
              rowIndex: cRowIndex + 1,
            }
          } else {
            return tr
          }
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