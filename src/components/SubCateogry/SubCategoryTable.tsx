import { Suspense, useMemo } from 'react';
import Table from '../Table';
import { subCategoryListTypeArray } from '../../types/productTypes.ts';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { CustomParagraph } from '../styledComponents/Common.styles.ts';
import dayjs from 'dayjs';

const SubCategoryTable = ({ data }: { data: subCategoryListTypeArray }) => {
  const columns: GridColDef[] = [
    { field: 'subCategoryName', headerName: 'Sub Category', minWidth: 200, flex: 1 },
    { field: 'createdBy', headerName: 'Created By', width: 250 },
    {
      field: 'createdOn',
      headerName: 'Created On',
      width: 200,
      renderCell: (params: GridCellParams) => (
        <CustomParagraph>
          {params.row.createdOn ? dayjs(params.row.createdOn).format('DD/MM/YYYY') : ''}
        </CustomParagraph>
      )
    }
  ];

  const memoizedData = useMemo(() => data, [data]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Table columns={columns} rows={memoizedData} idName={'subCategoryId'} />
    </Suspense>
  );
};
export default SubCategoryTable;
