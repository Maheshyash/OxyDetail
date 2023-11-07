import React, { Suspense, useMemo } from 'react';
import { ActionButtons } from '../styledComponents/Common.styles';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import { userListItem, usersListItemArray } from '../../types/userTypes';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
const Table = React.lazy(() => import('../Table.tsx'));

const UserTable = ({ data }: { data: usersListItemArray }) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', minWidth: 200, flex: 1 },
    { field: 'emailId', headerName: 'Email Id', minWidth: 200, flex: 1 },
    { field: 'mobileNo', headerName: 'Mobile Number', width: 200 },
    { field: 'timeZoneId', headerName: 'Timezone', minWidth: 200, flex: 1 },
    {
      field: 'isActive',
      headerName: 'Is Active',
      width: 150,
      valueFormatter: ({ value }: { value: boolean }) => (value ? 'Active' : 'In Active')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams) => (
        <ActionButtons>
          <ModeEditOutlineIcon onClick={() => handleAction(params.row as userListItem)} />
        </ActionButtons>
      )
    }
  ];

  const handleAction = (row: any) => {
    navigate('addUser', { state: { userDetails: row } });
  };

  const memoizedData = useMemo(() => data, [data]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Table columns={columns} rows={memoizedData} idName={'userId'} />
    </Suspense>
  );
};

export default UserTable;
