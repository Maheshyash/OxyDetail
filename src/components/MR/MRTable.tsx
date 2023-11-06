import { GridColDef, GridCellParams } from '@mui/x-data-grid'; // Import the necessary types
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import { MRListItem } from '../../types/MRTypes';
import { ActionButtons } from '../styledComponents/Common.styles';
import React, { Suspense, useMemo } from 'react';
const Table = React.lazy(() => import('../Table.tsx'));

const MRTable = ({ data }: { data: MRListItem[] }) => {
  const navigate = useNavigate();

  const handleAction = (row: MRListItem) => {
    navigate('addMR', { state: { userDetails: row } });
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', minWidth: 200, flex: 1 },
    { field: 'emailId', headerName: 'Email Id', minWidth: 200, flex: 1 },
    { field: 'mobileNo', headerName: 'Mobile Number', minWidth: 200 },
    {
      field: 'isActive',
      headerName: 'isActive',
      minWidth: 100,
      valueFormatter: ({ value }: { value: boolean }) => (value ? 'Active' : 'In Active')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params: GridCellParams) => (
        <ActionButtons>
          <ModeEditOutlineIcon onClick={() => handleAction(params.row as MRListItem)} />
        </ActionButtons>
      )
    }
  ];

  const memoizedData = useMemo(() => data, [data]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Table columns={columns} rows={memoizedData} idName={'userId'} />
    </Suspense>
  );
};

export default MRTable;
