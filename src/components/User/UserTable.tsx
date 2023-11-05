import { useMemo } from 'react';
import { ActionButtons } from '../styledComponents/Common.styles';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import { userListItem, usersListItemArray } from '../../types/userTypes';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import Table from '../Table';
const UserTable = ({ data }: { data:  usersListItemArray}) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', minWidth: 200, flex:1  },
    { field: 'emailId', headerName: 'Email Id',minWidth:200, flex: 1   },
    { field: 'mobileNo', headerName: 'Mobile Number', width: 200  },
    { field: 'timeZoneId', headerName: 'Timezone', minWidth: 200, flex:1  },
    {
      field: 'isActive',
      headerName: 'Is Active',
      width: 150,
      valueFormatter: ({ value }: { value: boolean }) => (value ? 'Active' : 'In Active'),
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
      ),
    },
  ];

  const handleAction = (row: any) => {
    navigate('addUser', { state: { userDetails: row } });
  };

  // const columns = useMemo(() => COLUMNS, []);
  const getRowId = (row: userListItem) => row.userId;
  const memoizedData = useMemo(() => data, [data]);

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);
  return (
    <Table columns={columns} rows={memoizedData} getRowId={getRowId} />
  );
};

export default UserTable;
