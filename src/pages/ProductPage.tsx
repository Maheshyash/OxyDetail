import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { ProductDetails } from '../types/productTypes';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { fetchCategoryList, fetchProductList, fetchSubCategoryList } from '../utils/APIs';
import { TableContainer } from '../components/styledComponents/Table.styles';
import { AddButtonContainer, NoRecordsFound } from '../components/styledComponents/Common.styles';
import LabelValue from '../components/LabelValue';
const ProductPage = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<ProductDetails>([]);
  const [categoryList, setCategoryList] = useState<Array<any>>([]);
  const [subategoryList, setSubCategoryList] = useState<Array<any>>([]);
  const [categoryId, setCategoryId] = useState<number|null>(null);
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const handleAddProduct = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addProduct');
  };
  useEffect(() => {
    fetchProductDetails();
    fetchCategoryDetails();
  }, []);
  const fetchCategoryDetails = async () =>{
    await fetchCategoryList()
    .then(res=>{
      setCategoryList(res)
    }).catch(err => {
      alert('err');
    })
  }
  const fetchSubCategoryDetails = async (categoryId:number) =>{
    await fetchSubCategoryList(categoryId)
    .then(res=>{
      setSubCategoryList(res)
    }).catch(err => {
      alert('err');
    })
  }
  const fetchProductDetails = async () => {
    await fetchProductList()
      .then(res => {
        setProductList(res);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
      });
  };
  return (
    <BodyContainer>
      <div>
        {/* <LabelValue label='Product Name' value ={productName} onChange={handleProductName}/> */}

      </div>
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddProduct}>
          Add
        </CustomButton>
      </AddButtonContainer>
      {productList.length === 0 ? (
        <NoRecordsFound>No records found</NoRecordsFound>
      ) : (
        <ProductTable data={productList} />
      )}
    </BodyContainer>
  );
};

export const COLUMNS = [
  {
    Header: 'productName',
    accessor: 'productName'
  },
  {
    Header: 'productCode',
    accessor: 'productCode'
  },
  {
    Header: 'categoryId',
    accessor: 'categoryId'
  },
  {
    Header: 'subCategoryId',
    accessor: 'subCategoryId'
  },
  {
    Header: 'isNewProduct',
    accessor: 'isNewProduct'
  },
  {
    Header: 'activationDate',
    accessor: 'activationDate'
  }
];
const ProductTable = ({ data }: { data: ProductDetails }) => {
  const columns = useMemo(() => COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);
  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-header-sticky">
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
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
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default ProductPage;
