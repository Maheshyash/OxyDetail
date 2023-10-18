import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { useNavigate } from 'react-router-dom';
const ProductPage = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState<ProductDetails>([]);
  const handleAddProduct = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addProduct');
  };
  useEffect(()=>{
    fetchProductList().then(res=>{
      console.log(res,'res')
      setProductData(res)
    }).catch(err=>{
      alert('err');
      console.log(err,'err')
    })
  },[])
  return (
    <div className="m-2">
      <div style={{ textAlign: 'end', marginBottom: 10 }}>
        <CustomButton variant="outlined" onClick={handleAddProduct}>
          Add
        </CustomButton>
      </div>
      {/* <BasicTable /> */}
      <ProductTable data = {productData}/>
    </div>
  )
}
// columns.js


export const COLUMNS = [
  {
      Header: 'productName',
      accessor: 'productName',
  },
  {
      Header: 'productCode',
      accessor: 'productCode',
  },
  {
      Header: 'categoryId',
      accessor: 'categoryId',
  },
  {
      Header: 'subCategoryId',
      accessor: 'subCategoryId',
  },
  {
      Header: 'isNewProduct',
      accessor: 'isNewProduct',
  },
  {
      Header: 'activationDate',
      accessor: 'activationDate',
  },
];
const ProductTable = ({data}:{data:ProductDetails})=>{
  const columns = useMemo(() => COLUMNS, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  useTable({ columns, data },useSortBy);
  return (
    <div className="container">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup:any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column:any) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ?' 🔽'
                                                : ' 🔼'
                                            :""}
                                          </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row:any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell:any) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// export default ProductTable;

export default ProductPage
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { fetchProductList } from '../utils/APIs';
import { ProductDetails } from '../types/productTypes';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}