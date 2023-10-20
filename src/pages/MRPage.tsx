import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyContainer } from '../components/styledComponents/Body.styles';
import { AddButtonContainer, NoRecordsFound } from '../components/styledComponents/Common.styles';
const MRPage = () => {
  const navigate = useNavigate();
  const [MrList, setMrList] = useState<Array<any> | []>([]);
  const handleAddMR = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addMR');
  };
  useEffect(() => {
    fetchMrList()
      .then(res => {
        console.log(res, 'res');
        setMrList(res.data);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
      });
  }, []);
  useEffect(() => {
    console.log(MrList, 'mrlist');
  }, [MrList]);
  return (
    <BodyContainer>
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddMR}>
          Add
        </CustomButton>
      </AddButtonContainer>
      {MrList.length === 0 ? <NoRecordsFound>No records found</NoRecordsFound> : <BasicTable />}
    </BodyContainer>
  );
};

export default MRPage;

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CustomButton } from '../components/styledComponents/InputBox.styles';
import { fetchMrList } from '../utils/APIs';

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
