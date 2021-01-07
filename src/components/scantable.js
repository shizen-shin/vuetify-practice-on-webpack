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

export { scanTable }