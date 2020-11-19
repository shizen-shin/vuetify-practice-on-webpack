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



const commands = [
  {
    cmd: 'addColumnBefore',
    text:"左に列追加",
    icon: 'mdi-table-column-plus-before',
    isActive: singleSelectedCell,
  },
  {
    cmd: 'addColumnAfter',
    text:"右に列追加",
    icon: 'mdi-table-column-plus-after',
    isActive: singleSelectedCell,
  },
  {
    cmd: 'removeColumn',
    text:"列削除",
    icon: 'mdi-table-column-remove',
    color: 'error',
    isActive: (params) => anySelectedCells(params) && notAllColumnsSelected(params),
  },
  {
    cmd: 'addRowAfter',
    text:"下に行追加",
    icon: 'mdi-table-row-plus-after',
    isActive: singleSelectedCell,
  },
  {
    cmd: 'addRowBefore',
    text:"上に行追加",
    icon: 'mdi-table-row-plus-before',
    isActive: singleSelectedCell,
    onClick: ({
      cols,
      rows,
      selectedCells,
      maxColNumber,
    }) => {

      
      return {
        cols,
        rows,
        selectedCells,
      }
    }
  },
  {
    cmd: 'removeRow',
    text:"行削除",
    icon: 'mdi-table-row-remove',
    color: 'error',
    isActive: (params) => anySelectedCells(params) && notAllRowsSelected(params),
  },
  {
    cmd: 'clearSelects',
    text: "選択解除",
    icon: 'mdi-cancel',
    isActive: anySelectedCells
  }
]

export default commands