import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import { useMemo } from 'react';
import { ProductDetails } from '../../types/productTypes';
import { ActionButtons, CustomParagraph } from '../styledComponents/Common.styles';
import { TD, TH, TableContainer } from '../styledComponents/Table.styles';

const ProductTable = ({ data }: { data: ProductDetails}) => {
  const navigate = useNavigate();
  const COLUMNS = [
    {
      Header: 'Product Name',
      accessor: 'productName'
    },
    {
      Header: 'Product Code',
      accessor: 'productCode'
    },
    {
      Header: 'Category',
      accessor: 'categoryName'
    },
    {
      Header: 'Sub Category',
      accessor: 'subCategoryName'
    },
    {
      Header: 'Is New Product',
      accessor: 'isNewProduct',
      Cell: ({ row }: { row: any }) => (
        <>
          <div>{row.values.isNewProduct ? 'Yes' : 'No'}</div>
        </>
      )
    },
    {
      Header: 'Activation Date',
      accessor: 'activationDate',
      Cell: ({ row }: { row: any }) => (
        <CustomParagraph>
          {row.values.activationDate ? dayjs(row.values.activationDate).format('DD/MM/YYYY') : ''}
        </CustomParagraph>
      )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }: { row: any }) => (
        <>
          <ActionButtons>
            <ModeEditOutlineIcon onClick={() => handleAction(row)} />
            <AccountTreeRoundedIcon onClick={() => handleAttributeMapping(row)} />
          </ActionButtons>
        </>
      )
    }
  ];
  const handleAttributeMapping = async (row: any) => {
    navigate('attributeMapping', { state: { attributeDetails: row.original } });
  };
  const handleAction = (row: any) => {
    navigate('addProduct', { state: { productDetails: row.original } });
  };
  const columns = useMemo(() => COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);
  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-header-sticky">
              {headerGroup.headers.map((column: any) => (
                <TH {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </TH>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return <TD {...cell.getCellProps()}>{cell.render('Cell')}</TD>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default ProductTable;
