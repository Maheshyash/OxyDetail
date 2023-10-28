import { useMemo } from 'react';
import { TD, TH, TableContainer } from '../styledComponents/Table.styles';
import { AttributeDetails, AttributeList } from '../../types/attributeTypes';
import { ActionButtons } from '../styledComponents/Common.styles';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
const AttributeTable = ({ data }: { data: AttributeList }) => {
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
          </ActionButtons>
        </>
      )
    }
  ];
  const handleAction = (row: any) => {
    console.log(row);
    navigate('addAttribute', { state: { attributeDetails: row.original } });
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

export default AttributeTable;
