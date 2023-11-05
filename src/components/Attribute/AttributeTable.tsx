import { useMemo } from 'react';
import { AttributeDetails, AttributeList } from '../../types/attributeTypes';
import { ActionButtons } from '../styledComponents/Common.styles';
import { useNavigate } from 'react-router-dom';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Table from '../Table';
const AttributeTable = ({ data }: { data: AttributeList }) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'attributeName', headerName: 'Attribute Name', minWidth: 200, flex: 1 },
    {
      field: 'isActive',
      headerName: 'Is Active',
      width: 200,
      valueFormatter: ({ value }: { value: boolean }) => (value ? 'Active' : 'In Active'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width:200,
      renderCell: (params: GridCellParams) => (
        <ActionButtons>
          <ModeEditOutlineIcon onClick={() => handleAction(params.row as AttributeDetails)} />
        </ActionButtons>
      ),
    },
  ];

  const handleAction = (row: any) => {
    console.log(row);
    navigate('addAttribute', { state: { attributeDetails: row } });
  };
  const getRowId = (row: AttributeDetails) => row.attributeId;
  const memoizedData = useMemo(() => data, [data]);

  return (
    <Table columns={columns} rows={memoizedData} getRowId={getRowId} />
  );
};

export default AttributeTable;
