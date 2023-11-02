import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import { useMemo } from 'react';
import { ActionButtons, CustomParagraph } from '../styledComponents/Common.styles';
import { TD, TH, TableContainer } from '../styledComponents/Table.styles';
import { organizationListArray } from '../../types/organizationTypes';

const OrganizationTable = ({ data }: { data: organizationListArray }) => {
    const navigate = useNavigate();
    const COLUMNS = [
        {
            Header: 'Organization Name',
            accessor: 'orgName'
        },
        {
            Header: 'Contact Number',
            accessor: 'contactNo'
        },
        {
            Header: 'Country',
            accessor: 'countryName'
        },
        {
            Header: 'State',
            accessor: 'stateName'
        },
        {
            Header: 'Email Id',
            accessor: 'emailId'
        },
        {
            Header: 'GST',
            accessor: 'gstnNo'
        },
        {
            Header: 'Oganization Code',
            accessor: 'orgCode'
        },
        {
            Header: 'Address',
            accessor: 'address'
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
            Header: 'Expiration Date',
            accessor: 'expiryDate',
            Cell: ({ row }: { row: any }) => (
                <CustomParagraph>
                    {row.values.expiryDate ? dayjs(row.values.expiryDate).format('DD/MM/YYYY') : ''}
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
                        {/* <AccountTreeRoundedIcon onClick={() => handleAttributeMapping(row)} /> */}
                    </ActionButtons>
                </>
            )
        }
    ];

    const handleAction = (row: any) => {
        navigate('addOrganization', { state: { organizationDetails: row.original } });
    };
    const columns = useMemo(() => COLUMNS, []);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);
    console.log('hiiii')
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

export default OrganizationTable;
