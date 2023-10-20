import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyContainer, NormalContainer } from '../components/styledComponents/Body.styles';
import { ActionButtons, AddButtonContainer, FilterContainer, NoRecordsFound } from '../components/styledComponents/Common.styles';
import { CustomButton, InputBox } from '../components/styledComponents/InputBox.styles';
import { deleteAttributeItem, fetchAttributeList, fetchMrList } from '../utils/APIs';
import { AttributeDetails, AttributeList } from '../types/attributeTypes';
import { TD, TH, TableContainer } from '../components/styledComponents/Table.styles';
import { useTable, useSortBy } from 'react-table';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {Button} from '@mui/material'
const AttributesPage = () => {
  const navigate = useNavigate();
  const [attributeList, setAttributeList] = useState<AttributeList | []>([]);
  const handleAddMR = (e: MouseEvent<HTMLButtonElement>) => {
    navigate('addAttributes');
  };
  useEffect(() => {
    fetchAttributeDetails();
  }, []);
  const fetchAttributeDetails = (AttributeId=null) =>{
    fetchAttributeList(AttributeId)
      .then(res => {
        console.log(res, 'res');
        // setMrList(res.data);
        setAttributeList(res);
      })
      .catch(err => {
        alert('err');
        console.log(err, 'err');
      });
  }
  return (
    <>
    {/* <NormalContainer>
      <FilterContainer >
        <InputBox type='search' size='small' style={{width:'200px'}}/>
        <Button>
          <SearchRoundedIcon/>
        </Button>
      </FilterContainer>
    </NormalContainer> */}
    <BodyContainer>
      <AddButtonContainer>
        <CustomButton variant="outlined" onClick={handleAddMR}>
          Add
        </CustomButton>
      </AddButtonContainer>
      {attributeList.length === 0 ? (
        <NoRecordsFound>No records found</NoRecordsFound>
      ) : (
        <AttributeTable data={attributeList} callBackAttributeList= {fetchAttributeDetails} />
      )}
    </BodyContainer>
    </>
  );
};

export default AttributesPage;

const AttributeTable = ({ data, callBackAttributeList }: { data: AttributeList, callBackAttributeList:any }) => {
  const navigate = useNavigate();
  const COLUMNS = [
    {
      Header: 'Attribute Name',
      accessor: 'attributeName'
    },
    {
      Header: 'Is Active',
      accessor: 'isActive',
      Cell: ({ cell: { value } }) => <span>{value ? 'Active' : 'Not Active'}</span>
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }: { row: AttributeDetails }) => (
        <>
          <ActionButtons>
            <ModeEditOutlineIcon onClick={() => handleAction(row)} />
            <DeleteForeverIcon onClick={() => handleDeleteAttribute(row)} />
          </ActionButtons>
        </>
      )
    }
  ];
  const handleAction = (row: AttributeDetails) => {
    console.log(row);
    // navigate('addAttributes',{state:{row}});
    navigate('addAttributes', { state: { attributeDetails: row.original } });
  };
  const handleDeleteAttribute = async (row: AttributeDetails) => {
    await deleteAttributeItem(row.original.attributeId)
      .then(res => {
        if (res.statusCode === 1) {
          console.log(res.statusMessage);
          callBackAttributeList()
        } else {
          //handle error
        }
      })
      .catch(err => console.log(err));
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
