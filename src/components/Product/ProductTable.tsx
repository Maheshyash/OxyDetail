import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import React, { Suspense, useMemo } from 'react';
import { ProductDetails, ProductItem } from '../../types/productTypes';
import { ActionButtons, CustomParagraph } from '../styledComponents/Common.styles';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
const Table = React.lazy(() => import('../Table.tsx'));

const ProductTable = ({ data }: { data: ProductDetails }) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'productName', headerName: 'productName', width: 200 },
    { field: 'productCode', headerName: 'productCode', minWidth: 200, flex: 1 },
    { field: 'categoryName', headerName: 'Category', width: 200 },
    { field: 'subCategoryName', headerName: 'Sub Category', width: 250 },
    {
      field: 'Is New Product',
      headerName: 'isNewProduct',
      width: 200,
      renderCell: (params: GridCellParams) => (
        <CustomParagraph>
          {params.row.activationDate ? dayjs(params.row.activationDate).format('DD/MM/YYYY') : ''}
        </CustomParagraph>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams) => (
        <ActionButtons>
          <ModeEditOutlineIcon onClick={() => handleAction(params.row as ProductItem, 'addProduct')} />
          {/* {haveSubMenuAccess('Product','Attribute Mapping') &&<AccountTreeRoundedIcon onClick={() => handleAction(params.row as ProductItem, 'attributeMapping')} />} */}
          <AccountTreeRoundedIcon onClick={() => handleAction(params.row as ProductItem, 'attributeMapping')} />
        </ActionButtons>
      )
    }
  ];

  const handleAction = (row: ProductItem, to: string) => {
    navigate(to, { state: { productDetails: row } });
  };

  const memoizedData = useMemo(() => data, [data]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Table columns={columns} rows={memoizedData} idName={'productCode'} />
    </Suspense>
  );
};

export default ProductTable;
