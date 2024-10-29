import React from 'react';
import { paymentData } from '../../assets/mockData/paymentData.ts';
import ReusableTable from "../../components/ReusableTable/ReusableTable.tsx";
import {Box, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const columns = [
    { id: 'payment_id', label: 'Id', minWidth: 80 },
    { id: 'buid', label: 'Branch', minWidth: 100 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        align: 'center',
        format: (value: string) => (
            <Chip
                label={value}
                sx={{
                    backgroundColor: value === 'closed' ? 'yellow' : 'green',
                    color: '#00000',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                }}
            />
        ),
    },
    { id: 'trantipe', label: 'Type', minWidth: 100 },
    { id: 'dom_int', label: 'Area', minWidth: 80, align: 'center' },
    { id: 'trannbr', label: 'Number', minWidth: 100 },
    { id: 'trandate', label: 'Date', minWidth: 150 },
    { id: 'customer_id', label: 'Customer', minWidth: 150 },
    { id: 'transcount', label: 'Count', minWidth: 80, align: 'center' },
    { id: 'chw', label: 'CHW', minWidth: 80 },
    { id: 'create_by', label: 'Create By', minWidth: 150 },
    { id: 'modified_by', label: 'Modified By', minWidth: 150 },
] as any;

const Payment: React.FC = () => {
    const navigate = useNavigate();

    const handleRowClick = (params: any) => {
        console.log('params', params)
        navigate(`/payment-data/edit/${params.payment_id}`, {
            state: params,
        });
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Payment Data
            </Typography>
            <ReusableTable columns={columns} rows={paymentData.rows} onRowClick={handleRowClick} />
        </Box>
    );
};

export default Payment;
