const scanTable = (rows) => 
{
  const arr = [];
  const colIndices = []
  for(var y=0; y < rows.length; y++)
  {
      var row = rows[y]
  
      for(var x=0;x<row.table_cells.length;x++)
      {
          var cell = row.table_cells[x], xx = x, tx, ty;
          
          for(;arr[y] && arr[y][xx]; ++xx);

          for(tx = xx; tx < xx + (cell.colspan || 1); ++tx) {
              for(ty = y; ty < y + (cell.rowspan || 1); ++ty)
              {
                  if( !arr[ty] ) arr[ty] = []          
                  arr[ty][tx] = 1
                  
                  if ( !colIndices[y] ) colIndices[y] = []
                  colIndices[y][x] = xx
              }
          }

      }
  }
  return colIndices
}


const dragSelectedCells = ({
  startRowIndex,
  endRowIndex,
  startColIndex,
  endColIndex,
  rows,
  colIndices,
  currentCells,
}) => {
  for( let i = 0; i <= endRowIndex; i++ ){
    for( let j = 0; j < rows[i].table_cells.length; j++ ){            
      //範囲拡張チェック
      //colIndexの延長処理
      if( i <= startRowIndex && startRowIndex <= i + rows[i].table_cells[j].rowspan - 1
          || i <= startRowIndex && startRowIndex <= i + rows[i].table_cells[j].rowspan - 1 
          || startRowIndex <= i && i + rows[i].table_cells[j].rowspan - 1 <= endRowIndex){
            if( colIndices[i][j] < startColIndex &&  startColIndex <= colIndices[i][j] + rows[i].table_cells[j].colspan - 1 ){
              startColIndex = colIndices[i][j]
              dragSelectedCells({
                startRowIndex,
                endRowIndex,
                startColIndex,
                endColIndex,
                rows,
                colIndices,
                currentCells,
              })
            }

            if( colIndices[i][j] <= endColIndex &&  endColIndex < colIndices[i][j] + rows[i].table_cells[j].colspan - 1 ){
              endColIndex = colIndices[i][j] + rows[i].table_cells[j].colspan - 1
              dragSelectedCells({
                startRowIndex,
                endRowIndex,
                startColIndex,
                endColIndex,
                rows,
                colIndices,
                currentCells,
              })
            }
      }

      //rowIndexの延長処理
      if( colIndices[i][j] <= startColIndex && startColIndex <= colIndices[i][j] + rows[i].table_cells[j].colspan - 1
          || colIndices[i][j] <= endColIndex && endColIndex <= colIndices[i][j] + rows[i].table_cells[j].colspan - 1 
          || startColIndex <= colIndices[i][j] && colIndices[i][j] + rows[i].table_cells[j].colspan - 1 <= endColIndex ){
            if( i < startRowIndex && startRowIndex <= (i + rows[i].table_cells[j].rowspan - 1) ){
              startRowIndex = i
              dragSelectedCells({
                startRowIndex,
                endRowIndex,
                startColIndex,
                endColIndex,
                rows,
                colIndices,
                currentCells,
              })
            }

            if( i <= endRowIndex && endRowIndex < (i + rows[i].table_cells[j].rowspan - 1) ){
              endRowIndex = i + rows[i].table_cells[j].rowspan - 1
              dragSelectedCells({
                startRowIndex,
                endRowIndex,
                startColIndex,
                endColIndex,
                rows,
                colIndices,
                currentCells,
              })
            }
      }
      
      
      if( startRowIndex <= i && i <= endRowIndex
          && startColIndex <= colIndices[i][j] && colIndices[i][j] <= endColIndex ){
            currentCells.push({
              rowIndex: i,
              cellIndex: j,
              colIndex: colIndices[i][j],
              rowspan: rows[i].table_cells[j].rowspan,
              colspan: rows[i].table_cells[j].colspan,
            })
      }
    }
  }
  return currentCells
}

export { scanTable, dragSelectedCells }