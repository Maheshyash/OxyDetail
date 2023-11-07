import { Suspense, useMemo } from 'react';
import Table from '../Table';
import { categoryListArray } from '../../types/productTypes.ts';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { CustomParagraph } from '../styledComponents/Common.styles.ts';
import dayjs from 'dayjs';

const CategoryTable = ({ data }: { data: categoryListArray }) => {
  const columns: GridColDef[] = [
    { field: 'categoryName', headerName: 'CategoryName', minWidth: 200, flex: 1 },
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
      <Table columns={columns} rows={memoizedData} idName={'categoryId'} />
    </Suspense>
  );
};
export default CategoryTable;
