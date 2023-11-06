import TableContainer from '@mui/material/TableContainer'
import { StyledDataGrid } from './styledComponents/Table.styles';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface TableProps {
  columns: Array<GridColDef>;
  rows: GridRowsProp;
  idName:string;
}

const Table: React.FC<TableProps> = ({ columns, rows,idName, ...rest }: TableProps) => {
  return (
    <TableContainer style={{ height: 300 }}>
      <StyledDataGrid
        columnHeaderHeight={40}
        // rowHeight={'auto'}
        columns={columns}
        rows={rows}
        getRowId={(row) => row[idName]}
        disableColumnMenu
        {...rest}
      />
    </TableContainer>
  );
};

export default Table;
