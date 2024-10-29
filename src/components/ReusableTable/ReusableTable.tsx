import React, {useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TablePagination
} from '@mui/material';

interface ReusableTableProps {
    columns: Array<{ id: string; label: string; minWidth?: number; align?: 'right' | 'left' | 'center'; format?: (value: any) => React.ReactNode }>;
    rows: Array<Record<string, any>>;
    pageSizeOptions?: number[];
    initialPageSize?: number;
    onRowClick?:  (rowData: Record<string, any>) => void;
}

const ReusableTable: React.FC<ReusableTableProps> =
    ({
         columns,
         rows,
         pageSizeOptions = [10, 25, 50],
         initialPageSize = 10,
         onRowClick
     }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initialPageSize);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <Paper style={{width: '100%'}}>
                <TableContainer
                    style={{
                        maxHeight: '750px',
                        overflow: 'auto',
                        borderRadius: '8px'
                    }}>
                    <Table stickyHeader aria-label="reusable table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align || 'left'}
                                        style={{
                                            minWidth: column.minWidth,
                                            fontWeight: 'bold',
                                            backgroundColor: 'linear-gradient(180deg, #F0F0F0, #FFFFFF)',
                                            color: '#000000',
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index}
                                    onClick={() => onRowClick && onRowClick(row)}
                                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={pageSizeOptions}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ReusableTable;
