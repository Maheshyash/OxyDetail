import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import React, { Suspense, useMemo } from 'react';
import { ActionButtons } from '../styledComponents/Common.styles';
import { roleListArray, roleListItem } from '../../types/roleTypes';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
const Table = React.lazy(() => import('../Table.tsx'));

const RoleTable = ({ data }: { data: roleListArray }) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'roleName', headerName: 'Role', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Is Active',
      width: 150,
      flex: 1,
      valueFormatter: ({ value }: { value: boolean }) => (value ? 'Active' : 'In Active')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams) => (
        <ActionButtons>
          <ModeEditOutlineIcon onClick={() => handleAction(params.row as roleListItem)} />
        </ActionButtons>
      )
    }
  ];

  const handleAction = (row: any) => {
    navigate('addRole', { state: { roleDetails: row } });
  };

  const getRowId = (row: roleListItem) => row.roleId;
  const memoizedData = useMemo(() => data, [data]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Table columns={columns} rows={memoizedData} getRowId={getRowId} />
    </Suspense>
  );
};

export default RoleTable;
