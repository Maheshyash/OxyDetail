import { TableContainer } from '@mui/material';
import { StyledDataGrid } from './styledComponents/Table.styles';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface TableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

const Table: React.FC<TableProps> = ({ columns, rows, ...rest }) => {
  return (
    <TableContainer style={{ height: 300 }}>
      <StyledDataGrid
        columnHeaderHeight={40}
        // rowHeight={'auto'}
        columns={columns}
        rows={rows}
        disableColumnMenu
        {...rest}
      />
    </TableContainer>
  );
};

export default Table;
