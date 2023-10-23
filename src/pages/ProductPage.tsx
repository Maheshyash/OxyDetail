import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductDetails, categoryListArray, categoryListType, subCategoryListType, subCategoryListTypeArray } from '../types/productTypes';
import { BodyContainer, NormalContainer } from '../components/styledComponents/Body.styles';
import { CustomButton, CustomeAutoSelect, InputBox, Label } from '../components/styledComponents/InputBox.styles';
import { deleteProductItem, fetchCategoryList, fetchProductList, fetchSubCategoryList } from '../utils/APIs';
import { TD, TH, TableContainer } from '../components/styledComponents/Table.styles';
import {
  ActionButtons,
  AddButtonContainer,
  FilterContainer,
  NoRecordsFound
} from '../components/styledComponents/Common.styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import dayjs from 'dayjs';
const ProductPage = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<ProductDetails>([]);
  const [categoryList, setCategoryList] = useState<categoryListArray>([]);
  const [subCategoryList, setSubCategoryList] = useState<subCategoryListTypeArray>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<subCategoryListType| null>(null);
  const handleAddProduct = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addProduct');
  };
  useEffect(() => {
    fetchProductDetails();
    fetchCategoryDetails();
  }, []);

  const fetchCategoryDetails = async () => {
    await fetchCategoryList()
      .then(res => {
        setCategoryList(res);
      })
      .catch(err => {
        alert('err');
      });
  };
  const fetchSubCategoryDetails = async (categoryId: number) => {
    await fetchSubCategoryList(categoryId)
      .then(res => {
        setSubCategoryList(res);
      })
      .catch(err => {
        alert('err');
      });
  };
  const fetchProductDetails = async (payload?:any) => {
    await fetchProductList(payload)
      .then(res => {
        setProductList(res);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
      });
  };
  const handleSearch = async () => {
    const payload = {
      CategoryId : categoryId,
      SubCategoryId:subCategoryId?.subCategoryId
    }
    await fetchProductDetails(payload)
  }
  return (
    <>
      <NormalContainer>
        <FilterContainer>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Label>Category</Label>
              <CustomeAutoSelect
                options={categoryList}
                onChange={(event:React.SyntheticEvent<Element, Event>, data:any) => {
                  setCategoryId(data.categoryId);
                  fetchSubCategoryDetails(data.categoryId);
                  setSubCategoryId(null)
                  console.log(data, 'data');
                }}
                getOptionLabel={(option:any) => option.categoryName}
                size="small"
                renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Label>Sub Category Name</Label>
              <CustomeAutoSelect
                options={subCategoryList}
                onChange={(event:React.SyntheticEvent<Element, Event>, data:any) => {
                  setSubCategoryId(data);
                }}
                value ={subCategoryId}
                getOptionLabel={(option:any) => option.subCategoryName}
                size="small"
                renderInput={params => <TextField {...params} placeholder={'Pleas Select'} />}
              />
            </Grid>
            <Grid item xs={12} md={1} style={{display:'flex',alignItems:'end'}}>
              <Button>
                <SearchRoundedIcon onClick={handleSearch}/>
              </Button>
            </Grid>
          </Grid>
        </FilterContainer>
      </NormalContainer>
      <BodyContainer>
        <AddButtonContainer>
          <CustomButton variant="outlined" onClick={handleAddProduct}>
            Add
          </CustomButton>
        </AddButtonContainer>
        {productList.length === 0 ? (
          <NoRecordsFound>No records found</NoRecordsFound>
        ) : (
          <ProductTable data={productList} callBackProductList={fetchProductDetails} />
        )}
      </BodyContainer>
    </>
  );
};

const ProductTable = ({ data, callBackProductList }: { data: ProductDetails; callBackProductList: any }) => {
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
          <div>{row.values.isNewProduct?"Yes":"No"}</div>
        </>
      )
    },
    {
      Header: 'Activation Date',
      accessor: 'activationDate',
      Cell: ({ row }: { row: any }) => (
        <>
          <div>{dayjs(row.values.activationDate).format('YYYY-MM-DD')}</div>
        </>
      )
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }: { row: any }) => (
        <>
          <ActionButtons>
            <ModeEditOutlineIcon onClick={() => handleAction(row)} />
            <DeleteForeverIcon onClick={() => handleDeleteAttribute(row)} />
            <AccountTreeRoundedIcon onClick={()=> handleAttributeMapping(row)}/>
          </ActionButtons>
        </>
      )
    }
  ];
  const handleDeleteAttribute = async (row: any) => {
    await deleteProductItem(row.original.productCode).then(res => {
      if (res.statusCode === 1) {
        alert(res.statusMessage);
        callBackProductList();
      } else {
        alert(res.statusMessage);
      }
    });
  };
  const handleAttributeMapping = async (row:any) => {
    console.log(row,'rows')
    navigate('attributeMapping',{state:{attributeDetails:row.original.attributes}})
  }
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

export default ProductPage;
