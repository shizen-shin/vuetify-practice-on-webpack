const anySelectedCells = ({selectedCells}) => selectedCells.length > 0

const singleSelectedCell = ({selectedCells}) => selectedCells.length === 1

const notAllColumnsSelected = ({ selectedCells, maxColNum }) => {
  const uniqueCellIndices = new Set(
    selectedCells.map((cell) => cell.cellIndex)
  )
  return uniqueCellIndices.size != maxColNum
}

const notAllRowsSelected = ({ selectedCells, rows }) => {
  const uniqueRowIndices = new Set(
    selectedCells.map((cell)=> cell.rowIndex)
  )
  return uniqueRowIndices.size != rows.length
}

const initTh = () => {
  return {
    item_type: 'TYPE_TH',
    active: true,
    article_items: [],
  }
}

const initTd = () => {
  return {
    item_type: 'TYPE_TD',
    active: true,
    artcle_items: [],
  }
}

const getTr = ({maxColNum, thPosition}) => {
  let tr = []
  
  if(thPosition == 'col'){
    for(var i = 0; i < maxColNum; i++) {
      if(i === 0){
        tr = [...tr, initTh()]
      }else{
        tr = [...tr, initTd()]
      }
    }
  }else{
    for(var i = 0; i < maxColNum; i++) {
      tr = [...tr, initTd()]
    }
  }
  return {
    item_type: 'TYPE_TR',
    active: true,
    article_items: tr,
  }
}



const commands = [
  {
    cmd: 'addColumnBefore',
    text:"左に列追加",
    icon: 'mdi-table-column-plus-before',
    isActive: singleSelectedCell,
    onClick: ({
      selectedCells,
      rows,
      thPosition
    }) => {

      if( selectedCells.length != 1) {
        return
      }

      //変換後の出力の値は別の変数に代入。一時的として、_変数名とする。
      const _rows = rows.map((tr, index) => {
        let newCell
        if(thPosition == 'row' && index === 0){
          newCell = initTh()
        }else{
          newCell = initTd()
        }
        tr.article_items = [
          ...tr.article_items.slice(0, selectedCells[0].cellIndex),
          ...[newCell],
          ...tr.article_items.slice(selectedCells[0].cellIndex),
        ]
        return tr
      })

      const _selectedCells = selectedCells.map((cell)=>{
        const {cellIndex: cCellIndex} = cell
        if(cCellIndex >= selectedCells[0].cellIndex){
          return {
            ...cell,
            cellIndex: cCellIndex + 1
          }
        } else {
          return cell
        }
      })

      //vueに戻すoutput用
      return {
        selectedCells: _selectedCells,
        rows: _rows,
      }
    }
  },
  {
    cmd: 'addColumnAfter',
    text:"右に列追加",
    icon: 'mdi-table-column-plus-after',
    isActive: singleSelectedCell,
    onClick: ({
      selectedCells,
      rows,
      thPosition,
    }) => {
      if(selectedCells.length != 1) {
        return
      } 

      const _rows = rows.map((tr, index) => {
        let newCell
        if (thPosition == 'row' && index === 0) {
          newCell = initTh()
        } else {
          newCell = initTd()
        }

        return {
          ...tr,
          article_items: [
            ...tr.article_items.slice(0, selectedCells[0].cellIndex + 1),
            ...[newCell],
            ...tr.article_items.slice(selectedCells[0].cellIndex + 1),
          ]
        }
      })

      const _selectedCells = selectedCells.map((cell)=>{
        const {cellIndex: cCellIndex} = cell
        if(cCellIndex > selectedCells[0].cellIndex){
          return {
            ...cell,
            cellIndex: cCellIndex + 1
          }
        }else {
          return cell
        }
      })

      return {
        rows: _rows,
        selectedCells: _selectedCells
      }
    }
  },
  {
    cmd: 'removeColumn',
    text:"列削除",
    icon: 'mdi-table-column-remove',
    color: 'error',
    isActive: (params) => anySelectedCells(params) && notAllColumnsSelected(params),
    onClick: ({
      selectedCells,
      rows,
      maxColNum,
    }) => {
      const cellIndicesToRemove = new Set(
        selectedCells.map((cell) => cell.cellIndex)
      )

      if(cellIndicesToRemove.size == maxColNum) {
        return
      }

      const _rows = rows.map((row) => {
        return {
          ...row,
          article_items: row.article_items.filter((cells, cellIndex)=> 
            !cellIndicesToRemove.has(cellIndex)
          )
        }
      })

      return {
        rows: _rows,
        selectedCells: []
      }
    },
  },
  {
    cmd: 'addRowAfter',
    text:"下に行追加",
    icon: 'mdi-table-row-plus-after',
    isActive: singleSelectedCell,
    onClick: ({
      selectedCells,
      rows,
      maxColNum,
      thPosition,
    }) => {
      if(selectedCells.length != 1) {
        return
      }
      
      const _rows = [
        ...rows.slice(0, selectedCells[0].rowIndex + 1),
        ...[getTr( {maxColNum, thPosition} )],
        ...rows.slice(selectedCells[0].rowIndex + 1),
      ]

      const _selectedCells = selectedCells.map((cell) => {
        const { rowIndex: cRowIndex } = cell
        if (cRowIndex > selectedCells[0].rowIndex){
          return {
            ...cell,
            rowIndex:  cRowIndex + 1,
          }
        } else {
          return cell
        }
      })

      return {
        rows: _rows,
        selectedCells: _selectedCells
      }
    },
  },
  {
    cmd: 'addRowBefore',
    text:"上に行追加",
    icon: 'mdi-table-row-plus-before',
    isActive: singleSelectedCell,
    onClick: ({
      selectedCells,
      rows,
      maxColNum,
      thPosition,
    }) => {

      if(selectedCells.length != 1) {
        return
      }
      const _rows = [
        ...rows.slice(0, selectedCells[0].rowIndex),
        ...[getTr( {maxColNum, thPosition} )],
        ...rows.slice(selectedCells[0].rowIndex),
      ]
      
      const _selectedCells = selectedCells.map((cell) => {
        const { rowIndex: cRowIndex } = cell
        if (cRowIndex >= selectedCells[0].rowIndex){
          return {
            ...cell,
            rowIndex:  cRowIndex + 1,
          }
        } else {
          return cell
        }
      })

      return {
        rows: _rows,
        selectedCells: _selectedCells
      }
    }
  },
  {
    cmd: 'removeRow',
    text:"行削除",
    icon: 'mdi-table-row-remove',
    color: 'error',
    isActive: (params) => anySelectedCells(params) && notAllRowsSelected(params),
    onClick: ({
      selectedCells,
      rows,
    }) => {
      const rowIndicesToRemove = new Set(
        selectedCells.map((cell)=> cell.rowIndex)
      )
  
      if(rowIndicesToRemove.size == rows.length) return

      const _rows = rows.filter((row, rowIndex)=> 
        !rowIndicesToRemove.has(rowIndex)
      )

      return {
        rows: _rows,
        selectedCells: []
      }
    },
  },
  {
    cmd: 'clearSelects',
    text: "選択解除",
    icon: 'mdi-cancel',
    isActive: anySelectedCells,
    onClick: ( {rows} ) => {
      const _rows = rows

      return {
        selectedCells:[],
        rows: _rows
      }
    }
  }
]

export default commands