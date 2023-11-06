import { Suspense, useMemo } from 'react';
import Table from '../Table';
import { categoryListArray } from '../../types/productTypes.ts';
import { GridColDef } from '@mui/x-data-grid';

const CategoryTable = ({ data }: { data: categoryListArray }) => {
  const columns: GridColDef[] = [{ field: 'categoryName', headerName: 'CategoryName', minWidth: 200, flex: 1 }];

  const memoizedData = useMemo(() => data, [data]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Table columns={columns} rows={memoizedData} idName={'categoryId'} />
    </Suspense>
  );
};
export default CategoryTable;
