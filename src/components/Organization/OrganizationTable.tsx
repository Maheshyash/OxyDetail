import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import React, { Suspense, useMemo } from 'react';
import { ActionButtons, CustomParagraph } from '../styledComponents/Common.styles';
import { orgalizationListItem, organizationListArray } from '../../types/organizationTypes';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
const Table = React.lazy(() => import('../Table.tsx'));

const OrganizationTable = ({ data }: { data: organizationListArray }) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'orgName', headerName: 'Organization Name', minWidth: 200, flex: 1 },
    { field: 'contactNo', headerName: 'Contact Number', minWidth: 200, flex: 1 },
    { field: 'countryName', headerName: 'Country Name', minWidth: 200, flex: 1 },
    { field: 'stateName', headerName: 'State Name', minWidth: 200, flex: 1 },
    { field: 'emailId', headerName: 'Email Id', minWidth: 200, flex: 1 },
    { field: 'gstnNo', headerName: 'GST Number', minWidth: 200, flex: 1 },
    { field: 'orgCode', headerName: 'Organization Code', minWidth: 200, flex: 1 },
    { field: 'address', headerName: 'Address', width: 300 },
    {
      field: 'activationDate',
      headerName: 'activationDate',
      width: 200,
      type: 'Date',
      renderCell: (params: GridCellParams) => (
        <CustomParagraph>
          {params.row.activationDate ? dayjs(params.row.activationDate).format('DD/MM/YYYY') : ''}
        </CustomParagraph>
      )
    },
    {
      field: 'expiryDate',
      headerName: 'expiryDate',
      width: 200,
      type: 'Date',
      renderCell: (params: GridCellParams) => (
        <CustomParagraph>
          {params.row.expiryDate ? dayjs(params.row.expiryDate).format('DD/MM/YYYY') : ''}
        </CustomParagraph>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: GridCellParams) => (
        <ActionButtons>
          <ModeEditOutlineIcon onClick={() => handleAction(params.row as orgalizationListItem)} />
        </ActionButtons>
      )
    }
  ];

  const handleAction = (row: any) => {
    navigate('addOrganization', { state: { organizationDetails: row } });
  };

  const getRowId = (row: orgalizationListItem) => row.orgId;
  const memoizedData = useMemo(() => data, [data]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Table columns={columns} rows={memoizedData} getRowId={getRowId} />
    </Suspense>
  );
};

export default OrganizationTable;
