import styled from '@mui/material/styles/styled';
import { DataGrid } from '@mui/x-data-grid';

export const TableContainer = styled('div')(() => ({
  maxHeight: '70vh',
  overflow: 'auto',
  borderRadius: 10
}));

export const TH = styled('th')(({ theme }) => ({
  background: `${theme.palette.primary.dark}`,
  fontSize: `${theme.typography.fontSize}px`,
  fontWeight: 500,
  color: '#ffffff',
  textAlign: 'center'
}));
export const TD = styled('td')(({ theme }) => ({
  background: '#ffffff',
  fontSize: `${theme.typography.fontSize}px`,
  textAlign: 'center',
  padding: 5
}));

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    background: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize,
    padding: 0,
    margin: 0,
    color: 'white'
  },
  '& .MuiDataGrid-row': {
    background: 'white',
    fontSize: theme.typography.fontSize
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600
  },
  '& .MuiDataGrid-columnHeader .MuiSvgIcon-root': {
    color: 'white'
  },
  '& .MuiDataGrid-cellContent': {
    fontSize: theme.typography.fontSize,
    // wordBreak:'break-word',
    // whiteSpace:'break-spaces',
    // textAlign:'center'
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    justifyContent: 'center'
  },
  '& .MuiDataGrid-cell': {
    justifyContent: 'center'
  }
}));
